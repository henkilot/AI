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

// Tuodaan konfiguraatio-objekti
import { config } from "./config.js";

// Ladataan .env -tiedosto ennen kuin config.js käyttää muuttujia
dotenv.config();

// Yhdistetään MongoDB:hen
connectDB();

const app = express();

// Middlewaret
app.use(express.json());
app.use(cors());

// Chatbotin API-reitit
app.use("/api/chat", chatRoutes);

// Palvelimen käynnistys haluttuun porttiin
app.listen(config.PORT, () => {
  console.log(`Palvelin käynnissä portissa ${config.PORT}`);
});
