const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");

// API:n osoite
const API_URL = window.location.hostname.includes('github.io')
    ? "https://henkilot-api.onrender.com/api/chat" 
    : "http://localhost:5000/api/chat";

// MongoDB kysymykset&vastaukset
let questionsData = [];

const CHAT_STORAGE_KEY = "prankbot_chat_history";

// Fallback-kysymykset, jos tietokanta yhteys ei toimi.
const hardcodedQuestions = [
  {
    question: "Mikä on sinun nimesi?",
    answer: "Minun nimeni on PRÄNK-BOT 3000.",
  },

  {
    question: "Mitä voit tehdä?",
    answer: "Voin vastata esivalmisteltuihin kysymyksiin!",
  },

  {
    question: "Miksi järjestelmä kaatui?",
    answer: "Se oli tarkoituksellinen PRÄNKKI!",
  },
];

// API:n kautta kysymykset&vastaukset (MongoDB)
window.addEventListener("DOMContentLoaded", async () => {
  // Asettaa loadChatHistory funktion savedMessages muuttujaan
  const savedMessages = loadChatHistory();

  if (savedMessages.length > 0) {
    restoreChat(savedMessages);
  } else {
    setTimeout(() => newChat(), 500);
  }

  try {
    const response = await fetch(`${API_BASE}/questions`);
    questionsData = await response.json();
    console.log("Loaded questions:", questionsData);
  } catch (error) {
    console.error("Failed to load questions:", error);
    questionsData = [
      {
        question: "Mikä on sinun nimesi?",
        answer: "Minun nimeni on PRÄNK-BOT 3000.",
      },
      {
        question: "Mitä voit tehdä?",
        answer: "Voin vastata esivalmisteltuihin kysymyksiin!",
      },
      {
        question: "Miksi järjestelmä kaatui?",
        answer: "Se oli tarkoituksellinen PRÄNKKI!",
      },
    ];
  }
});

// Lisää viestit, antaa luokan sen perusteella, onko käyttäjä vai botti.
function addMessage(message, isUser) {
  const div = document.createElement("div");
  div.className = `message ${isUser ? "user-message" : "bot-message"}`;
  div.textContent = message;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Tallentaa chattihistorian.
  saveCurrentChat();
}

// Apufunktio chatin tallentamiseen.
function saveCurrentChat() {
  // valitsee kaikki viestielementit ja muuttaa ne varastoitavaan listaan
  const messageElements = chatMessages.querySelectorAll(".message");
  const messages = Array.from(messageElements).map((el) => ({
    text: el.textContent,
    isUser: el.classList.contains("user-message"),
  }));

  // Tallentaa localStorageen JSON:na
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  } catch (e) {
    console.warn("Ei pystynyt tallentamaan chättiä localStorageen:", e);
  }
}

function loadChatHistory() {
  try {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn("Ei pystynyt lataamaan chättiä localStoragesta:");
    return [];
  }
}

function restoreChat(messages) {
  clearChat();
  messages.forEach((msg) => {
    addMessage(msg.text, msg.isUser);
  });
}

// Puhdistaa keskustelun
function clearChat() {
  chatMessages.innerHTML = "";
}

// Aloittaa logiikan alusta
function newChat() {
  // Puhdistaa localStoragen, kun käyttäjä painaa uuden chatin nappia
  localStorage.removeItem(CHAT_STORAGE_KEY);
  clearChat();
  addMessage("Hei! Kuinka voin auttaa?", false);
  addMessage("Valitse aiheet:", false);
  showQuestionButtons();
}

// Luo kysymysnapit
function showQuestionButtons() {
  const container = document.createElement("div");

  container.className = "button-container";

  hardcodedQuestions.forEach((qa) => {
    const btn = document.createElement("button");

    btn.className = "question-button";
    btn.textContent = qa.question;

    btn.addEventListener("click", () => {
      addMessage(qa.question, true); // käyttäjän viesti

      setTimeout(() => addMessage(qa.answer, false), 300); // kovakoodattu vastaus

      container.remove(); // poistaa napit
    });

    container.appendChild(btn);
  });

  chatMessages.appendChild(container);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hoitaa viestin lähetyksen
async function sendMessage() {
  const message = userInput.value.trim();

  if (!message) return;

  addMessage(message, true);

  userInput.value = "";

  try {
    const response = await fetch(`${API_URL}/send`, {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ message }),
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

