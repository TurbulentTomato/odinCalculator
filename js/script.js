const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".button-container");
let decimalPresent = false;
let firstNum = 0;
let secondNum = 0;
let operator = "";
let result = 0;

buttonContainer.addEventListener("click", (event) => {
  let targetClassList = Array.from(event.target.classList);
  if (operator && !secondNum) {
    if (targetClassList.includes("equal")) {
      return; /*otherwise if you press equal 
      after entering operator and before entering secondNum 
      then it will clear the display. Does not cause any bug but
      removes the operator from display which just doesn't seem right.*/
    }
    clearDisplay();
  }
  display.textContent += event.target.textContent;
  if (targetClassList.includes("number")) {
    getNumber();
  } else if (targetClassList.includes("operator")) {
    display.textContent = event.target.textContent;
    if (secondNum) {
      operate(); //if secondNum is already present, 
      //first operate the previous numbers then get new operator
    }
    getOperator(event);
  } else if (targetClassList.includes("equal")) {
    operate();
  } else if (targetClassList.includes("ac")) {
    allClear();
  } else if (targetClassList.includes("decimal")) {
    allowDecimal();
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
  decimalPresent = false;
  console.log(operator)
}

function clearDisplay() {
  display.textContent = "";
}

function operate() {
  if (!secondNum) {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
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
  result = Math.floor(result * 100) / 100;
  display.textContent = result;
  firstNum = result;
  secondNum = 0;
  decimalPresent = false;
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

function allClear() {
  clearDisplay();
  firstNum = 0;
  secondNum = 0;
  operator = "";
  result = 0;
  decimalPresent = false;
}

function allowDecimal() {
  if (decimalPresent) {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    return;
  }
  getNumber();
  decimalPresent = true;
  return;
}
