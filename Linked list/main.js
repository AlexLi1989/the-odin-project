import { linkedList } from "./linked-list.js";
const list = linkedList("animals");

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());
console.log("List name is:", list.name);
