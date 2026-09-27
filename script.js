const cards = document.querySelectorAll(".card");
const movesElement = document.querySelector("#moves");
const pairsElement = document.querySelector("#pairs");
const resetBtn = document.querySelector("#reset-btn");

let emojis = [
    "🍎", "🍎",
    "🍌", "🍌",
    "🍕", "🍕",
    "🍓", "🍓",
    "🚗", "🚗",
    "🐱", "🐱"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let pairs = 0;


function shuffleCards() {
    emojis.sort(() => Math.random() - 0.5);
}
function startGame() {

    shuffleCards();

    moves = 0;
    pairs = 0;

    movesElement.innerText = moves;
    pairsElement.innerText = pairs;

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    cards.forEach((card, index) => {
        card.innerText = "?";
        card.dataset.value = emojis[index];
        card.disabled = false;
    });
}


cards.forEach((card) => {

    card.addEventListener("click", () => {

        if (lockBoard) return;

        if (card === firstCard) return;

        card.innerText = card.dataset.value;

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        moves++;

        movesElement.innerText = moves;

        checkMatch();
    });
});



function checkMatch() {

    if (firstCard.dataset.value === secondCard.dataset.value) {

        pairs++;

        pairsElement.innerText = pairs;

        firstCard.disabled = true;
        secondCard.disabled = true;

        firstCard = null;
        secondCard = null;

        if (pairs === emojis.length / 2) {
            setTimeout(() => {
                alert("🎉 Congratulations! You won!");
            }, 500);
        }

    } else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.innerText = "?";
            secondCard.innerText = "?";
            firstCard=null;
            secondCard=null;
            lockBoard= false;
        },800);
    }
}
resetBtn.addEventListener("click",startGame);
startGame();