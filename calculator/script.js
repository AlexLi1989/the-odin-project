const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
let firstNumber;
let secondNumber;
let operator;
const operate = (fNum, sNum, op) => {
  switch (op) {
    case "+":
      return add(fNum, sNum);
      break;
    case "-":
      return subtract(fNum, sNum);
      break;
    case "*":
      return multiply(fNum, sNum);
      break;
    case "/":
      return divide(fNum, sNum);
      break;
  }
};
