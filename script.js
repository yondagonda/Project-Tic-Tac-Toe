/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  const grid = document.querySelector(".grid");
  return { gameboard, grid };
})();

const Player = (name, marker) => ({ name, marker }); // player factory function

function setPlayerNames() {
  const player1INput = document.getElementById("player1").value;
  const player2INput = document.getElementById("player2").value;
  console.log(player1INput);
  console.log(player2INput);
  // eslint-disable-next-line no-undef
  player1 = Player(player1INput, "X");
  // eslint-disable-next-line no-undef
  player2 = Player(player2INput, "O");
  document
    .querySelectorAll(".boxes")
    .forEach((x) => (x.style.pointerEvents = "auto"));
}

function hidePopup() {
  document.querySelector(".popup").style.display = "none";
}

const Game = (() => {
  const submit = document.getElementById("submit-name");
  submit.addEventListener("click", setPlayerNames());

  let currentPlayer = player1;
  const winDisplay = document.querySelector(".winner");
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

  function endGame() {
    document
      .querySelectorAll(".boxes")
      .forEach((x) => (x.style.pointerEvents = "none"));
    document.querySelector(".display").style.display = "none";

    const restart = document.querySelector(".restart");
    restart.style.display = "block";
    restart.addEventListener("click", () => {
      location.reload();
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
    element.className = "boxes";
    element.id = ID();

    element.innerText = box;
    Gameboard.grid.appendChild(element);
    const display = document.querySelector(".display");

    element.addEventListener("click", (e) => {
      const target = +e.target.id;
      if (target == element.id && e.target.innerText === "") {
        switchPlayer();
        switchPlayer();
        display.innerHTML = `now ${currentPlayer.name}'s turn`;
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
