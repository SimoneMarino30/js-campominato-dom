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
// Score
let score = selectEl.value - quantity;
// init score copy
const STARTING_SCORE = score;
// Punteggio
let punteggio = 0;
let updatePunteggio = document.getElementById("counter");
updatePunteggio.innerHTML = punteggio;
// toWin
let toWin = document.getElementById("score-to-win");
// * 1UP vite
const livesID = document.getElementById("life");
const lives = document.createElement("div");

let life = 0;

let arrayEasyLife = [
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
];
let arrayMediumLife = [
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
  "🚀",
];
let arrayHardLife = ["🚀", "🚀", "🚀", "🚀", "🚀"];

// Array from 1 to 100
const array1to100 = Array.from({ length: 100 }, (_, index) => index + 1);
console.log(array1to100);

// Score to win default status page
scoreToWin();

// EVENT LISTENER
// Change score to win when selected difficulty
selectEl.addEventListener("click", function () {
  scoreToWin();
});

// al click genero i quadrati
buttonEl.addEventListener("click", function () {
  addLives();
  buttonEl.classList.add("hidden");
  selectEl.classList.add("hidden");
  resetEl.classList.remove("hidden");
  level();

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

  const arrayFilteredBombs = array1to100.filter(
    (num) => !arrUniqueNumbers.includes(num)
  );

  console.log(arrayFilteredBombs);
  console.log("------");
  console.log(arrUniqueNumbers);
  // for Loop that sets grid's size multipling square
  for (let i = 1; i <= selectEl.value; i++) {
    const square = document.createElement("button");

    if (selectEl.value == 100) square.classList.add("box-hard");

    if (selectEl.value == 81) square.classList.add("box-medium");

    if (selectEl.value == 49) square.classList.add("box-easy");

    // print progressiv number from 1 to 100 on each square
    square.innerHTML = i;
    document.getElementById("grid").appendChild(square);
    const cellValue = i;
    // AddEventListener square cell
    square.addEventListener("click", function () {
      // Change background grass if isn't a bomb
      changeBackground(square);

      // * Loop to check if it's a bomb or not
      for (let x = 0; x < arrUniqueNumbers.length; x++) {
        if (cellValue == arrUniqueNumbers[x]) {
          // punteggio & score don't increase
          punteggio -= 1;
          score += 1;
          life += 1;
          // Lives real time upgrade
          countDownLives();
          // change background + bomb sound
          explode(square);
          // modal lose pops up when life's up
          if (selectEl.value == 100 && life == 5) {
            modalLose.classList.remove("d-none");
            modalLose.classList.add("d-block");
          }
          if (selectEl.value == 81 && life == 10) {
            modalLose.classList.remove("d-none");
            modalLose.classList.add("d-block");
          }
          if (selectEl.value == 49 && life == 16) {
            modalLose.classList.remove("d-none");
            modalLose.classList.add("d-block");
          }
        }
      }

      // score board updates
      punteggio += 1;
      updatePunteggio.innerHTML = punteggio;
      // Score to win count down
      score -= 1;
      toWin.innerHTML = score;

      // if the score hits grid size - bombs quantity --> win!
      if (punteggio == STARTING_SCORE && score == 0) {
        modalWin.classList.remove("d-none");
        modalWin.classList.add("d-block");
      }
      // disable cliked bomb cell
      for (let z = 0; z < arrUniqueNumbers.length; z++) {
        if (cellValue == arrUniqueNumbers[z]) {
          square.disabled = true;
        }
      }
      // disable cliked clear cell
      for (let y = 0; y < arrayFilteredBombs.length; y++) {
        if (cellValue == arrayFilteredBombs[y]) {
          square.disabled = true;
        }
      }
    });
  }

  // reload pagina
  resetEl.addEventListener("click", function () {
    window.location.reload();
  });
});

// * *****
// ** FUNCTIONS
// * *****
function changeBackground(singleSquare) {
  // clear cells
  singleSquare.style.backgroundImage = "url(../img/grass.jpg)";
  singleSquare.style.backgroundSize = "1000px 1000px";
}

function explode(singleSquare) {
  // background red and bomb's audio
  singleSquare.style.backgroundImage = "";
  singleSquare.style.backgroundColor = "red";
  singleSquare.innerHTML = "💣";
  let audio = new Audio("audio/medium-explosion-40472.mp3");
  audio.play();
}
// modal lose btn
modalBtnLose.addEventListener("click", function () {
  modalLose.classList.remove("d-block");
  modalLose.classList.add("d-none");
  window.location.reload();
});
// modal win btn
modalBtnWin.addEventListener("click", function () {
  modalWin.classList.remove("d-block");
  modalWin.classList.add("d-none");
  window.location.reload();
});

// print lives(🚀) whithout commas
function addLives() {
  if (selectEl.value == 100) {
    // avoind printing commas
    let arrayString = arrayHardLife.join("");
    lives.innerHTML = arrayString;
    livesID.appendChild(lives);
  }
  if (selectEl.value == 81) {
    let arrayString = arrayMediumLife.join("");
    lives.innerHTML = arrayString;
    livesID.appendChild(lives);
  }
  if (selectEl.value == 49) {
    let arrayString = arrayEasyLife.join("");
    lives.innerHTML = arrayString;
    livesID.appendChild(lives);
  }
}

// remove lives real time withouth commas
function countDownLives() {
  if (selectEl.value == 100) {
    // Popping the last element from the array
    arrayHardLife.shift();
    // avoind printing commas
    let arrayString = arrayHardLife.join("");
    // update lives
    lives.innerHTML = arrayString;
  }
  if (selectEl.value == 81) {
    arrayMediumLife.shift();
    let arrayString = arrayMediumLife.join("");
    lives.innerHTML = arrayString;
  }
  if (selectEl.value == 49) {
    arrayEasyLife.shift();
    let arrayString = arrayEasyLife.join("");
    lives.innerHTML = arrayString;
  }
}

// dynamic level 💣💣💣
function level() {
  if (selectEl.value == 100) bombsLevel.innerHTML = "💣💣💣";

  if (selectEl.value == 81) bombsLevel.innerHTML = "💣💣";

  if (selectEl.value == 49) bombsLevel.innerHTML = "💣";
}

// score to win
function scoreToWin() {
  if (selectEl.value == 100) toWin.innerHTML = selectEl.value - quantity;

  if (selectEl.value == 81) toWin.innerHTML = selectEl.value - quantity;

  if (selectEl.value == 49) toWin.innerHTML = selectEl.value - quantity;
}

// **********************
// DRAGGABLE WINDOW
// ***********************
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
makeDraggable(document.querySelector("#myWindowAudio"));
// myWindowScore will be able to moved by grabbing the entire element
makeDraggable(document.querySelector("#myWindowScore"));

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
    name: "Chill 1 - audio 1",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: "08:47",
  },
  {
    name: "Chill 2 - audio 2",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "05:53",
  },
  {
    name: "Chill 3 - audio 3",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "06:12",
  },
  {
    name: "Chill 4 - audio 4",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: "04:39",
  },
  {
    name: "Psyco 5 - audio 5",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    duration: "02:02",
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
