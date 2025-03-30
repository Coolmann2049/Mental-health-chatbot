const chatMessagesDiv = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
let sessionId = null;

// Add welcome message function
function addWelcomeMessage() {
    const welcomeMessage = `Hi there! 👋 I'm here to listen and support you. Feel free to share what's on your mind, and I'll do my best to help. Remember, while I can offer support and suggestions, I'm not a replacement for professional help.`;
    addMessage('bot', welcomeMessage);
}

function formatTimestamp() {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(new Date());
}

function addMessage(role, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(role === 'user' ? 'user-message' : 'bot-message');

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');

    if (role === 'bot') {
        if (text.startsWith('> ')) {
            const quoteText = text.substring(2).trim();
            messageContent.innerHTML = `<blockquote>${quoteText}</blockquote>`;
        } else {
            text = text.replace(/\*\*(.*?)\*\*/gs, '<b>$1</b>');
            text = text.replace(/\*(.*?)\*/gs, '<b>$1</b>');
            messageContent.innerHTML = text.replace(/\n/g, '<br>');
        }
    } else {
        messageContent.textContent = text;
    }

    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.textContent = formatTimestamp();

    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(timestamp);
    chatMessagesDiv.appendChild(messageDiv);

    // Smooth scroll to the latest message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

async function startChatSession() {
    try {
        const response = await fetch('https://mentalhealthbackend-three.vercel.app/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        });
        const data = await response.json();
        sessionId = data.sessionId;
        console.log('Session ID:', sessionId);
        addWelcomeMessage();
    } catch (error) {
        console.error('Error starting chat session:', error);
        addMessage('bot', 'Sorry, I had trouble connecting. Please try refreshing the page.');
    }
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    addMessage('user', message);
    messageInput.value = '';
    messageInput.focus();

    try {
        const response = await fetch('https://mentalhealthbackend-three.vercel.app/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId, message }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend Error:', errorData);
            addMessage('bot', `I'm having trouble responding right now. Please try again in a moment.`);
            return;
        }

        const data = await response.json();
        addMessage('bot', data.response);
    } catch (error) {
        console.error('Frontend Error:', error);
        addMessage('bot', 'Sorry, I had trouble sending your message. Please try again.');
    }
}

// Initialize chat
startChatSession();

// Event listeners
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

// Add loading state to input
messageInput.addEventListener('input', function() {
    sendButton.disabled = !this.value.trim();
});

// Focus input on load
window.addEventListener('load', () => {
    messageInput.focus();
});