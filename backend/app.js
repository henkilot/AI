// app.js
// -----------------------------------------------------------------------------
// Tämä on backendin pääohjelma. Nyt portti ei enää ole kovakoodattu,
// vaan haetaan se erillisestä config.js -tiedostosta.
// -----------------------------------------------------------------------------
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDB from "./db.js";
import chatRoutes from "./routes.js";


// Ladataan .env -tiedosto ennen kuin config.js käyttää muuttujia
dotenv.config();

// Yhdistetään MongoDB:hen
connectDB();

const app = express();

// Middlewaret
app.use(cors({
  origin: [
    'https://henkilot.github.io', 
    'http://localhost:5000',
  ]
}));
app.use(express.json());


// Chatbotin API-reitit
app.use("/api/chat", chatRoutes);

const port = process.env.PORT || 5000;
// Palvelimen käynnistys haluttuun porttiin
app.listen(port, () => {
  console.log(`Palvelin käynnissä portissa ${port}`);
});
