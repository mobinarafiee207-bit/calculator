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
function square() {
    if (currentOperand === 'Error') {
        clearAll();
        return;
    }
    const current = parseFloat(currentOperand);
    if (!isNaN(current)) {
        const result = current * current;

        const historyDiv = document.getElementById('history');
        if (historyDiv) {
            const newItem = document.createElement('div');
            newItem.textContent = current + '² = ' + result;
            historyDiv.appendChild(newItem);
            historyDiv.scrollTop = historyDiv.scrollHeight;
        }

        currentOperand = result.toString();
        shouldResetScreen = true;
        updateDisplay();
    }
}

function squareRoot() {
    if (currentOperand === 'Error') {
        clearAll();
        return;
    }
    const current = parseFloat(currentOperand);
    if (!isNaN(current)) {
        if (current < 0) {
            currentOperand = 'Error';
            updateDisplay();
            setTimeout(function () {
                currentOperand = '0';
                updateDisplay();
            }, 1500);
            return;
        }
        const result = Math.sqrt(current);

        const historyDiv = document.getElementById('history');
        if (historyDiv) {
            const newItem = document.createElement('div');
            newItem.textContent = '√' + current + ' = ' + result;
            historyDiv.appendChild(newItem);
            historyDiv.scrollTop = historyDiv.scrollHeight;
        }

        currentOperand = result.toString();
        shouldResetScreen = true;
        updateDisplay();
    }
}

function toggleSign() {
    if (currentOperand === 'Error') {
        clearAll();
        return;
    }
    if (currentOperand !== '0') {
        if (currentOperand.startsWith('-')) {
            currentOperand = currentOperand.slice(1);
        } else {
            currentOperand = '-' + currentOperand;
        }
        updateDisplay();
    }
}


function memoryRecall() {
    if (currentOperand === 'Error') {
        clearAll();
        return;
    }
    currentOperand = memory.toString();
    shouldResetScreen = true;
    updateDisplay();
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
    if (operation === undefined || shouldResetScreen) {
        return;
    }
    if (previousOperand === '') {
        return;
    }

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    let result = 0;

    if (operation === '+') {
        result = prev + current;
    } else if (operation === '-') {
        result = prev - current;
    } else if (operation === '×') {
        result = prev * current;
    } else if (operation === '÷') {
        if (current === 0) {
            currentOperand = 'Error';
            operation = undefined;
            previousOperand = '';
            updateDisplay();
            setTimeout(function () {
                currentOperand = '0';
                updateDisplay();
            }, 1500);
            return;
        }
        result = prev / current;
    } else if (operation === '%') {
        result = (prev * current) / 100;
    }
    const historyDiv = document.getElementById('history');
    if (historyDiv) {
        const newItem = document.createElement('div');
        newItem.textContent = prev + ' ' + operation + ' ' + current + ' = ' + result;
        historyDiv.appendChild(newItem);
        historyDiv.scrollTop = historyDiv.scrollHeight;
    }

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
