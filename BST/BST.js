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
  //function that traverse the tree in breadth-first level order and call the callback on each value
  function levelOrderForEach(callback) {
    if (callback === undefined) {
      throw new Error("Callback must be provided");
    }
    if (root === null) return;
    let queue = [root];
    let pointer = 0; // a pointer to prevent using .shift()
    while (pointer < queue.length) {
      //dequeue the first node in the queue
      let current = queue[pointer];
      pointer++;
      //call the callback on the node's data
      callback(current.data);
      //enqueue left and/or right child of the node
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
    /* ----------------------------------------------------
    recursive version
    function recursiveBFS(q, p) {
    if (p >= q.length) return;
    let current = q[p];
    callback(current.data);
    if (current.left !== null) q.push(current.left);
    if (current.right !== null) q.push(current.right);
    recursiveBFS(q, p + 1);
  }
  recursiveBFS([root], 0);
  ---------------------------------------------------- */
  }
  //function for depth first, pre in post order traverse callback
  function preOrderForEach(callback) {
    if (callback === undefined) {
      throw new Error("Callback must be provided");
    }
    if (root === null) return;
    //recursive helper for pre order (root,left,right)
    function traverse(node) {
      if (node === null) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(root);
  }
  function inOrderForEach(callback) {
    if (callback === undefined) {
      throw new Error("Callback must be provided");
    }
    if (root === null) return;
    //recursive helper for in order (left,root,right)
    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    }
    traverse(root);
  }
  function postOrderForEach(callback) {
    if (callback === undefined) {
      throw new Error("Callback must be provided");
    }
    if (root === null) return;
    //recursive helper for post order (left,right,root)
    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    }
    traverse(root);
  }

  //recursive helper function for calculating height
  function calculateHeight(node) {
    //base case
    if (node === null) {
      return -1;
    }
    //recursive case
    return (
      1 + Math.max(calculateHeight(node.left), calculateHeight(node.right))
    );
  }
  function height(value) {
    if (value === undefined) throw new Error("Value is required");
    if (!includes(value)) return undefined;
    //find target first
    let current = root;
    while (current !== null) {
      if (current.data == value) break;
      if (current.data > value) current = current.left;
      else current = current.right;
    }
    return calculateHeight(current);
  }
  function depth(value) {
    if (value === undefined) throw new Error("Value is required");
    if (!includes(value)) return undefined;
    //find target first and record distance
    let current = root;
    let distance = 0;
    while (current !== null) {
      if (current.data == value) return distance;
      if (current.data > value) {
        current = current.left;
        distance++;
      } else {
        current = current.right;
        distance++;
      }
    }
  }
  function isBalanced(node = root) {
    //base case
    if (node === null) return true;
    //get left and right height
    let leftHeight = calculateHeight(node.left);
    let rightHeight = calculateHeight(node.right);
    //check if current node is balanced or not
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    //check if any child is balanced or not
    return isBalanced(node.left) && isBalanced(node.right);
  }
  function rebalance() {
    if (isBalanced(root) !== false) return;
    let newArray = [];
    inOrderForEach((value) => {
      newArray.push(value);
    });
    root = buildTree(newArray);
  }
  return {
    root,
    prettyPrint,
    includes,
    insert,
    deleteItem,
    levelOrderForEach,
    height,
    depth,
    isBalanced,
    rebalance,
    preOrderForEach,
    inOrderForEach,
    postOrderForEach,
  };
}

//driver script by AI
function generateRandomArray() {
  const set = new Set();
  while (set.size < 10) {
    const randomNum = Math.floor(Math.random() * 101);
    set.add(randomNum);
  }
  return [...set];
}

const randomData = generateRandomArray();
console.log("=== 1 ===");
console.log(randomData);

const bst = tree(randomData);
console.log("\n=== 2 ===");
bst.prettyPrint();

console.log("\n=== 3 ===");
console.log("Balanced:", bst.isBalanced());

console.log("\n=== 4 ===");
let levelOrderResult = [];
bst.levelOrderForEach((val) => levelOrderResult.push(val));
console.log("Level:", levelOrderResult);

let preOrderResult = [];
bst.preOrderForEach((val) => preOrderResult.push(val));
console.log("Pre:", preOrderResult);

let inOrderResult = [];
bst.inOrderForEach((val) => inOrderResult.push(val));
console.log("In:", inOrderResult);

let postOrderResult = [];
bst.postOrderForEach((val) => postOrderResult.push(val));
console.log("Post:", postOrderResult);

console.log("\n=== 5 ===");
bst.insert(150);
bst.insert(200);
bst.insert(250);
bst.insert(300);
bst.prettyPrint();

console.log("\n=== 6 ===");
console.log("Balanced:", bst.isBalanced());

console.log("\n=== 7 ===");
bst.rebalance();
bst.prettyPrint();

console.log("\n=== 8 ===");
console.log("Balanced:", bst.isBalanced());

console.log("\n=== 9 ===");
levelOrderResult = [];
bst.levelOrderForEach((val) => levelOrderResult.push(val));
console.log("Level:", levelOrderResult);

preOrderResult = [];
bst.preOrderForEach((val) => preOrderResult.push(val));
console.log("Pre:", preOrderResult);

inOrderResult = [];
bst.inOrderForEach((val) => inOrderResult.push(val));
console.log("In:", inOrderResult);

postOrderResult = [];
bst.postOrderForEach((val) => postOrderResult.push(val));
console.log("Post:", postOrderResult);
