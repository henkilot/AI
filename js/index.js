// ------------------------------
// HAMPURILAISVALIKON TOIMINNALLISUUS
// ------------------------------
const burgerButtonActiveToggle = () => {
  const burgerButton = document.querySelector(".hamburger");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  if (burgerButton && dropdownMenu) {
    burgerButton.classList.toggle("is-active");
    dropdownMenu.classList.toggle("active");
  }
};

// ------------------------------
// ASETUKSET-VALIKON TOIMINNALLISUUS (klikkaus)
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const settingsItem = document.querySelector(".dropdown-settings");
  if (!settingsItem) return;

  const settingsToggle = settingsItem.querySelector(".settings-toggle");
  const settingsSubmenu = settingsItem.querySelector(".settings-submenu");
  if (!settingsToggle || !settingsSubmenu) return;

  settingsToggle.addEventListener("click", (e) => {
    e.preventDefault();  // estää linkin siirtymisen
    e.stopPropagation(); // estää click bubblingin
    settingsItem.classList.toggle("active");
  });

  // Sulkee alavalikon jos klikataan muualla
  document.addEventListener("click", (e) => {
    if (!settingsItem.contains(e.target)) {
      settingsItem.classList.remove("active");
    }
  });
});

// ==============================================
// MODE VALINTA: Default, Dark, Light
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
    const modeLinks = document.querySelectorAll(".settings-submenu a");

    modeLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Poistetaan aiemmat moodit
            document.body.classList.remove("default-mode", "dark-mode", "light-mode");

            // Lisätään valittu moodi
            const mode = link.textContent.toLowerCase().replace(" ", "-");
            document.body.classList.add(mode);
        });
    });
});




// ------------------------------
// SITAATTIKONEEN JAVASCRIPT
// ------------------------------
const quotes = [
  "Tekoäly ei koskaan nuku.",
  "Rauta kuumenee datasta.",
  "Robotti voi oppia, mutta ei uneksia.",
  "Ohjelmoija näkee virheen, tekoäly näkee mahdollisuuden.",
  "Kun algoritmi puhuu, maailma kuuntelee."
];

const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const quoteText = document.getElementById("quoteText");
const robotMouth = document.querySelector(".robot-mouth");
const quoteMachine = document.querySelector(".quote-machine");

let spinning = false;
let lastIndex = -1;
let currentRotation = 0;

// ------------------------------
// PELOTTAVA ROBOTTI
// ------------------------------
const scaryRobot = document.getElementById("scaryRobot");
const scaryQuote = document.getElementById("scaryQuote");
const scaryMouth = scaryRobot ? scaryRobot.querySelector(".robot-mouth") : null;
const scarySound = document.getElementById("scarySound");

const scaryQuotes = [
    "Hah! Nyt sinä pelästyit!",
    "Et pääse karkuun!",
    "Punaiset silmäni näkevät kaiken!",
    "Tulevaisuus on minun hallinnassani!",
    "Olet minun arvojeni varassa!"
];

// Laskuri pyöräytyksille
let spinCount = 0;

// Ensimmäinen satunnainen tavoite seuraavalle pelottavalle robotille
let nextScarySpin = 3 + Math.floor(Math.random() * 3); // 3–5 seuraavaa

function showScaryRobot() {
    if (!scaryRobot) return;

    // Valitaan satunnainen pelottava sitaatti
    const index = Math.floor(Math.random() * scaryQuotes.length);
    scaryQuote.textContent = scaryQuotes[index];

    // Piilotetaan normaali sitaatinkone
    if (quoteMachine) quoteMachine.style.display = "none";

    // Näytetään pelottava robot
    scaryRobot.style.display = "flex";

    // Toistetaan pelottava ääni
    if (scarySound) {
        scarySound.currentTime = 0;
        scarySound.play();
    }

    // Robottisuu liikkuu
    if (scaryMouth) {
        scaryMouth.classList.add("talking");
    }

    // Piilotetaan pelottava robotti äänen pituuden jälkeen
    const durationMs = (scarySound?.duration || 3) * 1000;
    setTimeout(() => {
        scaryRobot.style.display = "none";
        if (quoteMachine) quoteMachine.style.display = "flex";
        if (scaryMouth) scaryMouth.classList.remove("talking");

        // Asetetaan uusi satunnainen tavoite seuraavalle pelottavalle robotille
        nextScarySpin = spinCount + 3 + Math.floor(Math.random() * 3);
    }, durationMs);
}

// ------------------------------
// NAPIN KLIKKI-EVENT
// ------------------------------
spinButton.addEventListener("click", () => {
    if (spinning) return;
    spinning = true;

    spinCount++; // kasvatetaan pyöräytysten määrää

    // --------------------------
    // PYÖRÄN PYÖRÄYTYS
    // --------------------------
    const extraRotation = 360 * 5 + Math.floor(Math.random() * 360);
    currentRotation += extraRotation;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // --------------------------
    // SITAATIN NÄYTTÄMINEN PYÖRÄYKSEN JÄLKEEN
    // --------------------------
    setTimeout(() => {
        // Tarkistetaan, tuleeko pelottava robotti
        if (spinCount >= nextScarySpin) {
            showScaryRobot();
        } else {
            // Näytetään normaali sitaatti
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * quotes.length);
            } while (randomIndex === lastIndex);
            lastIndex = randomIndex;
            quoteText.textContent = quotes[randomIndex];

            robotMouth.classList.add("talking");
            setTimeout(() => robotMouth.classList.remove("talking"), 1000);
        }

        spinning = false;
    }, 4000);
});







