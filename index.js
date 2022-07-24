const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // second click
    hasFlippedCard = false;
    secondCard = this;

    if (firstCard.dataset.pokemon === secondCard.dataset.pokemon) {
      // it's a match!
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      resetBoard();
    } else {
      lockBoard = true;
      // not a match
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
      }, 1500);
    }
  }
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// (function shuffle() {
//   cards.forEach((card) => {
//     let random = Math.floor(Math.random() * 12);
//     card.style.order = random;
//   });
// })();
(function shuffle() {
    cards.forEach((card) => {
      let random = Math.floor(Math.random() * 12);
      card.style.order = random;
    });
  })();
cards.forEach((card) => card.addEventListener("click", flipCard));

