/*
Name:   Laksh Asija
Student Number:     164961211
Email:  lasija1@myseneca.ca
Section:    NAA
*/


let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.nav-links');


menu.addEventListener('click', function() {
    navbar.classList.toggle('open-menu');
    menu.classList.toggle('move');
});


window.onscroll = () => {
    navbar.classList.remove('open-menu');
    menu.classList.remove('move');
}


let hiringRadioButton = document.getElementById('hiring');
let questionRadioButton = document.getElementById('question');
let commentRadioButton = document.getElementById('comment');


var clicked = 0;


hiringRadioButton.addEventListener('click', function() {
    if (clicked == 0) {
        generatePayRateInput();
        clicked++;
    }
});

questionRadioButton.addEventListener('click', function() {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

commentRadioButton.addEventListener('click', function() {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});


function generatePayRateInput() {
    let breaka = document.createElement('br');
    breaka.id = 'ba';
    let breakb = document.createElement('br');
    breakb.id = 'bb';
    let breakc = document.createElement('br');
    breakc.id = 'bc';

    
    const node1 = document.createElement("label");
    const textNode = document.createTextNode("Expected Hourly Rate: ");
    node1.appendChild(textNode);
    node1.id = 'hiring-rate-label';

    
    const node2 = document.createElement("input");
    node2.id = 'hiring-rate-input';
    node2.type = 'number';
    node2.step = '0.1';
    node2.placeholder = 'Hourly Pay';
    node2.classList.add('format')

    document.querySelector(".radio-btns").appendChild(breaka);
    document.querySelector(".radio-btns").appendChild(breakb);
    document.querySelector(".radio-btns").appendChild(node1);
    document.querySelector(".radio-btns").appendChild(breakc);
    document.querySelector(".radio-btns").appendChild(node2);
}


function deletePayRateInput() {
    let label = document.getElementById('hiring-rate-label');
    let input = document.getElementById('hiring-rate-input');
    let div = document.querySelector(".radio-btns");
    let ba = document.getElementById('ba');
    let bb = document.getElementById('bb');
    let bc = document.getElementById('bc');

    div.removeChild(ba);
    div.removeChild(bb);
    div.removeChild(bc);
    div.removeChild(input);
    div.removeChild(label);
}


let messages = [];
const form = document.getElementById('contact-form');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    messages = [];

    
    validateName();
    validateEmail();
    validateAddress();
    validateCity();
    validatePostalCode();
    validateMessage();

   
    if (clicked > 0) {
        payRateValidation();
    }


    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerHTML = `
        <h3>Incorrect Inputs Provided:</h3>
        <pre>${messages.join('\r\n')}</pre>
        `;
    }
})

form.addEventListener('reset', (e) => {
    messages = [];
    errorElement.innerHTML = '';
})


function validateName() {
    const inputName = document.getElementById('name');
    if(nullChecker(inputName, 'Name')) {
        areAlphabets(inputName, '- Name should be valid - All characters should be alphabetical');
    }
}


function validateEmail() {
    const email = document.getElementById('email');
    if (nullChecker(email, 'Email')) {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!(email.value.match(validRegex))) {
            messages.push("- Email Address is Invalid");
        }
    }    
}


function validateAddress() {
    const address = document.getElementById('address');
    if (nullChecker(address, 'Address')) {
        if (address.value.length < 10) {
            messages.push("- Address should be atleast 10 characters long");
        }
    }
}


function validateCity() {
    const city = document.getElementById('city');
    if(nullChecker(city, 'City')) {
        areAlphabets(city, '- City should be valid - All characters should be alphabetical');
    }
}


function validatePostalCode() {
    let postalCode = document.getElementById('pCode');
    let validRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!(postalCode.value.match(validRegex))) {
        messages.push("- Invalid Postal Code");
    }
}


function validateMessage() {
    const message = document.getElementById('message');
    if (nullChecker(message, 'Message')) {
        if (address.value.length < 10) {
            messages.push("- Message should be atleast 5 characters long");
        }
    }
}


function payRateValidation() {
    let payRateInput = document.getElementById('hiring-rate-input');
    if (payRateInput.value <= 0) {
        messages.push("- Enter an appropriate expected hourly pay rate")
    }
}


function nullChecker(element, elementName) {
    result = true;
    if (element.value === '' || element.value == null) {
        messages.push(`- ${elementName} is required`);
        result = false;
    }

    return result;
}


function areAlphabets(element, message) {
    let validRegex = /^[A-Za-z\s]+$/;
    if (!(element.value.match(validRegex))) {
        messages.push(message);
    }
}