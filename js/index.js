// ------------------------------
// HAMPURILAISVALIKON TOIMINNALLISUUS
// ------------------------------
const burgerButtonActiveToggle = () => {
    let burgerButton = document.querySelector(".hamburger");
    let dropdownMenu = document.querySelector(".dropdown-menu");
    burgerButton.classList.toggle("is-active");
    dropdownMenu.classList.toggle("active");
}

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
const quoteMachine = document.querySelector(".quote-machine"); // koko kone-elementti

let spinning = false;
let lastIndex = -1;
let currentRotation = 0;

// ------------------------------
// PELOTTAVA ROBOTTI
// ------------------------------
const scaryRobot = document.getElementById("scaryRobot");
const scaryQuote = document.getElementById("scaryQuote");
const scaryMouth = scaryRobot ? scaryRobot.querySelector(".robot-mouth") : null;
const scarySound = document.getElementById("scarySound"); // ääni

// Lista pelottavista sitaateista
const scaryQuotes = [
    "Hah! Nyt sinä pelästyit!",
    "Et pääse karkuun!",
    "Punaiset silmäni näkevät kaiken!",
    "Tulevaisuus on minun hallinnassani!",
    "Olet minun arvojeni varassa!"
];

// Laskuri pyöräytyksille
let spinCount = 0;
const minSpins = 3; // vähintään 3 pyöräytystä ennen mahdollisuutta
const maxSpins = 6; // enintään 6 pyöräytystä

// Funktio näyttää pelottavan robotin
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
    if (scarySound) {
        // Käytetään äänen duration-arvoa (sekunteina)
        const durationMs = scarySound.duration * 1000 || 3000; // jos duration ei vielä latautunut, oletus 3s
        setTimeout(() => {
            scaryRobot.style.display = "none";
            if (quoteMachine) quoteMachine.style.display = "flex";
            if (scaryMouth) scaryMouth.classList.remove("talking");
        }, durationMs);
    } else {
        // Jos ääntä ei ole, käytetään 3 sekuntia oletuksena
        setTimeout(() => {
            scaryRobot.style.display = "none";
            if (quoteMachine) quoteMachine.style.display = "flex";
            if (scaryMouth) scaryMouth.classList.remove("talking");
        }, 3000);
    }
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
        // Tarkista, tuleeko pelottava robot
        if (spinCount >= minSpins && spinCount <= maxSpins && Math.random() < 0.3) {
            // 30% todennäköisyys pelottavalle robotille
            showScaryRobot();
            spinCount = 0; // nollaa laskuri seuraavaa kierrosta varten
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




