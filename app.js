class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.clear();
  }

  clear() {
    this.currentOperation = '';
    this.previousOperation = '';
    this.operand = undefined;
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperation.includes('.')) {
      return;
    }
    this.currentOperation = this.currentOperation.toString() + number.toString();
  }

  selectOperand(operand) {
    if (this.currentOperation === '') {
      return;
    }
    if (this.previousOperation !== '') {
      this.operate();
    }
    this.operand = operand;
    this.previousOperation = this.currentOperation;
    this.currentOperation = '';
  }

  operate() {
    let computationResult;
    const prevNumber = parseFloat(this.previousOperation);
    const currentNumber = parseFloat(this.currentOperation);
    if (isNaN(prevNumber) || isNaN(currentNumber)) {
      return;
    }
    switch (this.operand) {
      case '+':
        computationResult = prevNumber + currentNumber;
        break;
      case '-':
        computationResult = prevNumber - currentNumber;
        break;
      case '*':
        computationResult = prevNumber * currentNumber;
        break;
      case '÷':
        if (currentNumber == 0) {break};
        computationResult = prevNumber / currentNumber;
        break;
      default:
        return;
    }
    this.currentOperation = computationResult;
    this.operand = undefined;
    this.previousOperation = '';
  }

  updateDisplay() {
    this.currentOperationText.innerText = this.currentOperation;
    if (this.operand != null) {
      this.previousOperationText.innerText = `${this.previousOperation} ${this.operand}`;
    } else {
      this.previousOperationText.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll(".data-number");
const operandButtons = document.querySelectorAll(".data-operand");
const equalsButton = document.querySelector(".data-equals");
const deleteButton = document.querySelector(".data-delete");
const allClearButton = document.querySelector(".data-all-clear");
const previousOperationText = document.querySelector(".previous-operation");
const currentOperationText = document.querySelector(".current-operation");

const calculator = new Calculator(previousOperationText, currentOperationText);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operandButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.selectOperand(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.operate();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});