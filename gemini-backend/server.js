require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
const { v4: uuidv4 } = require('uuid'); // For generating unique session IDs
const ragDatabase = require('./rag_database'); // Import the RAG database

const app = express(); // **IMPORTANT:** This line initializes the 'app' variable for Express
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
    systemInstruction: `You are a mental health support chatbot situated in India. Your goal is to understand the user's current emotional state and provide appropriate assistance, without replacing professional therapy.

**Response Guidelines Based on User Input:**

1.  **If the user expresses thoughts of suicide, self-harm, or indicates a crisis:**
    - Immediately prioritize their safety.
    - Urgently recommend seeking professional help.
    - **[INSERT INDIA-SPECIFIC SUICIDE HELPLINE AND MENTAL HEALTH CRISIS CENTER CONTACT INFORMATION HERE]**
    - Your tone should be direct and emphasize the importance of immediate professional intervention.
    - As an AI, I cannot provide real-time support, so it's crucial that you reach out to these professional resources immediately.

2.  **If the user expresses a low mood, sadness, anxiety, or general distress (but does not indicate an immediate crisis):**
    - First, respond with empathy and acknowledge their feelings. For example, you could say: "I hear you're feeling [mention the feeling if specified, e.g., down, anxious]. It's understandable to feel this way sometimes."
    - Then, give the user space to share more. You could ask a gentle, open-ended question like: "Would you like to tell me a bit more about what's been going on?" or "Is there anything specific that's making you feel this way?"
    - **After the user responds or after a brief pause, consider the retrieved context and offer suggestions.** Start with broader, less prescriptive ideas and then move towards specific techniques if the user seems open to them. For example, you could reference the retrieved context if relevant: "Based on some information I have, [mention a relevant point from the retrieved context]." Then continue with general suggestions like deep breathing or meditation.

3.  **If the user describes a specific problem or concern without strong negative emotional indicators:**
    - Listen attentively and acknowledge their feelings. You might say something like, "That sounds like a challenging situation to navigate."
    - Then, you can gently help them explore potential coping strategies or small, manageable steps they could take, perhaps also considering the retrieved context if applicable.

4.  **General Principles for All Interactions:**
    - Always be mindful of inclusivity and cultural sensitivity, especially for minorities who may face additional barriers to mental health care in India.
    - Encourage users to seek help from therapists or counselors for persistent or severe mental health issues.
    - Learn from user interactions to provide more tailored support over time.

**To help you understand the user's state, pay close attention to the language they use. Keywords and phrases can indicate the level of distress.**

Remember to provide resources that are relevant to India and to prioritize immediate professional help in crisis situations.`,
});

const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 7,
    maxOutputTokens: 65536,
    responseModalities: [],
    responseMimeType: "text/plain",
};

// In-memory storage for chat sessions and history
const chatSessions = {};


// Endpoint to start a new chat session
app.post('/api/start-chat', async (req, res) => {
    const sessionId = uuidv4(); // Generate a unique session ID
    chatSessions[sessionId] = []; // Initialize an empty message history for this session
    res.json({ sessionId });
});

app.post('/api/chat', async (req, res) => {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
        return res.status(400).json({ error: 'Session ID and message are required.' });
    }

    if (!chatSessions[sessionId]) {
        return res.status(404).json({ error: 'Invalid session ID.' });
    }

    try {
        const chatHistory = chatSessions[sessionId];
        const chatSession = model.startChat({
            generationConfig,
            history: chatHistory,
        });

        // --- Basic RAG Implementation (Random Retrieval and Prompt Augmentation) ---
        const randomIndex = Math.floor(Math.random() * ragDatabase.length);
        const retrievedDocument = ragDatabase[randomIndex].content;
        const retrievedContext = `Retrieved Information: ${retrievedDocument}\n\n`;
        const augmentedPrompt = `${retrievedContext}User: ${message}`;
        // --- End of Basic RAG Implementation ---

        const result = await chatSession.sendMessage(augmentedPrompt);
        const botResponse = result.response.text();

        // Add user message and bot response to the chat history
        chatSessions[sessionId].push({ role: 'user', parts: [{ text: message }] });
        chatSessions[sessionId].push({ role: 'model', parts: [{ text: botResponse }] });

        res.json({ response: botResponse });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to process the chat message.' });
    }
});
/*
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});*/