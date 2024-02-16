const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const delBtn = document.querySelector("#del");
const pointBtn = document.querySelector("#point");
const sqrtBtn = document.querySelector("#square-root");
const sqrdBtn = document.querySelector("#square");
const oneOverBtn = document.querySelector("#one-over");
const equalBtn = document.querySelector("#equal");
const negativeSign = document.querySelector("#negative");
const lastDisplay = document.querySelector(".last-display");
const display = document.querySelector(".display");

let firstNum = "";
let secondNum = "";
let currentOperator = null;
let shouldReset = false;
let shouldClear = false;

equalBtn.addEventListener("click", () => evaluate());
clearBtn.addEventListener("click", () => clear());
pointBtn.addEventListener("click", () => appendPoint());
delBtn.addEventListener("click", () => del());
negativeSign.addEventListener("click", () => appendNegative());

numbers.forEach((number) => {
  number.addEventListener("click", () => appendNumber(number.textContent));
});

operators.forEach((operator) =>
  operator.addEventListener("click", () => setOperation(operator.textContent))
);

sqrdBtn.addEventListener("click", () => square(display.textContent));
sqrtBtn.addEventListener("click", () => sqrt(display.textContent));
oneOverBtn.addEventListener("click", () => oneOver(display.textContent));

//when I click 9 and then x2 it display should be 81;
function appendNumber(number) {
  if (display.textContent === "0" || shouldReset) reset();
  if (shouldClear) clear();
  display.textContent += number;
  shouldReset = false;
}

function reset() {
  display.textContent = "";
}

function clear() {
  display.textContent = "";
  lastDisplay.textContent = "";
  firstNum = "";
  secondNum = "";
  currentOperator = null;
  shouldClear = false;
}

function appendPoint() {
  if (shouldClear) return;
  shouldReset = false;
  if (display.textContent === "") display.textContent = "0";
  if (display.textContent.includes(".")) return;
  display.textContent += ".";
}
function appendNegative() {
  if (shouldClear) return;
  shouldReset = false;
  if (display.textContent === "") display.textContent = "";
  if (display.textContent.includes("-")) {
    display.textContent = display.textContent.toString().slice(1);
  } else {
    display.textContent = `-${display.textContent}`;
  }
}
function del() {
  display.textContent = display.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
  if (display.textContent === "") return;
  if (currentOperator !== null) evaluate();
  firstNum = display.textContent;
  lastDisplay.textContent = `${display.textContent} ${operator}`;
  reset();
  currentOperator = operator;
}

function evaluate() {
  if (currentOperator === null || shouldReset) return;
  if (currentOperator === "÷" && display.textContent === "0") {
    display.textContent = "Math Error";
    shouldClear = true;
    return;
  }
  secondNum = display.textContent;
  display.textContent = roundResult(
    operate(currentOperator, firstNum, secondNum)
  );
  currentOperator = null;
  lastDisplay.textContent = "";
  shouldReset = true;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}
function operate(op, a, b) {
  a = Number(a);
  b = Number(b);

  switch (op) {
    case "+":
      return add(a, b);
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      return divide(a, b);
    default:
      return null;
  }
}

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
function sqrt(a) {
  display.textContent = a ** 0.5;
}
function square(a) {
  display.textContent = a ** 2;
}
function oneOver(a) {
  display.textContent = 1 / a;
}