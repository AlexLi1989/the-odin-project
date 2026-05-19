document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  // generate random color
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 255) + 1;
    const b = Math.floor(Math.random() * 255) + 1;
    return `rgb( ${r}, ${g}, ${b})`;
  };
  // function for box creation and running for first time
  const createNewGrid = (num) => {
    // clear container
    container.innerHTML = "";
    const size = `calc(100% / ${num})`;
    for (let i = 0; i < num * num; i++) {
      // create box element
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.width = size;
      box.style.height = size;
      // set base opacity
      box.style.opacity = 0.1;
      // set pen color to random rgb value
      box.addEventListener(
        "mouseenter",
        () => {
          box.style.backgroundColor = getRandomColor();
        },
        { once: true }, //ensure it only runs once
      );
      //  increase opacity per interaction
      box.addEventListener("mouseenter", () => {
        let currentOpacity = +box.style.opacity;
        if (currentOpacity < 1) {
          box.style.opacity = currentOpacity + 0.1;
        }
      });
      container.append(box);
    }
  };
  createNewGrid(16);

  // create button element
  const button = document.createElement("button");
  button.classList.add("button");
  document.body.prepend(button);
  button.textContent = "New Grid";
  button.addEventListener("click", () => {
    const input =
      prompt(
        "How many squares do you want for each side?",
        "Max : 100, Min : 1",
      ) ?? 16;
    let num = +input;
    // default to 16 if input is not a number
    if (isNaN(num)) {
      num = 16;
    }
    if (num > 100) {
      num = 100; // limit to 100
    } else if (num < 1) {
      num = 1; // limit to 1
    }
    createNewGrid(num);
  });
});
