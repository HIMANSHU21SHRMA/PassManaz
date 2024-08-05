// All variable section
let submitBtn = document.querySelector('#genBtn');
let showBox = document.querySelector('#showBox');
let lowercaseCheckbox = document.querySelector('#lowercase');
let numberCheckbox = document.querySelector('#number');
let symbolsCheckbox = document.querySelector('#symbols');

// Storage section
const upperCase = "ABCEDFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const num = "0123456789";
const symbols = "!@#$%^&*()_+<>?/|\\~";

// function for passWord Generator
function passGenerate() {
    let allChar = upperCase;
    if (lowercaseCheckbox.checked) allChar += lowerCase;
    if (numberCheckbox.checked) allChar += num;
    if(symbolsCheckbox.checked) allChar += symbols;
    
    // for single cat. pass
    let pass = "";
    pass += upperCase[Math.floor(Math.random()*upperCase.length)];
    if (lowercaseCheckbox.checked) pass += lowerCase[Math.floor(Math.random()*lowerCase.length)];
    if (numberCheckbox.checked) pass += num[Math.floor(Math.random()*num.length)];
    if (symbolsCheckbox.checked) pass += symbols[Math.floor(Math.random()*symbols.length)];

    while(pass.length < 12){
        pass += allChar[Math.floor(Math.random()*allChar.length)];
    }
    showBox.value = pass
    
    // for button text generate to copy
    submitBtn.innerHTML = "Copy" 

}
// for copy password
function copyPass() {
    if (showBox.value.length > 0) {
        showBox.select();
        document.execCommand('copy')
        alert('Password copied!')
    } else{
        alert('No password to copy!')
    }
}

    // for button text generate to copy
submitBtn.addEventListener('click', () => {
if (submitBtn.innerHTML === "Generate") {
    passGenerate();

}else{
    copyPass();
    submitBtn.innerHTML = "Generate"
}
})
// now its time to add and make the function for pass-storage
// storage sec
// Variables
let userName = document.querySelector('#user-name');
let webName = document.querySelector('#app-name');
let emailId = document.querySelector('#email');
let pasWrd = document.querySelector('#Pass-word');
let form = document.querySelector('form');
let SavePass = document.querySelector('#submit');
let table = document.querySelector('table tbody'); // Use tbody to append rows
let newNumber = 1; 

// Function to create and add a new table row
let makingtb = () => {
    // Get input values
    let userNameValue = userName.value;
    let webNameValue = webName.value;
    let emailIdValue = emailId.value;
    let pasWrdValue = pasWrd.value;

    // Check if any input field is empty
    if (userNameValue === "" || webNameValue === "" || emailIdValue === "" || pasWrdValue === "") {
        // Add animation class to the form
        form.classList.add("animation-from");
        // Optionally, remove the class after the animation
        setTimeout(() => {
            form.classList.remove("animation-from");
        }, 1000); // Adjust the timeout duration to match the animation duration
    } else {
        // Create new table row
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${newNumber}</td>
            <td>${webNameValue}</td>
            <td>${userNameValue}</td>
            <td>${emailIdValue}</td>
            <td>${pasWrdValue}</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td class="remover">x</td>
        `;

        // Append the new row to the table body
        table.appendChild(newRow);
        
        // Save data to local storage
        saveToLocalStorage({ id: newNumber, webName: webNameValue, userName: userNameValue, emailId: emailIdValue, pasWrd: pasWrdValue, date: new Date().toLocaleDateString() });

        // Increment the row number
        newNumber++
    }
};

// Function to clear form input values
let clearVal = () => {
    pasWrd.value = "";
    userName.value = "";
    emailId.value = "";
    webName.value = "";
    // newNumber = 1;
};

// Function to save data to local storage
let saveToLocalStorage = (entry) => {
    let storedEntries = JSON.parse(localStorage.getItem('passEntries')) || [];
    storedEntries.push(entry);
    localStorage.setItem('passEntries', JSON.stringify(storedEntries));
};

// Function to load data from local storage and populate the table
let loadFromLocalStorage = () => {
    let storedEntries = JSON.parse(localStorage.getItem('passEntries')) || [];
    storedEntries.forEach(entry => {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${entry.id}</td>
            <td>${entry.webName}</td>
            <td>${entry.userName}</td>
            <td>${entry.emailId}</td>
            <td>${entry.pasWrd}</td>
            <td>${entry.date}</td>
            <td class="remover">x</td>
        `;
        table.appendChild(newRow);
        newNumber++
    });
};

// Event listener for the submit button
SavePass.addEventListener('click', (e) => {
    e.preventDefault();
    makingtb();
    clearVal();
});

// Event delegation for the delete button
table.addEventListener('click', (e) => {
    if (e.target.classList.contains('remover')) {
        let row = e.target.parentElement;
        let id = row.firstElementChild.textContent;
        row.remove();
        removeFromLocalStorage(id);
    }
});

// Function to remove data from local storage
let removeFromLocalStorage = (id) => {
    let storedEntries = JSON.parse(localStorage.getItem('passEntries')) || [];
    storedEntries = storedEntries.filter(entry => entry.id !== parseInt(id));
    localStorage.setItem('passEntries', JSON.stringify(storedEntries));
};

// Load data from local storage when the page loads
window.addEventListener('load', () => {
    loadFromLocalStorage();
});
