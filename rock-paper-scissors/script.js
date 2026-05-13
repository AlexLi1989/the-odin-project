// create a function getComputerChoice, random return rock paper or scissors
const getComputerChoice = () => {
  let choices = ["rock", "paper", "scissors"];
  let randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
};
// create a function getHumanChoice, prompt user to choose rock paper or scissors, input should be case insensitive
const getHumanChoice = () => {
  let choice = prompt("Choose rock, paper, or scissors:", "rock").toLowerCase();
  return choice;
};

// create a function playGame, calls playRound for 5 times, keeps track of the scores and declares a winner at the end.
const playGame = () => {
  let humanScore = 0;
  let computerScore = 0;
  const playRound = () => {
    let result;
    let humanChoice = getHumanChoice();
    let computerChoice = getComputerChoice();
    if (humanChoice === computerChoice) {
      result = "It's a tie!";
      console.log(result);
    } else if (
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper")
    ) {
      result = `You Win! ${humanChoice} beats ${computerChoice}.`;
      console.log(result);
      humanScore++;
    } else if (
      (computerChoice === "rock" && humanChoice === "scissors") ||
      (computerChoice === "paper" && humanChoice === "rock") ||
      (computerChoice === "scissors" && humanChoice === "paper")
    ) {
      result = `You Lose! ${computerChoice} beats ${humanChoice}.`;
      console.log(result);
      computerScore++;
    }
  };
  for (let i = 0; i < 5; i++) {
    playRound();
  }
  p.textContent =
    humanScore === computerScore
      ? "It's a tie!"
      : humanScore > computerScore
        ? `You win the game! You win ${humanScore} out of 5.`
        : `You lose the game! Computer wins ${computerScore} out of 5.`;
};
const button = document.querySelector("button");
const p = document.querySelector("p");
button.addEventListener("click", () => {
  playGame();
});
