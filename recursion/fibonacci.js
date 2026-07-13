//fibonacci by iteration

const fibonacciIteration = (n) => {
  let result = [0, 1];
  let a = 0;
  let b = 1;
  for (let i = 2; i < n; i++) {
    let c = a + b;
    result.push(c);
    a = b;
    b = c;
  }
  return result;
};

console.log(fibonacciIteration(8)); // [0, 1, 1, 2, 3, 5, 8, 13]

//fibonacci by recursion
//every number is the sum of number index-1 and index-2
const fibonacciRecursion = (n) => {
  //base case
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  //for any arr with n number,it is fibonacci (n-1) and push sum of last two number
  let prev = fibonacciRecursion(n - 1);
  let sum = prev[prev.length - 1] + prev[prev.length - 2];
  return [...prev, sum];
};

console.log(fibonacciRecursion(8)); // [0, 1, 1, 2, 3, 5, 8, 13]
