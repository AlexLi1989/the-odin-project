//wrap everything in factory as much as possible

//iife to create a game board
const gameBoard = (function createGameBoard() {
  //use rows and columns to define a 2d gameboard
  const rows = 3;
  const columns = 3;
  const board = [];
  //adding rows
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    //adding columns
    for (let j = 0; j < columns; j++) {
      board[i].push("");
    }
  }
  //method to interact with board
  function placeMark(row, col, mark) {
    board[row][col] = mark;
  }

  //method to print out game board
  function printBoard() {
    let output = "";
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cell = board[i][j] === "" ? "_" : board[i][j];
        output += cell + " ";
      }
      output += "\n";
    }
    console.log(output);
  }

  //method to get board state
  function getBoardState() {
    //not to return board directly because it will allow players to modify the board directly
    //so return a copy of the board instead
    return board.map((row) => [...row]);
  }

  //method to reset board
  function resetBoard() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        board[i][j] = "";
      }
    }
  }

  return {
    placeMark,
    printBoard,
    getBoardState,
    resetBoard,
  };
})();

//factory to create player object
function createPlayer(name, mark) {
  let score = 0;
  return {
    name: name,
    mark: mark,
    getScore: function () {
      return score;
    },
    incrementScore: function () {
      score++;
    },
    resetScore: function () {
      score = 0;
    },
  };
}

//iife to create game controller
const gameController = (function createController() {
  //create two player objects
  //player1 will be the first player to play the game
  let player1 = createPlayer("Player 1", "X");
  let player2 = createPlayer("Player 2", "O");
  let currentPlayer = player1;
  let isGameOver = false;

  //method for getting players
  function getPlayers() {
    return [player1, player2];
  }

  //method for switching current player
  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  //method for getting current player
  function getCurrentPlayer() {
    return currentPlayer;
  }

  //method for checking win condition
  function isWon() {
    const board = gameBoard.getBoardState();
    //check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === currentPlayer.mark &&
        board[i][1] === currentPlayer.mark &&
        board[i][2] === currentPlayer.mark
      ) {
        return true;
      }
    }
    // check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === currentPlayer.mark &&
        board[1][i] === currentPlayer.mark &&
        board[2][i] === currentPlayer.mark
      ) {
        return true;
      }
    }
    //check diagonals
    if (
      board[0][0] === currentPlayer.mark &&
      board[1][1] === currentPlayer.mark &&
      board[2][2] === currentPlayer.mark
    ) {
      return true;
    } else if (
      board[0][2] === currentPlayer.mark &&
      board[1][1] === currentPlayer.mark &&
      board[2][0] === currentPlayer.mark
    ) {
      return true;
    }
    return false;
  }

  //method for playing a round
  function playRound(row, col) {
    //get current board state
    const currentBoard = gameBoard.getBoardState();
    //check if game over or not
    if (isGameOver) {
      return "Game over!";
    }

    //if cell is empty, allows placement
    if (currentBoard[row][col] === "") {
      gameBoard.placeMark(row, col, currentPlayer.mark);
      gameBoard.printBoard();
      if (isWon()) {
        isGameOver = true;
        currentPlayer.incrementScore();
        return `${currentPlayer.name} wins!`;
      }
      const updatedBoard = gameBoard.getBoardState();
      if (!updatedBoard.flat().includes("")) //tie condition
      {
        isGameOver = true;
        return "It's a tie!";
      }
      switchPlayer();
      return "proceed";
    } else {
      return "Cell already occupied. Please choose another cell.";
    }
  }

  //method for resetting the game
  function resetGame() {
    gameBoard.resetBoard();
    gameBoard.printBoard();
    isGameOver = false;
  }

  //method for changing players name according to input
  function changeName(name1, name2) {
    player1.name = name1 === "" ? "Player 1" : name1;
    player2.name = name2 === "" ? "Player 2" : name2;
    player1.resetScore();
    player2.resetScore();
    resetGame();
  }

  return {
    playRound,
    getPlayers,
    getCurrentPlayer,
    resetGame,
    changeName,
  };
})();

//iife to create screen controller
const screenController = (function createScreenController() {
  const screenBoard = document.querySelector(".board");
  const player1NameDisplay = document.querySelector(".player-1-card h2 span");
  const player1ScoreDisplay = document.querySelector(".player-1-card p span");
  const player2NameDisplay = document.querySelector(".player-2-card h2 span");
  const player2ScoreDisplay = document.querySelector(".player-2-card p span");
  const currentPlayerDisplay = document.querySelector(
    ".current-player h3 span",
  );
  const warning = document.querySelector(".warning p");
  const result = document.querySelector(".result p");
  const newGameButton = document.querySelector(".new-game-btn");
  const newPlayerButton = document.querySelector(".new-players-btn");
  const player1Input = document.querySelector("#player-1");
  const player2Input = document.querySelector("#player-2");

  //method to update score board
  function updateScoreBoard() {
    const players = gameController.getPlayers();
    const activePlayer = gameController.getCurrentPlayer();
    player1NameDisplay.textContent = players[0].name;
    player1ScoreDisplay.textContent = players[0].getScore();
    player2NameDisplay.textContent = players[1].name;
    player2ScoreDisplay.textContent = players[1].getScore();
    currentPlayerDisplay.textContent = activePlayer.name;
  }

  //method to render visual game board
  function updateScreen() {
    const currentBoard = gameBoard.getBoardState();
    screenBoard.innerHTML = "";
    currentBoard.flat().forEach((value, index) => {
      const cell = document.createElement("button");
      cell.classList.add("cell");
      cell.textContent = value;
      cell.dataset.row = Math.floor(index / 3);
      cell.dataset.col = index % 3;
      screenBoard.appendChild(cell);
    });
  }
  //method for handling player click
  function clickHandler(event) {
    const clickedCell = event.target;
    if (!clickedCell.classList.contains("cell")) return;
    const row = parseInt(clickedCell.dataset.row);
    const col = parseInt(clickedCell.dataset.col);

    //run play round method
    let output = gameController.playRound(row, col);
    warning.textContent = ""; // clear messages
    result.textContent = "";
    updateScreen(); // update first
    updateScoreBoard();
    if (output === "proceed") {
      return;
    } else if (
      output === "Cell already occupied. Please choose another cell."
    ) {
      warning.textContent = output;
      return;
    } else {
      result.textContent = output;
      return;
    }
  }

  //method for new game
  function newGame() {
    gameController.resetGame();
    warning.textContent = ""; // clear messages
    result.textContent = "";
    updateScreen();
    updateScoreBoard();
  }

  //method for changing player names
  function changePlayerNames() {
    gameController.changeName(player1Input.value, player2Input.value);
    player1Input.value = ""; // clear inputs
    player2Input.value = "";
    warning.textContent = ""; // clear messages
    result.textContent = "";
    updateScreen();
    updateScoreBoard();
  }

  screenBoard.addEventListener("click", clickHandler);
  newGameButton.addEventListener("click", newGame);
  newPlayerButton.addEventListener("click", changePlayerNames);
  updateScreen();
  updateScoreBoard();
})();
