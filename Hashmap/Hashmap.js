//snippet to throw error if accessing out-of-bounds index

// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

//factory for hash map
function hashMap(loadFactor = 0.75, capacity = 16) {
  let buckets = new Array(capacity);
  let size = 0;
  //snippet for hashing key function
  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = hashCode = (primeNumber * hashCode + key.charCodeAt(i)) | 0; //bitwise operator to prevent overflow
    }
    return Math.abs(hashCode) % capacity; //math absolute to deal with negative numbers from bitwise operation
  }
  function set(key, value) {
    let index = hash(key);
    if (buckets[index] === undefined) {
      buckets[index] = { key, value };
      size++;
      return;
    } else if (buckets[index].key === key) {
      buckets[index].value = value; //update value if key already exists
      return;
    } else {
      let current = buckets[index];
      while (current.next !== undefined) {
        current = current.next;
        if (current.key === key) {
          current.value = value;
          return;
        } //update value if key exists on current node
      }
      current.next = { key, value }; //add new node if key does not exist
      size++;
      return;
    }
  }
  function get(key) {
    let index = hash(key);
    if (buckets[index] === undefined) return null;
    let current = buckets[index];
    while (current !== undefined) {
      if (current.key === key) return current.value;
      current = current.next;
    }
    return null;
  }
  function has(key) {
    return get(key) !== null;
  }
  function remove(key) {
    if (has(key) !== true) return false;
    let index = hash(key);
    let current = buckets[index];
    if (current.key === key) {
      buckets[index] = current.next;
      size--;
      return true;
    } else {
      while (current.next !== undefined) {
        if (current.next.key === key) {
          current.next = current.next.next;
          size--;
          return true;
        }
        current = current.next;
      }
    }
  }
  function length() {
    return size;
  }
  function clear() {
    buckets = new Array(capacity);
    size = 0;
  }
}
