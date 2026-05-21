const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
let oldNumber = null;
let newNumber = "0";
let operator = null;
const display = document.querySelector(".display input");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const equals = document.querySelector("#equals");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
// operate function for calculation
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
//func for numbers appear as they are pressed
const numberPressed = (event) => {
  const pressedNumber = event.target.textContent;
  if (newNumber === "0") {
    newNumber = pressedNumber;
  } else {
    newNumber += pressedNumber;
  }
  display.value = `${oldNumber === null ? "" : oldNumber}${operator === null ? "" : operator}${newNumber}`;
};
numbers.forEach((button) => button.addEventListener("click", numberPressed));
//func for operator to appear and store the first number
const operatorPressed = (event) => {
  const pressedOperator = event.target.textContent;
  if (oldNumber === null && operator === null && newNumber != "0") {
    oldNumber = Number(display.value);
    operator = pressedOperator;
    display.value = `${oldNumber}${operator}`;
    newNumber = "0";
  }
};
operators.forEach((button) =>
  button.addEventListener("click", operatorPressed),
);
//func for equal to calculate using the three variable and return result as oldNumber
const equalPressed = (event) => {
  if (oldNumber !== null && operator !== null && newNumber != "0") {
    let fNum = Number(oldNumber);
    let sNum = Number(newNumber);
    let op = operator;
    oldNumber = operate(fNum, sNum, op);
    display.value = `${oldNumber}`;
    newNumber = "0";
    operator = null;
  }
};
equals.addEventListener("click", equalPressed);
