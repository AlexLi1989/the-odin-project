import {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} from "./testing-practice.js";

test("takes a string and returns it with the first character capitalized", () => {
  expect(capitalize("apple")).toBe("Apple");
});

test("takes a string and returns it reversed", () => {
  expect(reverseString("apple")).toBe("elppa");
});

test("calculator object's add function that adds two numbers", () => {
  expect(calculator.add(2, 3)).toBe(5);
});
test("calculator object's subtract function that subtracts  two numbers", () => {
  expect(calculator.subtract(5, 3)).toBe(2);
});
test("calculator object's divide function that divide two numbers", () => {
  expect(calculator.divide(4, 2)).toBe(2);
});
test("calculator object's multiply function that multiply two numbers", () => {
  expect(calculator.multiply(2, 8)).toBe(16);
});
test("caesarCipher function that can wrap", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});
test("caesarCipher function that has case preservation", () => {
  expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
});
test("caesarCipher function that punctuation remains unchanged", () => {
  expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});
test("takes an array of numbers and returns an object with the following properties: average, min, max, and length", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});
