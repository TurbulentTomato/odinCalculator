const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".button-container");
let decimalPresent = false;
let firstNum = null;
let secondNum = null;
let operator = "";
let result = null;
let prevOperator = null;//stores previous operator, see use in backspace()

buttonContainer.addEventListener("click", (event) => {
  let targetClassList = Array.from(event.target.classList);
  if (targetClassList.includes("ans")) {
    alert("This button is non functional");
    return;
  }
  if (operator && secondNum === null) {
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
  } else if (targetClassList.includes("del")) {
    backspace();
  }
})


function getNumber() {
  if (operator) {
    prevOperator = operator;
    if (display.textContent === "") {
      secondNum = null;
      return;
    }
    secondNum = Number(display.textContent);
    console.log("2nd=" + secondNum);
    return;
  }
  firstNum = Number(display.textContent);
  console.log("1st=" + firstNum)
}

function getOperator(event) {
  if (firstNum === null) {
    clearDisplay();
    return;
  }
  operator = event.target.textContent;
  prevOperator = null;
  decimalPresent = false;
  console.log(operator)
}

function clearDisplay() {
  display.textContent = "";
}

function operate() {
  if (secondNum === null) {
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
  secondNum = null;
  operator = "";
  prevOperator = null;
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
  firstNum = null;
  secondNum = null;
  operator = "";
  prevOperator = null;
  result = null;
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

function backspace() {
  console.log("back");
  if (operator && secondNum === null && prevOperator === null) {
    prevOperator = operator; //the value of prev operatoris now truthy so it will enter next if block if other conditions are satisfied
    operator = "";
    display.textContent = operator;
    return;
  }

  /*actually these two if blocks were conflicting. Either
    the operator wont show when using backspace
    or it will keep showing and backspace wouldnt shift to firstNum*/
  if (display.textContent === "DEL") {
    if (!operator && firstNum) {
      console.log("exr " + firstNum)
      display.textContent = firstNum;
      return
    } else if (!secondNum && operator && prevOperator) {
      prevOperator = null;
      display.textContent = operator;
      console.log("ho " + secondNum)
      return
    }
    console.log("nos")
    display.textContent = "";
    return;
  }

  display.textContent = display.textContent.slice(0, display.textContent.indexOf("D") - 1);
  getNumber();
  if (decimalPresent && display.textContent.indexOf(".") === -1) {
    decimalPresent = false;
  }
}
