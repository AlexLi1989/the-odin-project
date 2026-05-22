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
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const separator = document.querySelector("#separator");
const minus = document.querySelector("#minus");
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
  if (oldNumber !== null && operator == null && newNumber == "0")
    // situation for pressing number when previous calculation just done and old result is on display
    oldNumber = null;
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
  if (operator != null && newNumber === "0") // situation for replacing operator
  {
    operator = pressedOperator;
    display.value = `${oldNumber}${operator}`;
  } else if (
    oldNumber === null &&
    operator === null &&
    newNumber != "0"
  ) // situation for inputting from default state
  {
    oldNumber = Number(newNumber);
    newNumber = "0";
    operator = pressedOperator;
    display.value = `${oldNumber}${operator}`;
  } else if (
    oldNumber !== null &&
    operator === null &&
    newNumber == "0"
  ) // situation for calculation with last result as oldNumber
  {
    newNumber = "0";
    operator = pressedOperator;
    display.value = `${oldNumber}${operator}`;
  } else if (
    oldNumber !== null &&
    operator !== null &&
    newNumber != "0"
  ) // situation for pressing operator when 3 variables are present
  {
    equalPressed();
    newNumber = "0";
    operator = pressedOperator;
    display.value = `${oldNumber}${operator}`;
  }
};
operators.forEach((button) =>
  button.addEventListener("click", operatorPressed),
);
//func for equal button to calculate using the three variables and return result as oldNumber
const equalPressed = (event) => {
  if (oldNumber !== null && operator === "/" && newNumber === "0") {
    display.value = `Error 404!`;
    oldNumber = null;
    newNumber = "0";
    operator = null;
    return;
  }
  if (oldNumber !== null && operator !== null) {
    let fNum = Number(oldNumber);
    let sNum = newNumber === "-" ? 0 : Number(newNumber);
    let op = operator;
    let rawResult = operate(fNum, sNum, op);
    oldNumber = parseFloat(rawResult.toFixed(2));
    display.value = `${oldNumber}`;
    newNumber = "0";
    operator = null;
  }
};
equals.addEventListener("click", equalPressed);
//func for clear button to clear the display and reset all variables
const clearPressed = (event) => {
  oldNumber = null;
  newNumber = "0";
  operator = null;
  display.value = "0";
};
clear.addEventListener("click", clearPressed);
//func for backspace button to remove the last character
const backspacePressed = (event) => {
  if (
    oldNumber !== null &&
    operator !== null &&
    newNumber != "0"
  ) // situation for when all three variables are present
  {
    newNumber = newNumber.slice(0, -1);
    if (newNumber === "" || newNumber === "-") newNumber = "0";
    display.value = `${oldNumber}${operator}`;
  } else if (
    //situation for when only oldNumber and operator are present
    oldNumber !== null &&
    operator !== null &&
    newNumber === "0"
  ) {
    operator = null;
    newNumber = String(oldNumber);
    oldNumber = null;
    display.value = `${newNumber}`;
  } else if (
    //situation for when only oldNumber is present
    oldNumber !== null &&
    operator === null &&
    newNumber === "0"
  ) {
    let oldStr = String(oldNumber).slice(0, -1);
    if (oldStr === "" || oldStr === "-") {
      oldNumber = null;
      newNumber = "0";
      display.value = "0";
    } else {
      oldNumber = Number(oldStr);
      display.value = `${oldNumber}`;
    }
  } else if (
    //situation for when only newNumber is present
    oldNumber === null &&
    operator === null &&
    newNumber !== "0"
  ) {
    newNumber = newNumber.slice(0, -1);
    display.value = `${newNumber}`;
    if (newNumber === "") newNumber = "0";
  }
};
backspace.addEventListener("click", backspacePressed);

//func for separator
const separatorPressed = (event) => {
  const sep = event.target.textContent;
  if (oldNumber !== null && operator === null && newNumber === "0") {
    oldNumber = null;
    newNumber = "0" + sep;
    display.value = `${newNumber}`;
    return;
  }
  if (newNumber.includes(sep)) return;
  if (newNumber === "0" || newNumber === "") {
    newNumber = "0" + sep;
  } else {
    newNumber += sep;
  }
  display.value = `${oldNumber === null ? "" : oldNumber}${operator === null ? "" : operator}${newNumber}`;
};
separator.addEventListener("click", separatorPressed);

//func for minus button,dealing with entering negative values on top of normal operator function
const minusPressed = (event) => {
  const pressedOperator = event.target.textContent;
  if (newNumber === "-") return;
  if (operator !== null && newNumber === "0") {
    newNumber = "-";
    display.value = `${oldNumber}${operator}${newNumber}`;
    return;
  } else if (oldNumber === null && operator === null && newNumber === "0") {
    newNumber = "-";
    display.value = `${newNumber}`;
    return;
  } else if (oldNumber === null && operator === null && newNumber != "0") {
    oldNumber = Number(newNumber);
    newNumber = "0";
    operator = pressedOperator;
    display.value = `${oldNumber}${operator}`;
  } else if (oldNumber !== null && operator === null && newNumber == "0") {
    newNumber = "0";
    operator = pressedOperator;
    display.value = `${oldNumber}${operator}`;
  } else if (oldNumber !== null && operator !== null && newNumber != "0") {
    equalPressed();
    newNumber = "0";
    operator = pressedOperator;
    display.value = `${oldNumber}${operator}`;
  }
};

minus.addEventListener("click", minusPressed);
