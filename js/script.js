const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".button-container");
let firstNum = 0;
let secondNum = 0;
let operator = "";

buttonContainer.addEventListener("click", (event) => {
  let targetClassList = Array.from(event.target.classList);
  if (operator && !secondNum) {
    clearDisplay();
  }
  display.textContent += event.target.textContent;
  if (targetClassList.includes("number")) {
    getNumber();
  } else if (targetClassList.includes("operator")) {
    display.textContent = event.target.textContent;
    getOperator(event);
  } else if (targetClassList.includes("equal")) {
    operate();
  }
})

function getNumber() {
  if (operator) {
    secondNum = display.textContent;
    console.log("2nd=" + secondNum);
    return;
  }
  firstNum = display.textContent;
  console.log("1st=" + firstNum)
}

function getOperator(event) {
  operator = event.target.textContent;
  console.log(operator)
}

function clearDisplay() {
  display.textContent = "";
}

function operate() {
  console.log("operate");
}
