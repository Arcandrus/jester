let game = {
  score: 0,
  currentGame: [],
  playerMoves: [],
  choices: ["button1", "button2", "button3", "button4"],
  turnNumber: 0,
  lastButton: "",
  turnInProgress: true,
};

function newGame() {
  game.score = 0;
  game.currentGame = [];
  game.playerMoves = [];
  for (let circle of document.getElementsByClassName("circle")) {
    if (circle.getAttribute("data-listener") !== "true") {
      circle.addEventListener("click", (e) => {
        if (game.currentGame.length > 0 && !game.turnInProgress) {
          let move = e.target.getAttribute("id");
          lightsOn(move);
          game.lastButton = move;
          game.playerMoves.push(move);
          playerTurn();
        };
      });
      circle.setAttribute("data-listener", "true");
    };
  };
  showScore();
  addTurn();
};

function showScore() {
  document.getElementById("score").innerText = game.score;
};

function addTurn() {
  game.playerMoves = [];
  game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
  showTurns();
};

function lightsOn(circ) {
  document.getElementById(circ).classList.add("light");
  setTimeout(() => {
    document.getElementById(circ).classList.remove("light");
  }, 400);
};

function showTurns() {
  game.turnNumber = 0;
  game.turnInProgress = true;
  let turns = setInterval(() => {
    lightsOn(game.currentGame[game.turnNumber]);
    game.turnNumber++;
    if (game.turnNumber >= game.currentGame.length) {
      clearInterval(turns);
      game.turnInProgress = false;
    }
  }, 800);
};

function playerTurn() {
  let i = game.playerMoves.length - 1;
  if (game.currentGame[i] === game.playerMoves[i]) {
    if (game.currentGame.length == game.playerMoves.length) {
      game.score++;
      showScore();
      addTurn();
    };
  } else {
    alert("Wrong Move!");
    game.playerMoves = [];
    newGame();
  };
};

module.exports = {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn};