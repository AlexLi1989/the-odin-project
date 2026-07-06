function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  divide: (a, b) => a / b,
  multiply: (a, b) => a * b,
};

//caesar cipher function
function caesarCipher(string, shift) {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (!isLetter(char)) {
      result += char;
    } else if (isUpperCase(char)) {
      let index = upperCaseAlphabet.indexOf(char);
      let newChar =
        upperCaseAlphabet[(index + shift) % upperCaseAlphabet.length];
      result += newChar;
    } else {
      let index = alphabets.indexOf(char);
      let newChar = alphabets[(index + shift) % alphabets.length];
      result += newChar;
    }
  }
  return result;
}
//helper function for checking uppercase
function isUpperCase(char) {
  return char === char.toUpperCase();
}
//helper function for checking non letters
function isLetter(char) {
  return char.toLowerCase() >= "a" && char <= "z";
}

function analyzeArray(arr) {
  let result = {};
  let average = arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
  let min = arr.reduce((acc, cur) => Math.min(acc, cur));
  let max = arr.reduce((acc, cur) => Math.max(acc, cur));
  let length = arr.length;
  result = {
    average,
    length,
    max,
    min,
  };
  return result;
}

export { capitalize, reverseString, calculator, caesarCipher, analyzeArray };
