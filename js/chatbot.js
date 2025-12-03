const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

// Backendin osoite
const API_URL = "http://localhost:5000";

// MongoDB-kysymykset (vain kirjoitetuille viesteille)
let questionsData = [];


// ----------------------------------------------------------
// ⭐ Kovakoodatut aihepainikkeet (PRÄNK-BOT 3000 teema)
// ----------------------------------------------------------
const hardcodedQuestions = [
    { question: "Mikä on sinun nimesi?", answer: "Minun nimeni on PRÄNK-BOT 3000." },
    { question: "Mitä voit tehdä?", answer: "Voin vastata esivalmisteltuihin kysymyksiin!" },
    { question: "Miksi järjestelmä kaatui?", answer: "Se oli tarkoituksellinen PRÄNKKI!" }
];


// ----------------------------------------------------------
// LADATAAN Tietokannan kysymykset (EI kosketa nappilistaa)
// ----------------------------------------------------------
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`${API_URL}/api/chat/questions`);
        questionsData = await response.json();
        console.log("Loaded questions:", questionsData);
    } catch (error) {
        console.error("Failed to load questions:", error);
        questionsData = [];
    }

    // Käynnistetään uusi chat
    setTimeout(() => newChat(), 300);
});


// ----------------------------------------------------------
// Lisää viesti ruutuun
// ----------------------------------------------------------
function addMessage(message, isUser) {
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    div.textContent = message;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// ----------------------------------------------------------
function clearChat() {
    chatMessages.innerHTML = "";
}


// ----------------------------------------------------------
// Uusi chat — näyttää PRÄNK-BOT -napit
// ----------------------------------------------------------
function newChat() {
    clearChat();
    addMessage("Hei! Kuinka voin auttaa?", false);

    addMessage("Valitse aiheet:", false);
    showQuestionButtons();
}


// ----------------------------------------------------------
// ⭐ Kovakoodatut PRÄNK-BOT -napit
// ----------------------------------------------------------
function showQuestionButtons() {

    const container = document.createElement('div');
    container.className = 'button-container';

    hardcodedQuestions.forEach(qa => {
        const btn = document.createElement('button');
        btn.className = 'question-button';
        btn.textContent = qa.question;

        btn.addEventListener('click', () => {
            addMessage(qa.question, true);               // käyttäjän viesti
            setTimeout(() => addMessage(qa.answer, false), 300); // kovakoodattu vastaus
            container.remove();                          // poistaa napit
        });

        container.appendChild(btn);
    });

    chatMessages.appendChild(container);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// ----------------------------------------------------------
// Lähetä kirjoitettu viesti backendille
// ----------------------------------------------------------
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = "";

    try {
        const response = await fetch(`${API_URL}/api/chat/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        addMessage(data.bot, false);

    } catch (error) {
        console.error("POST error:", error);
        addMessage("Virhe viestiä lähetettäessä.", false);
    }
}


// Enter = Lähetä
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});
