//merge sort function
function mergeSort(arr) {
  //base case, either empty arr or arr with 1 element
  if (arr.length === 0) return arr;
  if (arr.length === 1) return arr;
  //recursive function is take two elements of an array and compare them
  //for cases with more than or 2 elements,split them into half and call mergeSort again
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}
//merge helper function
function merge(arr1, arr2) {
  let result = [];
  while (arr1.length > 0 || arr2.length > 0) {
    if (arr1.length == 0) {
      result.push(arr2.shift());
    } else if (arr2.length == 0) {
      result.push(arr1.shift());
    } else if (arr1[0] == arr2[0]) {
      result.push(arr1.shift());
    } else if (arr1[0] > arr2[0]) {
      result.push(arr2.shift());
    } else if (arr1[0] < arr2[0]) {
      result.push(arr1.shift());
    }
  }
  return result;
}
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])); //should print [0, 1, 1, 2, 3, 5, 8, 13]
