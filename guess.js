/* 



1. Generate a random number

2. Register the number of the attempt of the player, startin by 1

3. Give the pkayer a way to guess the number

4. Once the number is submitted, register it somewhere so the player can recall the previous attemps

5. Now check if the number is correct

6. If its correct: 
    -   Show a congratulation message
    -   Make the player unable to submit another attempt
    -   Show a button that allows the player to restart the game

7. If the number is not correct but the player still have available attempts:
    -   Tell the player that the submitted number is incorrect
    -   Allow the player to try it again
    -   Add the attemps number to 1 

8. If the number is not correct and the player ran out of attempts
    -   Tell the player the Game is Over (GameOver)
    -   Make the player unable to submit another attempt
    -   Show a button that allows the player to restart the game

9. Once the game restarts, make sure the logic of the game and the interfece of the user (UI) restart completely,
turning back to step number one.



*/

//random number generator

let randomNumber = Math.floor(Math.random() * 100) + 1
console.log(randomNumber);

//saving references in each paragraph

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const LowOrHi = document.querySelector(".LowOrHi");

//saving references in input and submit button

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

//variables for tries

let guessCount = 1;
let resetButton; // variable for saving and creating reset button
guessField.focus(); //gives focus to input

//function for controlling the number to guess
function checkGuess() {
    //saves the entered number in input
    //we ensure it's a number
    let userGuess = Number(guessField.value);

    //we check if we are in the first try
    if(guessCount === 1) {
        guesses.textContent = "Previous tries ";
    }


    guesses.textContent += userGuess + " ";

    //comparison block for verifying 5-8 steps
    if(userGuess === randomNumber) {
        lastResult.textContent = "Congratulations, you guessed!!";
        lastResult.style.backgroundColor = "green";
        LowOrHi.textContent = "";
        setGameOver();
    } else if(guessCount === 10) {
        lastResult.textContent = "GAME OVER!!";
        setGameOver();
    } else {
        lastResult.textContent = "Incorrect!!";
        lastResult.style.backgroundColor = "red";
        //we check if number is bigger or smaller than the guessed one, for helping player
        
        if(userGuess < randomNumber) {
            LowOrHi.textContent = "Number is very low!";
        } else if (userGuess > randomNumber) {
            LowOrHi.textContent = "Number is very high!";
        }
    }

    //preparing variables for next guess
    //we empty value of numerical camp
    //apply focus on new input
    guessCount++;
    guessField.value = " ";
    guessField.focus();
 

}

//we add a listener to the button guessSubmit 
guessSubmit.addEventListener("click", checkGuess);

//function game over

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;

    //we create a button to reset the game
    resetButton = document.createElement("button");
    resetButton.className = ".resetButton";
    resetButton.textContent = "Start the game again";
    //we place the button in its father element body
    document.body.append(resetButton);
    //we create the listener of the button
    resetButton.addEventListener("click", resetGame);
}

    //we create the resetGame function
    function resetGame(){
        guessCount = 1;

        const resetParas = document.querySelectorAll(".resultParas p");
        for(let i = 0; i < resetParas.length; i++){
            resetParas[i].textContent = "";
        }

        resetButton.parentNode.removeChild(resetButton);

        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = "";
        guessField.focus();

        lastResult.style.backgroundColor = "black";
        randomNumber = Math.floor(Math.random() * 100) + 1;
    }








