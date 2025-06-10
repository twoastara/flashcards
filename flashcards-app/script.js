const flashcards = [
  { pl: "tak", en: "yes", es: "sí", va: "sí" },
  { pl: "nie", en: "no", es: "no", va: "no" },
  { pl: "jestem Mar, miło mi", en: "I am Mar, nice to meet you", es: "soy Mar, mucho gusto", va: "sóc Mar, molt de gust" },
  { pl: "mam na imię Mar", en: "my name is Mar", es: "me llamo Mar", va: "em dic Mar" },
  // Add more cards here
];

let current = 0;
let knownCards = new Set();

const cardFront = document.getElementById("card-front");
const cardBack = document.getElementById("card-back");
const score = document.getElementById("score");
const completeMsg = document.getElementById("complete");

function setTheme(theme) {
  document.body.className = theme;
}

function showCard(index) {
  const card = flashcards[index];
  cardFront.textContent = card.pl;
  cardBack.textContent = `EN: ${card.en} | ES: ${card.es} | VA: ${card.va}`;
  cardBack.classList.add("hidden");
  playAudio(card.pl);
  updateScore();
}

function showAnswer() {
  cardBack.classList.remove("hidden");
}

function markKnown() {
  knownCards.add(current);
  if (knownCards.size === flashcards.length) {
    completeMsg.classList.remove("hidden");
  } else {
    nextCard();
  }
  updateScore();
}

function markUnknown() {
  flashcards.push(flashcards[current]); // push to end
  nextCard();
}

function nextCard() {
  do {
    current = (current + 1) % flashcards.length;
  } while (knownCards.has(current));
  showCard(current);
}

function updateScore() {
  score.textContent = `Known: ${knownCards.size} / ${flashcards.length}`;
}

function playAudio(text) {
  const file = `audio/${text.toLowerCase().replace(/ /g, "_")}.mp3`;
  const audio = new Audio(file);
  audio.play().catch(() => console.warn("Audio file missing:", file));
}

// Init
showCard(current);
