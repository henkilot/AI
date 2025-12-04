const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const chatHistoryList = document.getElementById('chat-history-list');

let chats = [];
let currentChatIndex = -1;
let questionsData = []; // Will store questions from the database



window.addEventListener('DOMContentLoaded', async () => {
    setTimeout(() => newChat(), 500);
    try {
        const response = await fetch('/api/questions');
        questionsData = await response.json();
        console.log('Loaded questions:', questionsData);
    } catch (error) {
        console.error('Failed to load questions:', error);
        questionsData = [
            { question: "Mikä on sinun nimesi?", answer: "Minun nimeni on PRÄNK-BOT 3000." },
            { question: "Mitä voit tehdä?", answer: "Voin vastata esivalmisteltuihin kysymyksiin!" },
            { question: "Miksi järjestelmä kaatui?", answer: "Se oli tarkoituksellinen PRÄNKKI!" }
        ];
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


function addMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function clearChat() {
    chatMessages.innerHTML = '';
    currentChatIndex = -1;
}

function newChat() {
    clearChat();
    addMessage("Hei! Kuinka voin auttaa?", false);
}


function showQuestionButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    questionsData.forEach(qa => {
        const button = document.createElement('button');
        button.className = 'question-button';
        button.textContent = qa.question;
        button.addEventListener('click', () => { 
            addMessage(qa.question, true);
            setTimeout(() => addMessage(qa.answer, false), 500);
            buttonContainer.remove();
        });
        buttonContainer.appendChild(button);
    });
    
    chatMessages.appendChild(buttonContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';

    try {
        throw new Error('Simulated error for prank bot');  
    } catch (error) {
        console.error('Error:', error);
        addMessage(`Viestisi "${message}" aiheutti ongelman järjestelmässämme.
                    Käynnistetään PROTOKOLLA: KOLME, KAKSI, YKSI... PRÄNKKI!`, false);
        
        setTimeout(() => {
            addMessage("Valitse yksi seuraavista kysymyksistä:", false);
            showQuestionButtons();
        }, 1500);
    }
}

