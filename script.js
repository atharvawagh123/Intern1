let display = document.getElementById("display");
let currentInput = '0';
let previousInput = '';
let operator = '';
let operatorClicked = false;
let resultCalculated = false;

// Append number to the display
function appendNumber(number) {
    if (resultCalculated) {
        currentInput = number;
        resultCalculated = false;
    } else if (operatorClicked) {
        currentInput = number;
        operatorClicked = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

// Handle operator click and manage inputs
function appendOperator(op) {
    if (operator && !operatorClicked) {
        calculateResult();  // Perform previous calculation before applying new operator
    }

    previousInput = currentInput;  // Save the current input as previous
    operator = op;                 // Store the operator
    operatorClicked = true;         // Mark that an operator was clicked
    updateDisplay();                // Update the display immediately with operator
}

// Clear the display and reset the calculator
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    operatorClicked = false;
    resultCalculated = false;
    display.innerText = '0';
}

// Delete the last digit from the current input
function deleteLast() {
    if (currentInput.length === 1 || (currentInput.length === 2 && currentInput[0] === '-')) {
        currentInput = '0';  // If there's only one digit left, reset to '0'
    } else {
        currentInput = currentInput.slice(0, -1);  // Remove the last digit
    }
    updateDisplay();
}

// Calculate the result based on the operator and two inputs
function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    // Perform the calculation based on the operator
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '−':
            result = prev - curr;
            break;
        case '×':
            result = prev * curr;
            break;
        case '÷':
            result = curr === 0 ? 'Error' : prev / curr;  // Handle division by zero
            break;
        default:
            return;
    }

    currentInput = result.toString();   // Display result as the new current input
    operator = '';                      // Reset operator
    previousInput = '';                 // Clear previous input
    resultCalculated = true;            // Mark result as calculated
    operatorClicked = false;            // Reset operator clicked status
    updateDisplay();                    // Update display with the result
}

// Update the display based on inputs and operators
function updateDisplay() {
    if (resultCalculated) {
        display.innerText = currentInput;  // Only show the result after calculation
    } else if (operatorClicked) {
        display.innerText = `${previousInput} ${operator}`;  // Show previous input and operator when operator is clicked
    } else if (operator) {
        display.innerText = `${previousInput} ${operator} ${currentInput}`;  // Show full expression if operator and inputs are present
    } else {
        display.innerText = currentInput;  // Default to showing the current input
    }
}
