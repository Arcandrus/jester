const {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn} = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => {});

beforeAll( () => {
  let fs = require("fs");
  let fileContents = fs.readFileSync("index.html", "utf-8");
  document.open();
  document.write(fileContents);
  document.close();
});

describe("game object contains relevant information", () => {
  test("score key exists", () => {
    expect("score" in game).toBe(true);
  });
  test("currentGame key exists", () => {
    expect("currentGame" in game).toBe(true);
  });
  test("playerMoves key exists", () => {
    expect("playerMoves" in game).toBe(true);
  });
  test("choices key exists", () => {
    expect("choices" in game).toBe(true);
  });
  test("turnNumber key exists", () => {
    expect("turnNumber" in game).toBe(true);
  });
  test("choices contains correct ID", () => {
    expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
  });
});

describe("new game functionality", () => {
  beforeAll(() => {
    game.score = 42;
    game.playerMoves.append = "button1";
    game.currentGame.append = "button1";
    document.getElementById("score").innertext = "42";
    newGame();
  });
  test("score key reset", () => {
    expect(game.score).toEqual(0);
  });
  test("playerMoves key reset", () => {
    expect(game.playerMoves).toEqual([]);
  });
  test("currentGame contains 1 element", () => {
    expect(game.currentGame.length).toEqual(1);
  });
  test("display score of 0", () => {
    expect(document.getElementById("score").innerText).toEqual(0);
  });
  test("expect data-listener to be true", () => {
    const elements = document.getElementsByClassName("circle");
    for (let element of elements) {
      expect(element.getAttribute("data-listener")).toEqual("true");
    };
  });
});

describe("gameplay functionality", () => {
  beforeEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    addTurn();
  });
  afterEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
  });
  test("addTurn adds a new turn to the game", () => {
    addTurn();
    expect(game.currentGame.length).toEqual(2);
  });
  test("should add correct class to light up button", () => {
    let button = document.getElementById(game.currentGame[0]);
    lightsOn(game.currentGame[0]);
    expect(button.classList).toContain("light");
  });
  test("showTurns should update gameTurn number", () => {
    game.turnNumber = 42;
    showTurns();
    expect(game.turnNumber).toEqual(0);
  });
  test("score should increase if player chooses correctly", () => {
    game.playerMoves.push(game.currentGame[0]);
    playerTurn();
    expect(game.score).toEqual(1);
  });
  test("should call an alert if the move is wrong", () => {
    game.playerMoves.push("wrong");
    playerTurn();
    expect(window.alert).toBeCalledWith("Wrong Move!");
  });
  test("sequence currently being displayed", () => {
    showTurns();
    expect(game.turnInProgress).toEqual(true);
  });
  test("cannot click during sequence", () => {
    showTurns();
    game.lastButton = "";
    document.getElementById("button2").click();
    expect(game.lastButton).toEqual("");
  });
  test("new game clears all arrays", () => {
    newGame();
    expect(game.playerMoves).toEqual([]);
  });
});