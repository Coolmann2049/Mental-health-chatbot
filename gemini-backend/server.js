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
const { v4: uuidv4 } = require('uuid'); // For generating unique session IDs

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
            history: chatHistory, // Use the chat history for the current session
        });

        const result = await chatSession.sendMessage(message);
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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});