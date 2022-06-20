// Creating red shaky button when incorrectly clicked

const currentCalc = document.querySelector(".currentCalc");
const historyCalc = document.querySelector(".historyCalc");
let currentNumber = [];
operations = ["+", "-", "×", "÷"];
let keysPressed = {};
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

function incorrectButton(button) {
  document.querySelector(button).style.backgroundColor = "#ef4444";
}

function replaceOperations(replacementValue) {
  mutliplierRemover = replacementValue.replace(/×/g, "*");
  replacedCalc = mutliplierRemover.replace(/÷/g, "/");
  return replacedCalc;
}

function appendNumber(number) {
  if (currentCalc.innerHTML == "0" || equalSignPressed == true) {
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
  if (
    isNaN(currentCalc.innerHTML.charAt(currentCalc.innerHTML.length - 1)) &&
    currentCalc.innerHTML.charAt(currentCalc.innerHTML.length - 1) != negative
  ) {
    currentCalc.innerHTML += negative;
  }
}

function squareRoot() {
  historyCalc.innerHTML = currentCalc.innerHTML;
  currentCalc.innerHTML = Math.sqrt(
    math.evaluate(replaceOperations(currentCalc.innerHTML))
  );
  equalSignPressed = false;
}

function appendDecimal() {
  if (!currentNumber.includes(".")) {
    currentCalc.innerHTML += ".";
    currentNumber.push(".");
    equalSignPressed = false;
  }
  else {
    incorrectButton('#decimal')
  }
}

function previousAnswer() {
  if (
    isNaN(currentCalc.innerHTML.charAt(currentCalc.innerHTML.length - 1)) &&
    historyCalc.innerHTML != "History"
  ) {
    currentCalc.innerHTML += math.evaluate(historyCalc.innerHTML);
  }
  equalSignPressed = false;
}

function solve() {
  try {
    historyCalc.innerHTML = currentCalc.innerHTML;
    currentCalc.innerHTML = math.evaluate(
      replaceOperations(currentCalc.innerHTML)
    );
    equalSignPressed = true;
  } catch (err) {
    console.log("Error");
  }
}
