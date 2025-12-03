// routes.js
// -----------------------------------------------------------------------------
// Tämä tiedosto määrittelee chatbotin backendin API-reitit.
//
// FRONTEND käyttää kahta reittiä:
//
//    1) GET  /api/chat/questions   → hakee kaikki kysymys–vastausparit
//    2) POST /api/chat/send        → hakee vastauksen käyttäjän viestiin
//
// -----------------------------------------------------------------------------

// Tuodaan express, jotta voidaan määritellä API-reitit
import express from "express";

// Tuodaan MongoDB-malli, joka sisältää kysymys–vastausparit (QandA-kokoelmasta)
import QandA from "./model.js";

// Luodaan router-olio, joka liitetään app.js-tiedostossa polkuun "/api/chat"
const router = express.Router();

// -----------------------------------------------------------------------------
// GET /api/chat/questions
// -----------------------------------------------------------------------------
// FRONTEND käyttää tätä reittiä ladatakseen kaikki tietokannan kysymykset.
// Tätä tarvitaan mm. siinä vaiheessa, kun näytetään valmiita kysymysnappeja.
// -----------------------------------------------------------------------------
router.get("/questions", async (req, res) => {
  try {
    // Haetaan kaikki tietokantadokumentit (kysymys–vastausparit QandA-kokoelmasta)
    const allQA = await QandA.find();
    console.log("GET /questions - Haettu", allQA.length, "kysymys–vastauspareja");
    res.json(allQA);   // Palautetaan frontille JSON-taulukko
  } catch (error) {
    console.error("Virhe haettaessa kysymyksiä:", error);
    res.status(500).json({ error: "Tietokantavirhe" });
  }
});

// -----------------------------------------------------------------------------
// POST /api/chat/send
// -----------------------------------------------------------------------------
// Tämä reitti ottaa vastaan käyttäjän syötteen,
// etsii sille sopivan vastauksen tietokannasta,
// ja palauttaa sen frontendille.
// -----------------------------------------------------------------------------
router.post("/send", async (req, res) => {
  try {
    // Haetaan käyttäjän lähettämä viesti
    const { message } = req.body;

    // Haetaan kaikki kysymys–vastausparit MongoDB Atlasista (QandA-kokoelmasta)
    const allQA = await QandA.find();

    console.log("POST /send - Tietokannasta haettu:", allQA.length, "dokumenttia");

    // Muutetaan käyttäjän viesti pieniksi kirjaimiksi ja poistetaan whitespace
    const userMessage = message.toLowerCase().trim();

    // Etsitään ensimmäinen kysymys, joka esiintyy käyttäjän viestissä
    // Case-insensitive + trim() → kirjaimilla tai välilyönneillä ei ole väliä
    const match = allQA.find((item) =>
      userMessage.includes(item.question.toLowerCase().trim())
    );

    // Jos osuma löytyi → palautetaan oikea vastaus
    if (match) {
      console.log("Vastaava kysymys löytyi:", match.question);
      return res.json({
        user: message,
        bot: match.answer
      });
    }

    // Jos mitään sopivaa vastausta ei löytynyt
    console.log("Vastaavaa kysymystä ei löytynyt käyttäjän viestille:", message);
    res.json({
      user: message,
      bot: "En löytänyt vastausta tietokannasta."
    });
  } catch (error) {
    console.error("Virhe lähettäessä viestiä:", error);
    res.status(500).json({
      user: req.body.message,
      bot: "Virhe: tietokantahaku epäonnistui."
    });
  }
});

// Viedään router käyttööön app.js -tiedostoon
export default router;
