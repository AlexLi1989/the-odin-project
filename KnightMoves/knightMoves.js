//function knightMoves should show shortest path from one vertex to another vertex
function knightMoves(start, end) {
  //a queue to keep track of next position to explore, and exclude visited positions
  //add second element that tracks entire pathing
  let queue = [[start, [start]]];
  let pointer = 0; //pointer to avoid using .shift()
  //helper function to generate next moves
  function possibleMoves(x, y) {
    let result = [];
    //possible moves from current position
    let moves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];
    for (let i = 0; i < moves.length; i++) {
      if (
        x + moves[i][0] <= 7 &&
        x + moves[i][0] >= 0 &&
        y + moves[i][1] <= 7 &&
        y + moves[i][1] >= 0
      ) {
        result.push([x + moves[i][0], y + moves[i][1]]);
      }
    }
    return result;
  }
  //set to check visited positions
  let visited = new Set();
  while (pointer < queue.length) {
    //dequeue the first position and record in set
    let current = queue[pointer];
    visited.add(JSON.stringify(current[0]));
    //check if end position is reached
    if (current[0][0] === end[0] && current[0][1] === end[1]) {
      return current[1];
    }
    //call possibleMoves and enqueue them
    let moves = possibleMoves(current[0][0], current[0][1]);
    for (let i = 0; i < moves.length; i++) {
      if (moves[i] !== null) {
        queue.push([moves[i], [...current[1], moves[i]]]);
      }
    }
    //move pointer
    pointer++;
  }
}
