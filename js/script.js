const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".button-container");
let firstNum = 0;
let secondNum = 0;
let operator = "";
buttonContainer.addEventListener("click", (event) => {
  display.textContent = event.target.textContent;
})
