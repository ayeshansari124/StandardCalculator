//Declarations
let display = document.getElementById("display");
let firstOperand = "";
let secondOperand = "";
let operator = "";
let currInput = "";
let result = "";

//Accessing each buttons
let buttons = document.querySelectorAll(".buttons button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (!action) {
      handleNumber(value); // Handle Number input
    } else if (action === "decimal") {
      handleDecimal(value); // Handle decimal input
    } else if (action === "operator") {
      handleOperator(value); // Handle operator input
    } else if (action === "equal") {
      calculate(); // Calculate the result
    } else if (action === "clear") {
      clearAll(); // Clear the calculator
    }
  });
});

//Functions for handling different inputs
function handleNumber(value) {
  currInput += value;
  updateDisplay();
}

function handleDecimal(value) {
  if (!currInput.includes(".")) {
    currInput += value;
    updateDisplay();
  }
}

function handleOperator(op) {
  if (currInput === "" && firstOperand === "") return;

  if (firstOperand === "") {
    firstOperand = currInput;
  } else if (operator && currInput !== "") {
    secondOperand = currInput;
    result = performCalculation(firstOperand, operator, secondOperand);
    firstOperand = result.toString();
  }

  operator = op;
  currInput = "";
  updateDisplay();
}

function performCalculation(a, operator, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Error";
    default:
      return b;
  }
}

function calculate() {
  if (firstOperand !== "" && operator && currInput !== "") {
    secondOperand = currInput;
    result = performCalculation(firstOperand, operator, secondOperand);
    display.textContent = result;
    firstOperand = result.toString();
    currInput = "";
    operator = "";
  }
}

function clearAll() {
  firstOperand = "";
  secondOperand = "";
  currInput = "";
  operator = "";
  result = "";
  display.textContent = "0";
}

function updateDisplay() {
  if (currInput !== "") {
    display.textContent = currInput;
  } else if (operator !== "") {
    display.textContent = `${firstOperand} ${operator}`;
  } else {
    display.textContent = firstOperand || "0";
  }
}
