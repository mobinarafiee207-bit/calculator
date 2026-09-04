let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

const displayElement = document.getElementById('display');

function updateDisplay() {
    if (operation) {
        displayElement.textContent = previousOperand + ' ' + operation + ' ' + currentOperand;
    } else {
        displayElement.textContent = currentOperand;
    }
}

function appendNumber(number) {
    if (shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }
    if (currentOperand === '0') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    previousOperand = currentOperand;
    operation = op;
    shouldResetScreen = true;
    currentOperand = '';
    updateDisplay();
}

function calculate() {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    let result;

    if (operation === '+') {
        result = prev + current;
    } else if (operation === '-') {
        result = prev - current;
    } else if (operation === '×') {
        result = prev * current;
    } else if (operation === '÷') {
        result = prev / current;
    }

    const expression = prev + '' + operation + '' + current;
    addToHistory(expression, result);

    currentOperand = result.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.slice(0, -1);
    if (currentOperand === '') {
        currentOperand = '0';
    }
    updateDisplay();
}


function appendDecimal() {
    if (!currentOperand.includes('.')) {
        currentOperand += '.';
    }
    updateDisplay();
}

function addToHistory(expression, result) {
    const historyDiv = document.getElementById('history');
    if (historyDiv) {
        const newItem = document.createElement('div');
        newItem.textContent = expression + ' = ' + result;
        newItem.style.cssText = `
            padding: 5px 10px;
            margin-bottom: 5px;
            background: rgba(255,255,255,0.15);
            border-radius: 8px;
            font-size: 14px;
            color: white;
            direction: ltr;
            text-align: left;
        `;
        historyDiv.appendChild(newItem);
        historyDiv.scrollTop = historyDiv.scrollHeight;
    }
}

updateDisplay();