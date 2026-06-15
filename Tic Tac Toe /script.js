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
    return board;
  }
  return {
    placeMark,
    printBoard,
    getBoardState,
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
  };
}
