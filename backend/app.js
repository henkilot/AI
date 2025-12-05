// app.js

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
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000',
    'http://127.0.0.1:5500'
  ],
}));
app.use(express.json());


// Chatbotin API-reitit
app.use("/api/chat", chatRoutes);

const port = process.env.PORT || 5000;
// Palvelimen käynnistys haluttuun porttiin
app.listen(port, () => {
  console.log(`Palvelin käynnissä portissa ${port}`);
});
