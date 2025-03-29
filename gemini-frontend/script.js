const chatMessagesDiv = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
let sessionId = null; // To store the user's session ID

// Function to add a message to the chat UI
function addMessage(role, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(role === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chatMessagesDiv.appendChild(messageDiv);
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight; // Scroll to the latest message
}

// Function to start a new chat session
async function startChatSession() {
    try {
        const response = await fetch('http://localhost:3000/api/start-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}) // No body needed for starting a session
        });
        const data = await response.json();
        sessionId = data.sessionId;
        console.log('Session ID:', sessionId);
    } catch (error) {
        console.error('Error starting chat session:', error);
    }
}

// Call startChatSession when the page loads
startChatSession();

sendButton.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (message) {
        addMessage('user', message);
        messageInput.value = '';

        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionId: sessionId, message: message }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Backend Error:', errorData);
                addMessage('bot', `Error: ${errorData.error || 'Something went wrong.'}`);
                return;
            }

            const data = await response.json();
            addMessage('bot', data.response);

        } catch (error) {
            console.error('Frontend Error:', error);
            addMessage('bot', 'Failed to send message to the backend.');
        }
    }
});

// Optional: Send message when Enter key is pressed in the input field
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});