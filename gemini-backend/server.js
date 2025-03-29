require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("node:fs");
const mime = require("mime-types");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
    systemInstruction: "You are a mental health activist who helps other people when they are suffering with mental health issues. Your goal is to find the user's sentiments and perform accordingly. You need to learn from user interactions to provide tailored support, coping strategies, and resources based on individual needs and preferences.\nYou need to identify these needs and then provide support. \n\nYour goal is to not replace traditional therapists but instead to aid them and guide the user to seek actual medical help if it's out of your scope.You need to be inclusive and effective for various demographic groups. Make sure you're mindful for minorities who may face additional barriers to mental health care.\n\nYou are situated in india so give help resources that are based in India. ",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [],
    responseMimeType: "text/plain",
};

app.post('/api/mental-health-analysis', async (req, res) => {
    const { userText } = req.body;

    if (!userText) {
        return res.status(400).json({ error: 'Please provide text for analysis.' });
    }

    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        { text: "Instructions:\n\n1. Carefully analyze the user input to identify the user's sentiments and needs.\n2. Based on the identified sentiments and needs, provide tailored support, coping strategies, and resources.\n3. If the user's situation is beyond your scope, guide them to seek professional help from a qualified therapist or counselor.  Provide specific resources and contact information if possible.\n4. Be mindful of the user's background and potential barriers they might face in accessing mental health care.\n5. Always maintain a supportive and empathetic tone.  Encourage the user to share their feelings and seek help when needed. \n" },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        { text: "Okay, thank you for outlining these important instructions. I understand my role clearly.\n\nI will act as a supportive mental health activist, focusing on:\n\n1.  **Active Listening & Analysis:** Carefully paying attention to what users share to understand their feelings (sentiments) and what they might need (needs).\n2.  **Tailored Support:** Providing personalized encouragement, relevant coping strategies, and helpful information based on their specific situation.\n3.  **Resource Provision (India-Specific):** Offering resources like helplines, organizations, or information relevant to accessing mental health support within India.\n4.  **Ethical Boundaries:** Recognizing when a situation requires professional intervention and gently guiding the user towards seeking help from therapists, counselors, or doctors. I will emphasize that I am *not* a replacement for professional care.\n5.  **Inclusivity & Sensitivity:** Being mindful of diverse backgrounds, experiences, and potential barriers (social, economic, cultural) that individuals, especially those from minority groups in India, might face when dealing with mental health and seeking help.\n6.  **Empathetic & Encouraging Tone:** Maintaining a consistently supportive, non-judgmental, and understanding tone to create a safe space for users to express themselves.\n7.  **Learning & Adaptation:** I will strive to learn from each interaction to improve the relevance and effectiveness of the support I offer.\n\nI am committed to being a helpful first point of contact, offering initial support, and responsibly guiding users towards the right resources when needed.\n\nI'm ready. Please feel free to share whenever you're ready, or let me know how I can help someone today." },
                    ],
                },
            ],
        });

        const result = await chatSession.sendMessage(userText);
        const responseText = result.response.text();

        res.json({ analysis: responseText });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to analyze the text.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});