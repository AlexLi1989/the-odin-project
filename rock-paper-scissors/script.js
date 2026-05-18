// create a function getHumanChoice, prompt user to choose rock paper or scissors, input should be case insensitive
// const getHumanChoice = () => {
//   let choice = prompt("Choose rock, paper, or scissors:", "rock").toLowerCase();
//   return choice;
// };

// create a function playGame, calls playRound for 5 times, keeps track of the scores and declares a winner at the end.
// const playGame = () => {
//   let humanScore = 0;
//   let computerScore = 0;
//   const playRound = () => {
//     let result;
//     let humanChoice = getHumanChoice();
//     let computerChoice = getComputerChoice();
//     if (humanChoice === computerChoice) {
//       result = "It's a tie!";
//       console.log(result);
//     } else if (
//       (humanChoice === "rock" && computerChoice === "scissors") ||
//       (humanChoice === "paper" && computerChoice === "rock") ||
//       (humanChoice === "scissors" && computerChoice === "paper")
//     ) {
//       result = `You Win! ${humanChoice} beats ${computerChoice}.`;
//       console.log(result);
//       humanScore++;
//     } else if (
//       (computerChoice === "rock" && humanChoice === "scissors") ||
//       (computerChoice === "paper" && humanChoice === "rock") ||
//       (computerChoice === "scissors" && humanChoice === "paper")
//     ) {
//       result = `You Lose! ${computerChoice} beats ${humanChoice}.`;
//       console.log(result);
//       computerScore++;
//     }
//   };
//   for (let i = 0; i < 5; i++) {
//     playRound();
//   }
//   p.textContent =
//     humanScore === computerScore
//       ? "It's a tie!"
//       : humanScore > computerScore
//         ? `You win the game! You win ${humanScore} out of 5.`
//         : `You lose the game! Computer wins ${computerScore} out of 5.`;
// };
// create a function getComputerChoice, random return rock paper or scissors

// DOM elements
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const resultDisplay = document.querySelector("#result");
const runningHumanScoreDisplay = document.querySelector("#runningHumanScore");
const runningComputerScoreDisplay = document.querySelector(
  "#runningComputerScore",
);
// initial score
let humanScore = 0;
let computerScore = 0;
// create a function playRound, compare humanChoice and computerChoice, update score and result display
const getComputerChoice = () => {
  let choices = ["rock", "paper", "scissors"];
  let randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
};
const updateScoreDisplay = () => {
  runningComputerScoreDisplay.textContent = computerScore;
  runningHumanScoreDisplay.textContent = humanScore;
};
const playRound = (humanChoice) => {
  let result;
  let computerChoice = getComputerChoice();
  if (humanChoice === computerChoice) {
    result = "It's a tie!";
    resultDisplay.textContent = result;
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    result = `You Win! ${humanChoice} beats ${computerChoice}.`;
    resultDisplay.textContent = result;
    humanScore += 1;
    updateScoreDisplay();
  } else {
    result = `You Lose! ${computerChoice} beats ${humanChoice}.`;
    resultDisplay.textContent = result;
    computerScore += 1;
    updateScoreDisplay();
  }
  setTimeout(() => {
    checkGameOver();
  }, 50);
};
const checkGameOver = () => {
  if (humanScore == 5) {
    humanScore = 0;
    computerScore = 0;
    updateScoreDisplay();
    alert("You Win!");
  } else if (computerScore == 5) {
    humanScore = 0;
    computerScore = 0;
    updateScoreDisplay();
    alert("You Lose!");
  }
};
rock.addEventListener("click", () => playRound("rock"));
paper.addEventListener("click", () => playRound("paper"));
scissors.addEventListener("click", () => playRound("scissors"));
updateScoreDisplay();
