const bodyTag = document.querySelector("body");
const themes = document.querySelectorAll("[data-themes]");
for (const theme of themes) {
  theme.addEventListener("change", (event) => {
    let newTheme = theme.dataset.themes;
    bodyTag.setAttribute("class", "d-flex");
    bodyTag.classList.add(`${newTheme}`);
  });
}

const previousDisplay = document.querySelector("[data-previousDisplay]");
const currentDisplay = document.querySelector("[data-currentDisplay]");

const operands = document.querySelectorAll("[data-number]");
const operatorsBtns = document.querySelectorAll("[data-operator]");

const backSpace = document.querySelector("[data-delete]");
const reset = document.querySelector("[data-reset]");
const equals = document.querySelector("[data-equals]");

let screenOutPut = {
  current: "",
  previous: "",
  operator: undefined,
};

function updateScreen() {
  if (screenOutPut.operator)
    previousDisplay.innerText = `${screenOutPut.previous} ${screenOutPut.operator}`;
  else previousDisplay.innerText = "";
  currentDisplay.innerText = screenOutPut.current;
}

for (const operand of operands) {
  operand.addEventListener("click", (event) => {
    event.preventDefault();
    if (operand.dataset.number === "." && screenOutPut.current.includes("."))
      return;
    else if (operand.dataset.number === "." && screenOutPut.current === "")
      screenOutPut = {
        ...screenOutPut,
        current: "0",
      };
    const value = operand.dataset.number;
    screenOutPut = {
      ...screenOutPut,
      current: `${screenOutPut.current}${value}`,
    };
    updateScreen();
  });
}

backSpace.addEventListener("click", deleteNumber);
function deleteNumber() {
  const operand = screenOutPut.current;
  const newOperand = operand.slice(0, -1);
  screenOutPut = {
    ...screenOutPut,
    current: newOperand,
  };
  updateScreen();
}

reset.addEventListener("click", resetCalculator);
function resetCalculator() {
  screenOutPut = {
    current: "",
    previous: "",
    operator: undefined,
  };
  updateScreen();
}

for (const operatorsBtn of operatorsBtns) {
  operatorsBtn.addEventListener("click", addOperator);

  function addOperator() {
    if (screenOutPut.operator || !screenOutPut.current) return;
    screenOutPut = {
      current: "",
      previous: screenOutPut.current,
      operator: operatorsBtn.dataset.operator,
    };
    updateScreen();
  }
}

equals.addEventListener("click", calculateInput);
function calculateInput() {
  if (!screenOutPut.current || !screenOutPut.previous || !screenOutPut.operator)
    return;
  const previousValue = +screenOutPut.previous;
  const currentValue = +screenOutPut.current;
  const operatorUsed = screenOutPut.operator;
  let result;
  switch (operatorUsed) {
    case "+":
      result = previousValue + currentValue;
      break;
    case "-":
      result = previousValue - currentValue;
      break;
    case "x":
      result = previousValue * currentValue;
      break;
    case "/":
      result = previousValue / currentValue;
      break;
  }
  screenOutPut = {
    current: result,
    previous: `${previousValue} ${operatorUsed} ${currentValue} =`,
    operator: undefined,
  };
  previousDisplay.innerText = screenOutPut.previous;
  updateScreen();
}
