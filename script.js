/* eslint-disable no-return-assign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint no-unreachable-loop: ["error", { "ignore": ["ForStatement", "ForOfStatement"] }] */
const Gameboard = (() => {
  const gameboard = ["", "O", "", "", "", "", "X", "", ""];
  const grid = document.querySelector(".grid");

  return { gameboard, grid };
})();

const Player = (name, marker) => ({ name, marker });

const Game = (() => {
  const player1 = Player("jeff", "X");
  const player2 = Player("jon", "O");

  const currentPlayer = player2; // should be let, smh eslint
  console.log(Gameboard.gameboard);

  let anID = 0;
  function ID() {
    for (let i = 1; i < 9; i++) {
      anID = ++anID;
      return anID;
    }
  }

  Gameboard.gameboard.forEach((box) => {
    const element = document.createElement("div");
    element.className = "boxes";
    element.id = ID();

    element.innerText = box;
    Gameboard.grid.appendChild(element);

    function switchPlayer() {
      if (currentPlayer === player1) {
        const currentPlayer = player2;
        console.log("hi");
      }
      if (currentPlayer === player2) {
        console.log("bye");
        const currentPlayer = player1;
      }
      return currentPlayer;
    }

    element.addEventListener("click", (e) => {
      const target = +e.target.id;
      switchPlayer();
      console.log(currentPlayer);
      Gameboard.gameboard = Gameboard.gameboard.map(() => {
        if (target == element.id && element.innerText === "") {
          element.innerText = currentPlayer.marker;
        }
      });
      // return (currentPlayer = player2); // this part allows it to switch player, but only once
    });
  });
})();
