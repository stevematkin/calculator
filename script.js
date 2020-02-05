function add(a, b) {
    //console.log(a+b);
    return parseFloat(a)+parseFloat(b);
    
}

function subtract(a, b) {
    return parseFloat(a)-parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a)*parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a)/parseFloat(b);
}

function operate(a, operator, b) {
    let result;
    if (operator === '+'){
        result = add(a,b);
    }
    else if (operator === '-') {
        result = subtract(a,b);
    }
    else if (operator === '*') {
        result = multiply(a,b);
    }
    else if (operator === '/') {
        result = divide(a,b);
    }
    return result;
}

function collapseArray(array) {
    while (array.length > 1) {
        const [firstNum, operator, secondNum, ...tempArray] = array;

        array = [operate(firstNum, operator, secondNum), ...tempArray];
    }
    return array;
}

//nums  /([0-9])/g
//operators   /([\+\-\*\/])/;

let userInput = [];
let topInput = [];
let lastEventTarget;

const buttons = document.querySelectorAll("[type = 'button']")
const display = document.querySelector('.display');
const topDisplay = document.querySelector('.topDisplay');

buttons.forEach(function(button) {
    button.addEventListener('click', handleButtonPress);
});

function handleButtonPress(event) {
    

    if (/([0-9])/g.test(event.target.value) && lastEventTarget !== '=') {
        console.log(lastEventTarget);
        display.textContent = display.textContent + event.target.value;
                        
    }
    
    if (/([0-9])/g.test(event.target.value) && lastEventTarget === '=') {
        display.textContent = '';
        display.textContent = event.target.value;
        lastEventTarget = '';
                        
    }
    
    else if (/([\+\-\*\/])/.test(event.target.value) && userInput.length <= 1) {
        userInput.push(display.textContent);
        userInput.push(event.target.value);
        //topInput.push(display.textContent);
        //topInput.push(event.target.value);
        console.log(userInput);
        //topDisplay.textContent = topInput.join('');
        display.textContent = '';           
        
    }

    else if (/([\+\-\*\/])/.test(event.target.value) && userInput.length > 1) {
        userInput.push(display.textContent);
        //topDisplay.textContent = topInput.join('');
        userInput = collapseArray(userInput);
        display.textContent = userInput;
        userInput.push(event.target.value);
        
        display.textContent = '';    
    }

    else if (event.target.value === '=') {
        userInput.push(display.textContent);
        //topInput.push(display.textContent);
        //console.log(topInput);
        console.log(userInput);
        userInput = collapseArray(userInput);
        console.log(userInput);
        //topDisplay.textContent = topInput.join('');
        display.textContent = userInput;
        userInput = [];
        lastEventTarget = '=';
        console.log(lastEventTarget);
        
        
    }

    else if (event.target.value === 'clear') {
        userInput = [];
        topInput = [];
        lastEventTarget = '';
        //console.log(userInput);
        //topDisplay.textContent = '';
        display.textContent = '';    
    }
    
}