// number guessing game

// Game settings
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

// Game state
let targetNumber;
let userGuesses = [];
let attempts = 0;
let gameOver = false;

//get references to HTML elements

const guessInput = document.getElementById('guessInput');

const submitButton = document.getElementById('submitButton');

const feedback = document.getElementById('feedback');

const attemptsDisplay = document.getElementById('attemptsDisplay');

const previousGuesses = document.getElementById('previousGuesses');

const gameScreen = document.getElementById('gameScreen');

const gameOverScreen = document.getElementById('gameOverScreen');

const gameOverMessage = document.getElementById('gameOverMessage');

const resetButton = document.getElementById('resetButton');

const againButton = document.getElementById('againButton');

// start game

function startGame() {

    //genrate number
    targetNumber =
        Math.floor(
            Math.random() * (MAX_NUMBER - MIN_NUMBER + 1) + MIN_NUMBER
        ) + MIN_NUMBER;

    //reset game state
    userGuesses = [];

    attempts = 0;

    gameOver = false;

    //reset UI

    attemptsDisplay.textContent = attempts;

    previousGuesses.textContent = "no guesses yet";

    feedback.textContent = "Start Guessing!";

    guessInput.value = "";

    guessInput.disabled = false;

    submitButton.disabled = false;

    // show game screen

    gameScreen.classList.remove('hidden');

    gameOverScreen.classList.add('hidden');

    // focus on input field
    guessInput.focus();

    console.log("targetNumber:", targetNumber);


}


// submit guess

function checkGuess() {

    if (gameOver) {
        return;
    }

    const inputValue = guessInput.value.trim();


    if (inputValue === "") {
        feedback.textContent = "Please enter a number.";
        return;
    }

    const guess = Number(inputValue);

    if (!Number.isFinite(guess)) {
        feedback.textContent = "Please enter a valid number.";
        return;
    }


    if (guess < MIN_NUMBER || guess > MAX_NUMBER) {

        feedback.textContent = `Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`;

        return;
    }

    if (!Number.isInteger(guess)) {

        feedback.textContent = "Please enter a whole number.";

        return;
    }


    // start guess

    userGuesses.push(guess);

    attempts++;

    attemptsDisplay.textContent = attempts;

    updatePreviousGuesses();


    // check guess

    if (guess === targetNumber) {

        feedback.textContent = "Congratulations! You guessed the number!";
        feedback.style.color = "green";

        endGame();
    } else if (guess > targetNumber) {
        feedback.textContent = "Too high! try small number";
        feedback.style.color = "red";
    } else {
        feedback.textContent = "Too low! try high number";
        feedback.style.color = "blue";
    }

    guessInput.value = "";

    guessInput.focus();

}


// update previous guesses

function updatePreviousGuesses() {

    previousGuesses.innerHTML = "";

    userGuesses.forEach(function (guess) {
        const span = document.createElement("span");

        span.textContent = guess;
        span.style.display = "inline-block";
        span.style.backgroundColor = "#667eea";
        span.style.color = "white";
        span.style.padding = "6px 10px";
        span.style.margin = "4px";
        span.style.borderRadius = "5px";

        previousGuesses.appendChild(span);

    });

}

// end game

function endGame() {

    gameOver = true;

    guessInput.disabled = true;

    submitButton.disabled = true;

    gameOverMessage.textContent =
        `You guessed ${targetNumber} correctly in ${attempts} attempt(s)!`;

    gameScreen.classList.add("hidden");

    gameOverScreen.classList.remove("hidden");
}

// reset game

function resetGame() {

    feedback.style.color = "#333";

    startGame();
}

// button event listeners

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", resetGame);
againButton.addEventListener("click", resetGame);


guessInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            checkGuess();

        }

    }
);

startGame();
