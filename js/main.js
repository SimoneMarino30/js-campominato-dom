// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.

// COSTANTI

// Prendo il bottone
const buttonEl = document.getElementById("button");
// Prendo la select
const selectEl = document.getElementById("complexity");
// Bombs
const quantity = 16;
// Array for unique numbers
let arrUniqueNumbers = [];
// Bottone reset
const resetEl = document.getElementById("reset");
// Modal
const modalLose = document.getElementById("modal-lose");
const modalWin = document.getElementById("modal-win");
const modalBtnLose = document.getElementById("modal-button-lose");
const modalBtnWin = document.getElementById("modal-button-win");
// Punteggio
let punteggio = 0;

// EVENT LISTENER

// al click genero i quadrati
buttonEl.addEventListener("click", function () {
  buttonEl.classList.add("hidden");
  selectEl.classList.add("hidden");
  resetEl.classList.remove("hidden");

  const gridEl = document.getElementById("grid");
  gridEl.innerHTML = "";
  // Ciclo che crea array di numeri unici in base alla difficoltà scelta
  while (arrUniqueNumbers.length < quantity) {
    const randomNumber = Math.floor(Math.random() * selectEl.value) + 1;

    if (!arrUniqueNumbers.includes(randomNumber)) {
      arrUniqueNumbers.push(randomNumber);
    }
  }

  // Ordino i numeri in maniera crescente
  arrUniqueNumbers.sort(function (a, b) {
    return a - b;
  });

  console.log(arrUniqueNumbers);

  for (let i = 1; i <= selectEl.value; i++) {
    const square = document.createElement("button");

    if (selectEl.value == 100) {
      square.classList.add("box");
    }
    if (selectEl.value == 81) {
      square.classList.add("box-medium");
    }
    if (selectEl.value == 49) {
      square.classList.add("box-hard");
    }

    // Ogni cella ha un numero progressivo, da 1 a 100.
    square.innerHTML = i;
    document.getElementById("grid").appendChild(square);

    // Aggiungo un gestore di eventi al clic di ciascun quadrato
    square.addEventListener("click", function () {
      punteggio += 1;
      // Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro
      changeBackground(square);
      // ed emetto un messaggio in console con il numero della cella cliccata
      console.log(i);

      if (punteggio == selectEl.value - arrUniqueNumbers.length) {
        console.log(punteggio);
        // alert("Hai vinto");
        gridEl.classList.add("d-none");
        modalWin.classList.remove("d-none");
        modalWin.classList.add("d-block");
      }

      console.log(punteggio);
      // Ciclo per colorare le caselle delle bombe di rosso (sconfitta)
      for (let x = 0; x < arrUniqueNumbers.length; x++) {
        if (i == arrUniqueNumbers[x]) {
          explode(square);
          gridEl.classList.add("d-none");
          modalLose.classList.remove("d-none");
          modalLose.classList.add("d-block");
          // alert("Hai perso, che scaaaaarso ahahahahaha");
        }
      }
    });
  }

  resetEl.addEventListener("click", function () {
    window.location.reload();
  });
});

// FUNCTIONS
function changeBackground(singleSquare) {
  singleSquare.style.backgroundColor = "#46793d";
}

function explode(bomb) {
  bomb.style.backgroundColor = "red";
  let audio = new Audio("audio/medium-explosion-40472.mp3");
  audio.play();
}

modalBtnLose.addEventListener("click", function () {
  modalLose.classList.remove("d-block");
  modalLose.classList.add("d-none");
  window.location.reload();
});

modalBtnWin.addEventListener("click", function () {
  modalWin.classList.remove("d-block");
  modalWin.classList.add("d-none");
  window.location.reload();
});
