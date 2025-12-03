// model.js
// -----------------------------------------------------------------------------
// Tämä tiedosto määrittelee MongoDB-tietokantaan tallennettavan dokumentin
// rakenteen (schema) ja luo siitä mallin (model).
//
// Tätä mallia käytetään chatbotissa hakemaan valmiita kysymys–vastauspareja,
// joita vastaan käyttäjän viestiä verrataan. Kun botti vastaa, se hakee nämä
// tietueet juuri tämän mallin avulla.
// -----------------------------------------------------------------------------

// Tuodaan mongoose-kirjasto, jolla tehdään yhteys MongoDB:hen ja luodaan malleja.
import mongoose from "mongoose";

// -----------------------------------------------------------------------------
// Luodaan skeema (schema), joka määrittelee dokumentin kentät ja niiden tyypit.
// Skeema toimii "rakennuspiirustuksena" MongoDB-tietueille, eli se kertoo,
// minkälaista dataa tallennetaan ja missä muodossa.
// -----------------------------------------------------------------------------
const qaSchema = new mongoose.Schema({

  // -------------------------
  // Käyttäjän kysymys
  // -------------------------
  question: {
    type: String,      // Tietotyyppi: merkkijono (tekstinpätkä)
    required: true     // Kenttä on oltava, muuten dokumenttia ei tallenneta
  },

  // -------------------------
  // Botin valmiiksi tallennettu vastaus
  // -------------------------
  answer: {
    type: String,      // Myös tekstikenttä
    required: true     // Myös pakollinen
  }

}); // <- skeeman määrittely päättyy tähän

// -----------------------------------------------------------------------------
// Luodaan ja viedään malli (model).
//
// mongoose.model("QandA", qaSchema)
//
// Ensimmäinen parametri "QandA":
//   - Tämä on mallin nimi.
//   - Mongoosen convention: se etsii kokoelmaa nimeltä "qandas" tai "QandA"
//     mutta koska oikeassa MongoDB:ssä kokoelma on "QandA", käytämme 
//     kolmatta parametria tarkaksi kokoelmaniksi.
//
// Toinen parametri on juuri tekemämme skeema.
// Kolmas parametri on oikea kokoelman nimi: "QandA"
//
// Tämä malli mahdollistaa seuraavat asiat ohjelmassa:
//   - QandA.find()        → hae kaikki tietueet
//   - QandA.findOne()     → hae yksi tietue
//   - QandA.create()      → luo uusi tietue
//   - QandA.updateOne()   → päivitä tietue
//   - QandA.deleteOne()   → poista tietue
//
// Käytännössä tämä malli on "portti" MongoDB-tietokantaan.
// -----------------------------------------------------------------------------
export default mongoose.model("QandA", qaSchema, "QandA");
