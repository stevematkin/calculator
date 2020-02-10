//Operate functions
function add(a, b) {
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
    return result.toFixed(2);
}
//collapse array down to single number when stringing operators together
function collapseArray(array) {
    while (array.length > 1) {
        const [firstNum, operator, secondNum, ...tempArray] = array;

        array = [operate(firstNum, operator, secondNum), ...tempArray];
    }
    //console.log(array);
    return array;
}

//nums  /([0-9])/g
//operators   /([\+\-\*\/])/;


//global variables
let userInput = [];
let lastEventTarget;
//let topInput = [];

const buttons = document.querySelectorAll("[type = 'button']")
const display = document.querySelector('.display');
const topDisplay = document.querySelector('.topDisplay');

//add click event listener for each button
buttons.forEach(function(button) {
    button.addEventListener('click', handleButtonPress);
});

function handleButtonPress(event) {    

    if (/([0-9])/g.test(event.target.value) && lastEventTarget !== '=') {
        display.textContent = display.textContent + event.target.value;
        lastEventTarget = event.target.value;
                        
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
        lastEventTarget = '';
                   
        
    }
    //runs when a second operator is pressed
    else if (/([\+\-\*\/])/.test(event.target.value) && userInput.length > 1) {
        
        //runs when an operator is clicked afer already clicking an operator
        //overwrites the last operator pressed       
        if (display.textContent === '') {
            userInput.pop();
            userInput.push(event.target.value);
            lastEventTarget = '';
            
        }
        //runs collapseArray when an operator is pressed after a non-operator
        else {
            userInput.push(display.textContent);
            console.log(userInput);
            //topDisplay.textContent = topInput.join('');
            userInput = collapseArray(userInput);
            console.log(userInput);
            display.textContent = userInput;
            userInput.push(event.target.value);
            lastEventTarget = '';
            display.textContent = '';
        }    
    }

    else if (event.target.value === '=') {
        
        if (/([0-9])/g.test(display.textContent)) {

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
        //alert if operator is pressed before equals sign
        else if (!/([0-9])/g.test(display.textContent)) {
            alert('Press a number, not an operator!');
        }

    }

    else if (event.target.value === '.') {
        if (display.textContent === '') {
            display.textContent = '0.';
        }
        //alert if trying to enter more than one decimal
        else if (display.textContent.includes('.')) {
            alert("Only 1 decimal please!")

        }
        else {
            display.textContent = display.textContent + event.target.value;
        }
        //console.log("decimal key");
    }
    //delete last number entered
    else if (event.target.value === 'delete') {
        let splitDisplay = display.textContent;
        //console.log("delete button");
        let tempArray = splitDisplay.split('');
        tempArray.pop();
        display.textContent = tempArray.join('');
        //console.log(display.textContent);
        
          
    }

    else if (event.target.value === 'clear') {
        userInput = [];
        topInput = [];
        lastEventTarget = '';
        //topDisplay.textContent = '';
        display.textContent = '';    
    }
    
}