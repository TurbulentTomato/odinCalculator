const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".button-container");
let firstNum = 0;
let secondNum = 0;
let operator = "";
let result = 0;

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
    secondNum = Number(display.textContent);
    console.log("2nd=" + secondNum);
    return;
  }
  firstNum = Number(display.textContent);
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
  if (!secondNum) {
    return;
  }

  switch (operator) {
    case "+":
      add();
      break;
    case "-":
      subtract();
      break;
    case "×":
      multiply();
      break;
    case "÷":
      divide();
      break;
    case "EXP":
      exp();
      break;
    default:
      console.log("Something went wrong XD")
  }
  display.textContent = result;
  firstNum = result;
  secondNum = 0;
}

function add() {
  result = firstNum + secondNum;
}
function subtract() {
  result = firstNum - secondNum;
}
function multiply() {
  result = firstNum * secondNum;
}
function divide() {
  result = firstNum / secondNum;
}
function exp() {
  result = firstNum ** secondNum;
}
