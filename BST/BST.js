//factory for node creation
function node(data) {
  return {
    data: data,
    left: null,
    right: null,
  };
}

//factory for tree
function tree(arr) {
  let root = null;
  let sortedArr = [...arr].sort((a, b) => a - b); // remember to use spread operator to create a copy of the array first!!!!!!
  let readiedArr = sortedArr.filter(
    (value, index) => value !== sortedArr[index - 1],
  );
  root = buildTree(readiedArr);
  //private function to build tree, it should sort and remove duplicates from the array
  function buildTree(arr) {
    //a recur function for building tree
    function recursiveBuild(start, end) {
      if (start > end) return null;
      let mid = start + Math.floor((end - start) / 2);
      let root = node(arr[mid]);
      //recursively build left and right subtree of root
      root.left = recursiveBuild(start, mid - 1);
      root.right = recursiveBuild(mid + 1, end);
      return root;
    }
    return recursiveBuild(0, arr.length - 1);
  }
  //function to print
  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null || node === undefined) {
      return;
    }
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  };
  //function to see if value is included
  function includes(value) {
    let current = root;
    while (current !== null) {
      if (current.data == value) return true;
      if (current.data > value) current = current.left;
      else current = current.right;
    }
    return false;
  }
  //function to insert
  function insert(value) {
    if (includes(value)) return;
    if (root === null) return (root = node(value));
    let current = root;
    while (current !== null) {
      if (current.data > value && current.left === null) {
        return (current.left = node(value));
      } else if (current.data > value) {
        current = current.left;
      } else if (current.data < value && current.right === null) {
        return (current.right = node(value));
      } else if (current.data < value) {
        current = current.right;
      }
    }
  }
  function deleteItem(value) {
    if (!includes(value)) return;
    let target = root;
    let parent = null;
    //locate node with target value
    while (target !== null) {
      if (target.data == value) break;
      else if (target.data > value) {
        parent = target;
        target = target.left;
      } else {
        parent = target;
        target = target.right;
      }
    }
    //cases for deletion
    //case 1. no children
    if (target.left === null && target.right === null) {
      if (parent === null) {
        return (root = null);
      }
      if (parent.left === target) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    //case 2. have only left child
    if (target.left !== null && target.right === null) {
      if (parent === null) {
        return (root = target.left);
      } else if (parent.left === target) {
        parent.left = target.left;
      } else {
        parent.right = target.left;
      }
    }
    //case 3. have only right child
    if (target.right !== null && target.left === null) {
      if (parent === null) {
        return (root = target.right);
      } else if (parent.right === target) {
        parent.right = target.right;
      } else {
        parent.left = target.right;
      }
    }
    //case 4. have both children
    if (target.left !== null && target.right !== null) {
      let tempParent = target;
      let temp = target.right;
      while (temp.left !== null) {
        tempParent = temp;
        temp = temp.left;
      }
      target.data = temp.data;
      if (tempParent.left === temp) {
        tempParent.left = temp.right;
      } else {
        tempParent.right = temp.right;
      }
    }
  }
  return {
    root,
    prettyPrint,
    includes,
    insert,
    deleteItem,
  };
}
const test = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(test.prettyPrint());
