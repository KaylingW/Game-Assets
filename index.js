//Selects all HTML elements with the class card
const cards = document.querySelectorAll(".card");

//Variables
let flippedCard = false; //Boolean value for card flipping
let locked = false; //Boolean value to lock and unlock board
let firstCard, secondCard; //Two variables for card pair

function flipCard() {
  //If the board is locked, return (rest of code will not be executed)
  if (locked) return;
  //If user clicks the same card twice, return (rest of code will not be executed)
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!flippedCard) {
    // If user has clicked on card, set flippedCard to true 
    // and firstCard to reference the clicked card
    flippedCard = true;
    firstCard = this;
  } else {
    // second click
    flippedCard = false;
    secondCard = this;

    //If the first card matches the second card -> remove event listener
    // dataset takes the name of the element given in data-* (data-pokemon in HTML file)
    if (firstCard.dataset.pokemon === secondCard.dataset.pokemon) {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      resetBoard();
    } else {
      locked = true;
      //Cards do not match, remove class and reset the board
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
      }, 1500);
    }
  }
}

//Set default values again
function resetBoard() {
  [flippedCard, locked] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//Runs on declaration-> shuffles cards on the board
(function shuffle() {
    cards.forEach((card) => {
      let random = Math.floor(Math.random() * 12);
      card.style.order = random;
    });
  })();
  //For each card, add an event listener that checks whether the card has been clicked
cards.forEach((card) => card.addEventListener("click", flipCard));

