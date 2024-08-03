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