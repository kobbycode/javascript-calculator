// Selecting all elements to be able to work with them
const historyDisplay = document.querySelector('.history');
const currentDisplay = document.querySelector('.current');
const allClear = document.querySelector('#ac');
const deleteButton = document.querySelector('#delete');
const equalButton = document.querySelector('#equals');
const tempDisplay = document.querySelector('.tempDisplay');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

// Defining variables for current display and history display
// Defining variables for last operation, result, null, and isThereADot
let current = '';
let history = '';
let lastOperation = '';
let result = 'null';
let isThereADot = false;

// Add event listerner to all the number buttons and also
//  check whether there is a dot already or not
numberButtons.forEach(number => {
    number.addEventListener('click', (e) => {
        if(e.target.innerText === '.' && !isThereADot) {
            isThereADot = true;
        }else if (e.target.innerText === '.' && isThereADot) {
            return;
        }
        current += e.target.innerText;
        currentDisplay.innerText = current;
    })
});

// Add event listerner to operator buttons
operatorButtons.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if(!current) return;
        isThereADot = false;
        const operation = e.target.innerText;
        if(current && history && lastOperation) {
            Calculate();
        }else {
            result = parseFloat(current)
        }
        clear(operation);
        lastOperation = operation;
        console.log(result);
    })
});

// Implement the clear property
function clear(operation = '') {
    history += current+ ' ' + operation + ' ';
    historyDisplay.innerText = history;
    currentDisplay.innerText = '';
    current = '';
    tempDisplay.innerText = result;
}

// Implemented the calculate function
function Calculate() {
    if(lastOperation === '/') {
        result = parseFloat(result) / parseFloat(current);
    }else if(lastOperation === 'x') {
        result = parseFloat(result) * parseFloat(current);
    }else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(current);
    }else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(current);
    }else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(current);
    }
}

// Activate the equals button
equalButton.addEventListener('click', (e) => {
     if(!current && !history) return;
     isThereADot = false;
     Calculate();
     clear();
     currentDisplay.innerText = result;
     tempDisplay.innerText = '';
     history = '';
     current = result;
});

// Activate the All clear button
allClear.addEventListener('click', (e) => {
    historyDisplay.innerText = '0';
    currentDisplay.innerText = '0';
    history = '';
    current = '';
    result = '';
    tempDisplay.innerText = '0';
});

// Implement delete functionality
deleteButton.addEventListener('click', (e) => {
    currentDisplay.innerText = '';
    current = '';
});

// Implement Keyboard to enter numbers and operators
window.addEventListener('keydown', (e) => {
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.' 
    ) {
        buttonClicked(e.key)
    }else if (
        e.key === '%' ||
        e.key === '/' ||
        e.key === '+' ||
        e.key === '-' 
    ) {
        operandClicked(e.key);
        // Method for the multiplication operator
    }else if (e.key === '*') {
        operandClicked('x');
    }else if (e.key == 'Enter' || e.key === '=') {
        equalsClicked()
    }
});

// Function for clicking number buttons on keyboard
function buttonClicked(key) {
    numberButtons.forEach(number => {
        if(number.innerText === key) {
            number.click();
        }
    })
};

// Function for clicking operator on keyboard
function operandClicked(key) {
    operatorButtons.forEach(operator => {
        if(operator.innerText === key) {
            operator.click();
        }
    })
};

// Function for equals using the keyboard
function equalsClicked(key) {
    equalButton.click();
}