// Creating red shaky button when incorrectly clicked

const currentCalc = document.querySelector(".currentCalc");
const historyCalc = document.querySelector(".historyCalc");
let currentNumber = [];
operations = ["+", "-", "×", "÷"];
let keysPressed = {};
let lastKeyPressed = [];
let equalSignPressed;

document.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keysPressed[event.key] = false;
});

window.addEventListener("keydown", (event) => {
  if (!isNaN(event.key)) {
    appendNumber(event.key);
  } else if (event.key == "+" || event.key == "-") {
    appendOperation(event.key);
  } else if (event.key == "*") {
    appendOperation("×");
  } else if (event.key == "/") {
    appendOperation("÷");
  } else if (event.key == "√") {
    squareRoot();
  } else if (event.key == ".") {
    appendDecimal();
  } else if (event.key == "Enter") {
    solve();
  } else if (keysPressed["Shift"] == true && keysPressed["Backspace"]) {
    currentCalc.innerHTML = "0";
  } else if (event.key == "Backspace") {
    currentCalc.innerHTML = currentCalc.innerHTML.slice(0, -1);
  }
});

function replaceOperations(replacementValue) {
  mutliplierRemover = replacementValue.replace(/×/g, "*");
  replacedCalc = mutliplierRemover.replace(/÷/g, "/");
  return replacedCalc;
}

function appendNumber(number) {
  if (currentCalc.innerHTML == "0" || equalSignPressed == true || currentCalc.innerHTML == 'Error') {
    currentCalc.innerHTML = "";
    equalSignPressed = false;
    console.log("cleared");
  }
  currentCalc.innerHTML += number;
  currentNumber.push(number);
}

function appendOperation(operation) {
  if (
    !isNaN(currentCalc.innerHTML.charAt(currentCalc.innerHTML.length - 1)) ||
    currentCalc.innerHTML.charAt(currentCalc.innerHTML.length - 1) == "s"
  ) {
    currentCalc.innerHTML += operation;
    equalSignPressed = false;
    currentNumber = [];
  } else {
    currentCalc.innerHTML = currentCalc.innerHTML.slice(0, -1) + operation;
  }
}

function clearCC() {
  historyCalc.innerHTML = "History";
  currentCalc.innerHTML = "0";
  currentNumber = [];
  equalSignPressed = false;
}

function appendNegative(negative) {
  lastKeyPressed.push(negative);
  if (
    isNaN(currentCalc.innerHTML.charAt(currentCalc.innerHTML.length - 1)) &&
    currentCalc.innerHTML.charAt(currentCalc.innerHTML.length - 1) != negative
  ) {
    currentCalc.innerHTML += negative;
  }
}

function squareRoot() {
  try {
    lastKeyPressed.push("√");
    equalSignPressed = false;
    historyCalc.innerHTML = currentCalc.innerHTML;
    currentCalc.innerHTML = Math.sqrt(
      math.evaluate(replaceOperations(currentCalc.innerHTML))
    );
  } catch (err) {
    currentCalc.innerHTML = "Error";
  }
}

function appendDecimal() {
  lastKeyPressed.push(".");
  if (!currentNumber.includes(".")) {
    currentCalc.innerHTML += ".";
    currentNumber.push(".");
    equalSignPressed = false;
  }
}

function previousAnswer() {
  lastKeyPressed.push("Ans");
  if (
    isNaN(currentCalc.innerHTML.charAt(currentCalc.innerHTML.length - 1)) &&
    historyCalc.innerHTML != "History"
  ) {
    currentCalc.innerHTML += math.evaluate(historyCalc.innerHTML);
    equalSignPressed = false;
  }
}

function solve() {
  try {
    historyCalc.innerHTML = currentCalc.innerHTML;
    currentCalc.innerHTML = math.evaluate(
      replaceOperations(currentCalc.innerHTML)
    );
    equalSignPressed = true;
  } catch (err) {
    currentCalc.innerHTML = "Error";
  }
  lastKeyPressed.push("=");
}
