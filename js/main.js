// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.

// COSTANTI

// Prendo il bottone
const buttonEl = document.getElementById("button");
// Prendo la select
const selectEl = document.getElementById("complexity");
const bombsLevel = document.getElementById("level-bombs");
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
let updatePunteggio = document.getElementById("counter");
updatePunteggio.innerHTML = 0;

// Level
if (selectEl.value == 100) bombsLevel.innerHTML = "easy";

if (selectEl.value == 81) bombsLevel.innerHTML = "medium";

if (selectEl.value == 49) bombsLevel.innerHTML = "hard";

// EVENT LISTENER
// Cambio value select in tempo reale
selectEl.addEventListener("click", function () {
  if (selectEl.value == 100) bombsLevel.innerHTML = "easy";

  if (selectEl.value == 81) bombsLevel.innerHTML = "medium";

  if (selectEl.value == 49) bombsLevel.innerHTML = "hard";
});

// al click genero i quadrati
buttonEl.addEventListener("click", function () {
  buttonEl.classList.add("hidden");
  selectEl.classList.add("hidden");
  resetEl.classList.remove("hidden");

  const gridEl = document.getElementById("grid");
  gridEl.classList.add("outer-grid-border");
  gridEl.innerHTML = "";
  // Ciclo che crea array di numeri unici in base alla difficoltà scelta
  while (arrUniqueNumbers.length < quantity) {
    const randomNumber = Math.floor(Math.random() * selectEl.value) + 1;

    if (!arrUniqueNumbers.includes(randomNumber))
      arrUniqueNumbers.push(randomNumber);
  }

  // Ordino i numeri in maniera crescente
  arrUniqueNumbers.sort(function (a, b) {
    return a - b;
  });

  console.log(arrUniqueNumbers);

  for (let i = 1; i <= selectEl.value; i++) {
    const square = document.createElement("button");

    if (selectEl.value == 100) square.classList.add("box");

    if (selectEl.value == 81) square.classList.add("box-medium");

    if (selectEl.value == 49) square.classList.add("box-hard");

    // Ogni cella ha un numero progressivo, da 1 a 100.
    square.innerHTML = i;
    document.getElementById("grid").appendChild(square);

    // Aggiungo un gestore di eventi al clic di ciascun quadrato
    square.addEventListener("click", function () {
      punteggio += 1;

      // score board
      updatePunteggio.innerHTML = punteggio;

      // Quando l'utente clicca su ogni cella, la cella cliccata si colora come il background
      changeBackground(square);
      // ed emetto un messaggio in console con il numero della cella cliccata
      console.log(i);
      // se il punteggio è uguale alla lunghezza dell' array --> vittoria!
      if (punteggio == selectEl.value - arrUniqueNumbers.length) {
        // alert("Hai vinto");
        // gridEl.classList.add("d-none");
        modalWin.classList.remove("d-none");
        modalWin.classList.add("d-block");
      }

      console.log("score = " + punteggio);

      // Ciclo per far uscire la modal se il punteggio è uguale ad un numero dell' array di bombe --> sconfitta!
      for (let x = 0; x < arrUniqueNumbers.length; x++) {
        if (i == arrUniqueNumbers[x]) {
          // se perdo il punteggio non conteggia la cela con la bomba
          punteggio -= 1;
          // score board
          updatePunteggio.innerHTML = punteggio;
          explode(square);
          // gridEl.classList.add("d-none");
          modalLose.classList.remove("d-none");
          modalLose.classList.add("d-block");
          // alert("Hai perso, che scaaaaarso ahahahahaha");
        }
      }
    });
  }
  // reload pagina
  resetEl.addEventListener("click", function () {
    window.location.reload();
  });
});

// FUNCTIONS
function changeBackground(singleSquare) {
  singleSquare.style.backgroundImage = "url(../img/grass.jpg)";
  singleSquare.style.backgroundSize = "1000px 1000px";
  singleSquare.innerHTML = "🏵️";
}

