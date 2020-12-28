const Calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = Calculator;
    if (waitingForSecondOperand === true) {
        Calculator.displayValue = digit;
        Calculator.waitingForSecondOperand = false;
    } else {
        Calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (Calculator.waitingForSecondOperand === true) {
        Calculator.displayValue = "0."
        Calculator.waitingForSecondOperand = false;
        return
    }
    if (!Calculator.displayValue.includes(dot)){
        Calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = Calculator
    const inputValue = parseFloat(displayValue);
    if (operator && Calculator.waitingForSecondOperand) {
        Calculator.operator = nextOperator;
        return;
    }
    if(firstOperand == null && !isNaN(inputValue)) {
        Calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        Calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        Calculator.firstOperand = result;
    } 
    Calculator.waitingForSecondOperand = true;
    Calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }
        return secondOperand;
}

function sin(){
    Calculator.displayValue = Math.sin(Calculator.displayValue);
}

function cos(){
    Calculator.displayValue = Math.cos(Calculator.displayValue);
}

function tan(){
    Calculator.displayValue = Math.tan(Calculator.displayValue);
}

function resetCalculator(){
    Calculator.displayValue = '0';
    Calculator.firstOperand = null;
    Calculator.waitingForSecondOperand = false;
    Calculator.operator = null;
}

function updateDisplay(){
    const display = document.querySelector('.Calculator-screen');
    display.value = Calculator.displayValue;
}
updateDisplay();
const keys = document.querySelector('.Calculator-keys');
keys.addEventListener('click' , event => {
    const { target } = event;
    const { value } = target;
if (!target.matches('button')){
    return;
}
switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
handleOperator(value);
break;
    case 'sin':
sin(value);
break;
    case 'cos':
tan(value);
break;
    case 'tan':
cos(value);
break;
case '.':
    inputDecimal(value);
break;
case 'all-clear' : resetCalculator();
break;
default :
if (Number.isInteger(parseFloat(value))) {
    inputDigit(value);
}
}
updateDisplay();
});