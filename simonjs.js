// Arrays to store the game's sequence and the user's input sequence
let gameSeq = [];
let userSeq = [];

// Array of available button colors (note: "yello" is likely a typo for "yellow")
let colors = ["yellow", "red", "purple", "green"];

// Game state variables
let started = false;
let level = 0;

// Selecting the <h2> element to display the current level
let h2 = document.querySelector("h2");

// Start the game when any key is pressed
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;

        // Begin the first level
        levelUp();
    }
});

// Function to flash a button for the game sequence
function gameFlash(bt) {
    bt.classList.add("flash"); // Add flash effect

    setTimeout(() => {
        bt.classList.remove("flash"); // Remove flash effect after 250ms
    }, 500);
}

// Function to flash a button when the user clicks it
function userFlash(bt) {
    bt.classList.add("userflash"); // Add user flash effect

    setTimeout(() => {
        bt.classList.remove("userflash"); // Remove effect after 250ms
    }, 250);
}

// Function to go to the next level and show a new color
function levelUp() {
    userSeq = [];

    level++; // Increase level count
    h2.innerText = `Level ${level}`; // Update level display

    // Pick a random color from the array
    let randIndx = Math.floor(Math.random() * 3); // NOTE: This only picks from index 0–2, missing "green"
    let randcolor = colors[randIndx];

    // Select the button with the chosen color class
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    // Flash the button to show the game sequence
    gameFlash(randbtn);
}

function checkAns(indx){
    // console.log("currr level",level);

    // let indx = level-1;

    if(userSeq[indx] === gameSeq[indx]){
        // console.log("Same value");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerText = `Game over! your score was ${level}\n Press any key to start`
      
          document.body.classList.add("wrong");

        // Remove red background after a short delay
        setTimeout(() => {
            document.body.classList.remove("wrong");
        }, 300);


        // setTimeout(body.classList.add("body_red"),1000);
        // body.classList.remove("body_red");
        reset();
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

    // Start the game when any key is pressed
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;

        // Begin the first level
        levelUp();
    }
});


}

// Function to handle user button clicks
function btnpress() {
    let btn = this; // 'this' refers to the clicked button
    console.log(this); // Log the button element
    userFlash(btn); // Flash the button to show user interaction

    usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);

    checkAns(userSeq.length-1);
}

// Select all buttons with class "btn"
let allbtns = document.querySelectorAll(".btn");

// Add click event listeners to each button
for (btns of allbtns) {
    btns.addEventListener("click", btnpress);
}