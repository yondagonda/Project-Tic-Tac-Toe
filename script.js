/* eslint-disable no-use-before-define */
/* eslint-disable no-return-assign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint no-unreachable-loop: ["error", { "ignore": ["ForStatement", "ForOfStatement"] }] */
const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  const grid = document.querySelector(".grid");
  return { gameboard, grid };
})();

const Game = (() => {
  const Player = (name, marker) => ({ name, marker }); // player factory function
  const player1 = Player("jeff", "X");
  const player2 = Player("jon", "O");
  const winDisplay = document.querySelector(".winner");
  let currentPlayer = player1;
  let anID = 0;

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
  }

  function checkWin(marker) {
    function Win(x, y, z) {
      return (
        Gameboard.gameboard[x] === marker &&
        Gameboard.gameboard[y] === marker &&
        Gameboard.gameboard[z] === marker
      );
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
    } else if (count === 9) {
      winDisplay.innerHTML = `Its a Draw!`;
      endGame();
    }
  }
  console.log(Gameboard.gameboard);
  let count = 0;

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
        element.innerText = currentPlayer.marker;
        Gameboard.gameboard[target - 1] = currentPlayer.marker;
        checkWin("X");
        checkWin("O");
        count += 1;
        switchPlayer();
      }
      display.innerHTML = `it's ${currentPlayer.name}s turn`;
      console.log(Gameboard.gameboard);
      console.log(count);
    });
    return { element };
  });
})();
