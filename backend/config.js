// config.js
// -----------------------------------------------------------------------------
// Tämä tiedosto sisältää backendin keskeiset konfiguraatioasetukset.
//
// Idea:
//   - Kaikki asetukset yhdessä paikassa.
//   - app.js ei tarvitse tietää mitään kovakoodatuista arvoista.
//   - Lisääminen myöhemmin helpompaa (esim. API_VERSION, DEBUG_MODE).
//
// Asetukset luetaan .env-tiedostosta, mutta jos jotain ei ole määritetty,
// tarjotaan järkevä oletusarvo.
// -----------------------------------------------------------------------------

// Viedään konfiguraatio-olio, jossa palvelun asetukset
export const config = {

  // Portti, jossa backend-palvelin kuuntelee.
  //   1) yritetään lukea .env → process.env.PORT
  //   2) jos sitä ei ole → käytetään oletusta 5000
  PORT: process.env.PORT || 5000,

  // Voit lisätä myöhemmin esimerkiksi:
  // API_VERSION: "v1",
  // DEBUG: true
};
