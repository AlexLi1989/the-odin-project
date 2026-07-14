// factory for node list
function linkedList(name) {
  let headNode = null;
  function at(index) {
    let current = headNode;
    if (index == 0) return headNode || undefined;
    for (let i = 1; i <= index; i++) {
      current = current.nextNode;
      if (current === null) return undefined;
    }
    return current;
  }
  function prepend(...value) {
    let newNodes = node(...value);
    let current = newNodes;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    current.nextNode = headNode;
    headNode = newNodes;
  }
  return {
    name,
    prepend,
    at,
    append(value) {
      if (headNode === null) {
        headNode = node(value);
      } else {
        let current = headNode;
        while (current.nextNode !== null) {
          current = current.nextNode;
        }
        current.nextNode = node(value);
      }
    },
    size() {
      let total = 0;
      let current = headNode;
      while (current !== null) {
        total++;
        current = current.nextNode;
      }
      return total;
    },
    head() {
      if (headNode === null) {
        return undefined;
      } else {
        return headNode;
      }
    },
    tail() {
      if (headNode === null) return undefined;
      let current = headNode;
      while (current.nextNode !== null) {
        current = current.nextNode;
      }
      return current;
    },
    pop() {
      if (headNode === null) return undefined;
      let current = headNode;
      headNode = headNode.nextNode;
      return current.value;
    },
    contains(value) {
      let current = headNode;
      while (current != null) {
        if (current.value === value) return true;
        current = current.nextNode;
      }
      return false;
    },
    findIndex(value) {
      let current = headNode;
      let index = 0;
      while (current !== null) {
        if (current.value === value) return index;
        current = current.nextNode;
        index++;
      }
      return -1;
    },
    toString() {
      let result = "";
      let current = headNode;
      while (current != null) {
        result += `( ${current.value} ) -> `;
        if (current.nextNode === null) {
          result += "null";
          break;
        }
        current = current.nextNode;
      }
      return result;
    },
    insertAt(index, ...values) {
      if (index < 0 || at(index) == undefined) {
        throw new Error("RangeError");
      }
      if (index === 0) {
        prepend(...values);
        return;
      } else {
        let prev = at(index - 1);
        let newNodes = node(...values);
        let current = newNodes;
        while (current.nextNode != null) {
          current = current.nextNode;
        }
        current.nextNode = prev.nextNode;
        prev.nextNode = newNodes;
      }
    },
    removeAt(index) {
      if (index < 0 || at(index) == undefined) {
        throw new Error("RangeError");
      } else if (index === 0) {
        headNode = headNode.nextNode;
        return;
      } else {
        let prev = at(index - 1);
        prev.nextNode = prev.nextNode.nextNode;
      }
    },
  };
}

// factory for node
function node(...values) {
  if (values.length === 0)
    return {
      value: null,
      nextNode: null,
    };
  return {
    value: values[0],
    nextNode: values.length > 1 ? node(...values.slice(1)) : null,
  };
}
export { linkedList };
