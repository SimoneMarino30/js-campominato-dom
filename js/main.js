// CONSEGNA DAY 1
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

// Consigli del giorno
// Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio
// Di cosa ho bisogno per generare i numeri?
// Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// Le validazioni e i controlli possiamo farli anche in un secondo momento.

// clicco sul bottone
// genero una griglia di box(10x10)
// genero dei numeri progressivi all'interno da 1 a 100
// clicco sulla cella
// la cella si colora di azzurro
// console.log del numero di cellla cliccata

// CONSEGNA DAY 2
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe)

/*********************************************************************
 *                                                                   *
 *                        ON LOAD                                    *
 *                                                                   *
 *********************************************************************/
// BUTTON
const buttonEl = document.getElementById("myBtn");

buttonEl.addEventListener("click", function () {
  const gridEl = document.getElementById("grid");
  const selectEl = document.getElementById("complexity");
  // SELECT
  const difficulty = selectEl.value;
  // console.log(difficulty);
  // invocazione function grid
  gridClick(gridEl, difficulty);
});

/*********************************************************************
 *                                                                   *
 *                        FUNCTIONS                                  *
 *                                                                   *
 *********************************************************************/

function gridClick(grid_El, select_El) {
  // resetto la griglia
  grid_El.innerHTML = "";

  let numeroCelle;
  const arrayNumbers = [];

  if (select_El == 1) {
    numeroCelle = 100;
    while (arrayNumbers.length < 16) {
      randomNumbers = Math.floor(Math.random() * numeroCelle) + 1;
      if (!arrayNumbers.includes(randomNumbers)) {
        arrayNumbers.push(randomNumbers);
      }
    }
  } else if (select_El == 2) {
    numeroCelle = 81;
    while (arrayNumbers.length < 16) {
      randomNumbers = Math.floor(Math.random() * numeroCelle) + 1;
      if (!arrayNumbers.includes(randomNumbers)) {
        arrayNumbers.push(randomNumbers);
      }
    }
  } else {
    numeroCelle = 49;
    while (arrayNumbers.length < 16) {
      randomNumbers = Math.floor(Math.random() * numeroCelle) + 1;
      if (!arrayNumbers.includes(randomNumbers)) {
        arrayNumbers.push(randomNumbers);
      }
    }
  }
  console.log(arrayNumbers);

  // genero una griglia di box
  for (let i = 0; i < numeroCelle; i++) {
    let textNumber = i + 1;

    // creo il div all' interno della griglia
    const gridBox = document.createElement("div");

    // aggiungo la classe .box
    gridBox.classList.add("box");

    // aggiungo un addeventlistener per il toggle classe .active (coloro il background)
    gridBox.addEventListener("click", function () {
      // aggiungo la classe active
      this.classList.toggle("active");

      //   stampo un messaggio in console con il numero della cella cliccata.
      console.log(textNumber);
      console.log(arrayNumbers);
    });

    // aggiungo il .box alla griglia
    grid_El.append(gridBox);
    // aggiungo il numero progressivo al .box
    gridBox.append(textNumber);

    if (select_El == 2) {
      // aggiungo i livelli di difficolta'
      gridBox.classList.add("box-medium");
    } else if (select_El == 3) {
      gridBox.classList.add("box-hard");
    }
  }

  //   return alert("Hello World!");
}

// gridBox.append(arraySingleNumber[i]);
