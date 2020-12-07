const calculator = {displayValue: '0', firstOperand: null, waitingForSecondOperand: false, operator: null};

function updateDisplay(){
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;}

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return;

    else if (target.classList.contains('operator')) handleOperator(target.value);

    else if (target.classList.contains('decimal')) displayDecimal();

    else if (target.classList.contains('all-clear')){
        calculator.displayValue = '0'; calculator.firstOperand = null; calculator.waitingForSecondOperand = false; calculator.operator = null;}

    else displayDigit(target.value);

    updateDisplay();});

function displayDigit(digit){
    if (calculator.waitingForSecondOperand){
        calculator.displayValue = digit; 
        calculator.waitingForSecondOperand = false;
        return;}
    const {displayValue} = calculator;
    calculator.displayValue = displayValue === '0' ? digit : displayValue+digit;}

function displayDecimal(){
    const {displayValue} = calculator;
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;}
    else if (!displayValue.includes('.')) calculator.displayValue = displayValue+'.';}

function handleOperator(operator){
    const inputVal = parseFloat(calculator.displayValue);
    if (calculator.firstOperand === null && !isNaN(inputVal)) calculator.firstOperand = inputVal;

    else if (calculator.operator && calculator.waitingForSecondOperand){
        calculator.operator = operator;
        return;}

    else if (operator === "="){
        const output = handleEquals();
        calculator.displayValue = `${parseFloat(output.toFixed(7))}`;
        calculator.firstOperand = parseFloat(output.toFixed(7));
        calculator.operator = null;
        return;}

    else if (!isNaN(inputVal)){
        const output = handleEquals();
        if (output === 's'){
            calculator.waitingForSecondOperand = true;
            return;}
        calculator.displayValue = `${parseFloat(output.toFixed(7))}`; //To handle floating point errors like 0.1+0.2=0.3000000004
        calculator.firstOperand = parseFloat(output);}

    calculator.waitingForSecondOperand = true; calculator.operator = operator;}

function handleEquals(){
    const {firstOperand, operator} = calculator;
    const secondOperand = parseFloat(calculator.displayValue);
    if (operator === "+") return firstOperand + secondOperand;
    else if (operator === "-") return firstOperand - secondOperand;
    else if (operator === "*") return firstOperand*secondOperand;
    else if (operator === "/"){
        if (secondOperand === 0){
            alert("Division by 0 not allowed. Please enter another number to divide by.");
            return 's';}
        else return firstOperand/secondOperand;}
    else return secondOperand;}  //for = case
    