function explode(singleSquare) {
  // coloro la casella della bomba di rosso e play audio bomba
  singleSquare.style.backgroundImage = "";
  singleSquare.style.backgroundColor = "red";
  singleSquare.innerHTML = "💣";
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

/*******
 *
 * AUDIO PLAYER
 *
 *******/
function createTrackItem(index, name, duration) {
  var trackItem = document.createElement("div");
  trackItem.setAttribute("class", "playlist-track-ctn");
  trackItem.setAttribute("id", "ptc-" + index);
  trackItem.setAttribute("data-index", index);
  document.querySelector(".playlist-ctn").appendChild(trackItem);

  var playBtnItem = document.createElement("div");
  playBtnItem.setAttribute("class", "playlist-btn-play");
  playBtnItem.setAttribute("id", "pbp-" + index);
  document.querySelector("#ptc-" + index).appendChild(playBtnItem);

  var btnImg = document.createElement("i");
  btnImg.setAttribute("class", "fas fa-play");
  btnImg.setAttribute("height", "40");
  btnImg.setAttribute("width", "40");
  btnImg.setAttribute("id", "p-img-" + index);
  document.querySelector("#pbp-" + index).appendChild(btnImg);

  var trackInfoItem = document.createElement("div");
  trackInfoItem.setAttribute("class", "playlist-info-track");
  trackInfoItem.innerHTML = name;
  document.querySelector("#ptc-" + index).appendChild(trackInfoItem);

  var trackDurationItem = document.createElement("div");
  trackDurationItem.setAttribute("class", "playlist-duration");
  trackDurationItem.innerHTML = duration;
  document.querySelector("#ptc-" + index).appendChild(trackDurationItem);
}

var listAudio = [
  {
    name: "Artist 1 - audio 1",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: "08:47",
  },
  {
    name: "Artist 2 - audio 2",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "05:53",
  },
  {
    name: "Artist 3 - audio 3",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "06:12",
  },
  {
    name: "Artist 4 - audio 4",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: "04:39",
  },
];

for (var i = 0; i < listAudio.length; i++) {
  createTrackItem(i, listAudio[i].name, listAudio[i].duration);
}
var indexAudio = 0;

function loadNewTrack(index) {
  var player = document.querySelector("#source-audio");
  player.src = listAudio[index].file;
  document.querySelector(".title").innerHTML = listAudio[index].name;
  this.currentAudio = document.getElementById("myAudio");
  this.currentAudio.load();
  this.toggleAudio();
  this.updateStylePlaylist(this.indexAudio, index);
  this.indexAudio = index;
}

var playListItems = document.querySelectorAll(".playlist-track-ctn");

for (let i = 0; i < playListItems.length; i++) {
  playListItems[i].addEventListener("click", getClickedElement.bind(this));
}

function getClickedElement(event) {
  for (let i = 0; i < playListItems.length; i++) {
    if (playListItems[i] == event.target) {
      var clickedIndex = event.target.getAttribute("data-index");
      if (clickedIndex == this.indexAudio) {
        // alert('Same audio');
        this.toggleAudio();
      } else {
        loadNewTrack(clickedIndex);
      }
    }
  }
}

document.querySelector("#source-audio").src = listAudio[indexAudio].file;
document.querySelector(".title").innerHTML = listAudio[indexAudio].name;

var currentAudio = document.getElementById("myAudio");

currentAudio.load();

currentAudio.onloadedmetadata = function () {
  document.getElementsByClassName("duration")[0].innerHTML = this.getMinutes(
    this.currentAudio.duration
  );
}.bind(this);

var interval1;

function toggleAudio() {
  if (this.currentAudio.paused) {
    document.querySelector("#icon-play").style.display = "none";
    document.querySelector("#icon-pause").style.display = "block";
    document
      .querySelector("#ptc-" + this.indexAudio)
      .classList.add("active-track");
    this.playToPause(this.indexAudio);
    this.currentAudio.play();
  } else {
    document.querySelector("#icon-play").style.display = "block";
    document.querySelector("#icon-pause").style.display = "none";
    this.pauseToPlay(this.indexAudio);
    this.currentAudio.pause();
  }
}

function pauseAudio() {
  this.currentAudio.pause();
  clearInterval(interval1);
}

var timer = document.getElementsByClassName("timer")[0];

var barProgress = document.getElementById("myBar");

var width = 0;

function onTimeUpdate() {
  var t = this.currentAudio.currentTime;
  timer.innerHTML = this.getMinutes(t);
  this.setBarProgress();
  if (this.currentAudio.ended) {
    document.querySelector("#icon-play").style.display = "block";
    document.querySelector("#icon-pause").style.display = "none";
    this.pauseToPlay(this.indexAudio);
    if (this.indexAudio < listAudio.length - 1) {
      var index = parseInt(this.indexAudio) + 1;
      this.loadNewTrack(index);
    }
  }
}

function setBarProgress() {
  var progress =
    (this.currentAudio.currentTime / this.currentAudio.duration) * 100;
  document.getElementById("myBar").style.width = progress + "%";
}

function getMinutes(t) {
  var min = parseInt(parseInt(t) / 60);
  var sec = parseInt(t % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (min < 10) {
    min = "0" + min;
  }
  return min + ":" + sec;
}

var progressbar = document.querySelector("#myProgress");
progressbar.addEventListener("click", seek.bind(this));

function seek(event) {
  var percent = event.offsetX / progressbar.offsetWidth;
  this.currentAudio.currentTime = percent * this.currentAudio.duration;
  barProgress.style.width = percent * 100 + "%";
}

function forward() {
  this.currentAudio.currentTime = this.currentAudio.currentTime + 5;
  this.setBarProgress();
}

function rewind() {
  this.currentAudio.currentTime = this.currentAudio.currentTime - 5;
  this.setBarProgress();
}

function next() {
  if (this.indexAudio < listAudio.length - 1) {
    var oldIndex = this.indexAudio;
    this.indexAudio++;
    updateStylePlaylist(oldIndex, this.indexAudio);
    this.loadNewTrack(this.indexAudio);
  }
}

function previous() {
  if (this.indexAudio > 0) {
    var oldIndex = this.indexAudio;
    this.indexAudio--;
    updateStylePlaylist(oldIndex, this.indexAudio);
    this.loadNewTrack(this.indexAudio);
  }
}

function updateStylePlaylist(oldIndex, newIndex) {
  document.querySelector("#ptc-" + oldIndex).classList.remove("active-track");
  this.pauseToPlay(oldIndex);
  document.querySelector("#ptc-" + newIndex).classList.add("active-track");
  this.playToPause(newIndex);
}

function playToPause(index) {
  var ele = document.querySelector("#p-img-" + index);
  ele.classList.remove("fa-play");
  ele.classList.add("fa-pause");
}

function pauseToPlay(index) {
  var ele = document.querySelector("#p-img-" + index);
  ele.classList.remove("fa-pause");
  ele.classList.add("fa-play");
}

function toggleMute() {
  var btnMute = document.querySelector("#toggleMute");
  var volUp = document.querySelector("#icon-vol-up");
  var volMute = document.querySelector("#icon-vol-mute");
  if (this.currentAudio.muted == false) {
    this.currentAudio.muted = true;
    volUp.style.display = "none";
    volMute.style.display = "block";
  } else {
    this.currentAudio.muted = false;
    volMute.style.display = "none";
    volUp.style.display = "block";
  }
}
// DRAGGABLE WINDOW
function makeDraggable(elmnt) {
  // Make an element draggable
  let currentPosX = 0,
    currentPosY = 0,
    previousPosX = 0,
    previousPosY = 0;

  // Otherwise, move the element itself
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    // Prevent any default action on this element (you can remove if you need this element to perform its default action)
    e.preventDefault();
    // Get the mouse cursor position and set the initial previous positions to begin
    previousPosX = e.clientX;
    previousPosY = e.clientY;
    // When the mouse is let go, call the closing event
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    // Prevent any default action on this element (you can remove if you need this element to perform its default action)
    e.preventDefault();
    // Calculate the new cursor position by using the previous x and y positions of the mouse
    currentPosX = previousPosX - e.clientX;
    currentPosY = previousPosY - e.clientY;
    // Replace the previous positions with the new x and y positions of the mouse
    previousPosX = e.clientX;
    previousPosY = e.clientY;
    // Set the element's new position
    elmnt.style.top = elmnt.offsetTop - currentPosY + "px";
    elmnt.style.left = elmnt.offsetLeft - currentPosX + "px";
  }

  function closeDragElement() {
    // Stop moving when mouse button is released and release events
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Drag myWindow
makeDraggable(document.querySelector("#myWindow"));
