// db.js
// -----------------------------------------------------------------------------
// Tämä tiedosto vastaa MongoDB-tietokantaan yhdistämisestä.
// Se käyttää Mongoose-kirjastoa, joka tekee MongoDB:n käsittelystä helpompaa.
//
// connectDB() -funktio käynnistetään app.js-tiedostossa *ennen kuin Express*
// alkaa käsitellä pyyntöjä. Näin varmistetaan, että tietokantayhteys on valmis.
// -----------------------------------------------------------------------------

// Tuodaan mongoose-kirjasto, joka hoitaa yhteyden MongoDB:hen.
import mongoose from "mongoose";

// -----------------------------------------------------------------------------
// export default async function connectDB()
//
// Tämä funktio yrittää yhdistää MongoDB-tietokantaan osoitteella,
// joka on määritetty .env-tiedostossa muuttujassa MONGODB_URI.
//
// Esim. .env:
//
//    MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/chatbot
//
// Funktio käyttää async/await-syntaksia, koska yhteyden muodostaminen
// on asynkroninen (voi kestää hetken).
// -----------------------------------------------------------------------------
export default async function connectDB() {
  try {

    // -------------------------------------------------------------------------
    // mongoose.connect(process.env.MONGODB_URI)
    //
    // Tämä yrittää muodostaa yhteyden tietokantaan.
    // prosess.env.MONGODB_URI tulee .env-tiedostosta automaattisesti.
    //
    // Jos .env-tiedostoa ei löydy tai muuttuja puuttuu:
    // → ohjelma heittää virheen ja siirtyy catch-lohkoon.
    //
    // Jos URI on virheellinen:
    // → myös silloin catch-lohko suoritetaan.
    // -------------------------------------------------------------------------
    await mongoose.connect(process.env.MONGODB_URI);

    // Jos yhteys onnistui, tulostetaan ilmoitus konsoliin.
    console.log("MongoDB-yhteys onnistui!");

  } catch (error) {

    // -------------------------------------------------------------------------
    // Tänne tullaan jos yhteyden muodostaminen epäonnistuu.
    // Esim syitä:
    //  - väärä salasana / käyttäjätunnus
    //  - klusteri ei vastaa
    //  - tietokantaa ei löydy
    //  - internet-yhteys puuttuu
    // -------------------------------------------------------------------------
    console.error("Virhe yhdistettäessä MongoDB:hen:", error);

    // -------------------------------------------------------------------------
    // process.exit(1)
    //
    // Keskeyttää Node-palvelimen käynnistyksen.
    // Tämä on tarkoituksellista, koska backend ei voi toimia
    // ilman tietokantayhteyttä.
    //
    // (Voisit myös palauttaa virheen, mutta backend jäisi käyttökelvottomaan
    // tilaan → siksi on parempi pysäyttää se.)
    // -------------------------------------------------------------------------
    process.exit(1);
  }
}
