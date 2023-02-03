const Gameboard = (() => {
  const gameboard = ["X", "O", "", "O", "X", "O", "X", "", "X"];

  console.log(gameboard);

  const grid = document.querySelector(".grid");

  gameboard.forEach((box) => {
    const element = document.createElement("div");
    element.className = "boxes";
    element.innerText = box;
    grid.appendChild(element);

    element.addEventListener("click", (e) => {
      console.log(e.target);
    });
  });

  return { gameboard };
})();

// players are going to be stored in objects, create players with factories
// create an object that will control the flow of the game itself
