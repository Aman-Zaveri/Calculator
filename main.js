var currentCalc = document.querySelector(".currentCalc");
var historyCalc = document.querySelector(".historyCalc");

window.addEventListener("keydown", (event) => {
  if (!isNaN(event.key)) {
    appendNumber(event.key);
  }
});

function replaceOperations(replacementValue) {
  mutliplierRemover = replacementValue.replace("×", "*");
  replacedCalc = mutliplierRemover.replace("÷", "/");
  return replacedCalc;
}

function clearCC() {
  historyCalc.innerHTML = "History";
  currentCalc.innerHTML = "0";
}

function appendNumber(number) {
  if (currentCalc.innerHTML == "0") {
    currentCalc.innerHTML = "";
  }
  currentCalc.innerHTML += number;
  console.log(number);
}

function appendOperation(operation) {
  if (
    !isNaN(currentCalc.innerHTML.charAt(currentCalc.innerHTML.length - 1)) ||
    currentCalc.innerHTML.charAt(currentCalc.innerHTML.length - 1) == "s"
  ) {
    
    currentCalc.innerHTML += operation;
  } else {
    currentCalc.innerHTML = currentCalc.innerHTML.slice(0, -1) + operation;
  }
}

function appendNegative(negative) {
  if(isNaN(currentCalc.innerHTML.charAt(currentCalc.innerHTML.length - 1))) {
    currentCalc.innerHTML += negative;
  }
}

function squareRoot() {
  historyCalc.innerHTML = currentCalc.innerHTML;
  currentCalc.innerHTML = Math.sqrt(math.evaluate(replaceOperations(currentCalc.innerHTML)));
}

function solve() {
  historyCalc.innerHTML = currentCalc.innerHTML;
  currentCalc.innerHTML = math.evaluate(replaceOperations(currentCalc.innerHTML));
}

