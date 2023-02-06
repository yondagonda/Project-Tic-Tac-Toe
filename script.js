/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable no-unreachable-loop */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  const grid = document.querySelector(".grid");
  return { gameboard, grid };
})();

const Player = (name, marker) => ({ name, marker });

function setPlayerNames() {
  const player1INput = document.getElementById("player1").value;
  const player2INput = document.getElementById("player2").value;
  player1 = Player(player1INput, "X");
  player2 = Player(player2INput, "O");
  document
    .querySelectorAll(".boxes")
    .forEach((x) => (x.style.pointerEvents = "auto"));
}

function hideShow() {
  document.querySelector(".popup").style.display = "none";
  document.querySelector(".header").style.display = "none";
  document.querySelector(".grid").style.display = "grid";
  document.querySelector(".display").innerHTML = "Game Starts!";
}

const Game = (() => {
  const submit = document.getElementById("submit-name");
  const winDisplay = document.querySelector(".winner");
  submit.addEventListener("click", setPlayerNames());
  let currentPlayer = player1;
  let anID = 0;
  let count = 0;

  function ID() {
    for (let i = 1; i < 9; i++) {
      anID = ++anID;
      return anID;
    }
  }

  function switchPlayer() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    return currentPlayer;
  }

  function clearArrary() {
    Gameboard.gameboard.splice(0, 9, "", "", "", "", "", "", "", "", "");
  }

  function endGame() {
    const boxes = document.querySelectorAll(".boxes");
    boxes.forEach((x) => (x.style.pointerEvents = "none"));
    document.querySelector(".display").style.display = "none";

    const restart = document.querySelector(".restart");
    restart.style.display = "block";
    restart.addEventListener("click", () => {
      location.reload();
    });

    const playAgain = document.querySelector(".play-again");
    playAgain.style.display = "block";
    playAgain.addEventListener("click", () => {
      clearArrary();
      count = 0;
      document.querySelector(".display").style.display = "block";
      document.querySelector(".display").innerHTML = "Game Starts!";
      winDisplay.innerHTML = "";
      boxes.forEach((box) => {
        box.style.pointerEvents = "auto";
        box.innerHTML = "";
      });
    });
  }

  function checkTie() {
    if (count === 9) {
      winDisplay.innerHTML = `Its a Draw!`;
      endGame();
    }
  }

  function checkWin(marker) {
    function Win(x, y, z) {
      return (
        Gameboard.gameboard[x] === marker &&
        Gameboard.gameboard[y] === marker &&
        Gameboard.gameboard[z] === marker
      ); // this func will return true, only if x,y,z is equal to the currentplayers marker
    }
    if (
      Win(0, 1, 2) ||
      Win(3, 4, 5) ||
      Win(6, 7, 8) ||
      Win(0, 3, 6) ||
      Win(1, 4, 7) ||
      Win(2, 5, 8) ||
      Win(0, 4, 8) ||
      Win(2, 4, 6)
    ) {
      winDisplay.innerHTML = `${currentPlayer.name.toUpperCase()} IS THE WINNER!`;
      endGame();
    }
  }

  Gameboard.gameboard.forEach((box) => {
    const element = document.createElement("div");
    const display = document.querySelector(".display");
    element.className = "boxes";
    element.id = ID();
    element.innerText = box;
    Gameboard.grid.appendChild(element);

    element.addEventListener("click", (e) => {
      const target = +e.target.id;
      if (target == element.id && e.target.innerText === "") {
        switchPlayer();
        switchPlayer();
        display.innerHTML = `Your turn, ${currentPlayer.name}`;
        switchPlayer();
        element.innerText = currentPlayer.marker;
        Gameboard.gameboard[target - 1] = currentPlayer.marker;
        count++;
        checkTie();
        checkWin("X");
        checkWin("O");
      }
      console.log(Gameboard.gameboard);
    });
    return { element };
  });
})();
