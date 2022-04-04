function uiElements(){

    const container = document.querySelector(".container");

    const buttonContainer = document.createElement("div");
    const resultsContainer = document.createElement("div");
    const endGameContainer = document.createElement("div");
    endGameContainer.style.display = "none";
    endGameContainer.classList.toggle("endGame");

    const rockButton = document.createElement("button");
    rockButton.textContent = "Rock"
    rockButton.setAttribute("id", "rockSelection");
    rockButton.classList.toggle("gameButton");

    const paperButton = document.createElement("button");
    paperButton.textContent = "Paper";
    paperButton.classList.toggle("gameButton");

    const scissorsButton = document.createElement("button");
    scissorsButton.textContent = "Scissors";
    scissorsButton.classList.toggle("gameButton");

    const resultsText = document.createElement("p");
    resultsText.textContent = "Press a button to play!";
    resultsText.classList.toggle("displayResults");
    const scoreState = document.createElement("p");
    scoreState.textContent = "Current Score:"
    scoreState.classList.toggle("scoreState");
    const playerResults = document.createElement("p");
    playerResults.textContent = "Player score: 0";
    playerResults.classList.toggle("playerWinNum");
    const compResults = document.createElement("p");
    compResults.textContent = "Computer score: 0";
    compResults.classList.toggle("compWinNum");

    const playAgainText = document.createElement("p");
    playAgainText.textContent = "Would you like to play again?"
    playAgainText.setAttribute("id", "playAgainText");
    const yesButton = document.createElement("button");
    yesButton.textContent = "Yes";
    yesButton.setAttribute("id", "yesButton");
    const noButton = document.createElement("button");
    noButton.textContent = "No";
    noButton.setAttribute("id", "noButton");

    buttonContainer.appendChild(rockButton);
    buttonContainer.appendChild(paperButton);
    buttonContainer.appendChild(scissorsButton);

    resultsContainer.appendChild(resultsText);
    resultsContainer.appendChild(scoreState);
    resultsContainer.appendChild(playerResults);
    resultsContainer.appendChild(compResults);

    endGameContainer.appendChild(playAgainText);
    endGameContainer.appendChild(yesButton);
    endGameContainer.appendChild(noButton);

    container.appendChild(buttonContainer);
    container.appendChild(resultsContainer);
    container.appendChild(endGameContainer);


}


function computerPlay(){
    // Will return a random integer, either 1, 2, or 3
    let randInt = Math.floor(Math.random() * 3) + 1;
    if(randInt === 1)
        return "Rock";
    else if(randInt === 2)
        return "Paper";
    else if(randInt === 3)
        return "Scissors";
    
}


function playRound(playerSelection, computerSelection){
    // If there is a tie, a 2 is returned
    // If the player loses, a 0 is returned
    // If the player wins, a 1 is returned
    let winVal = -1;
    if(playerSelection === computerSelection)
        winVal = 2;
    else if (playerSelection === "Rock" && computerSelection === "Paper")
        winVal = 0;
    else if (playerSelection === "Rock" && computerSelection === "Scissors")
        winVal = 1;
    else if (playerSelection === "Paper" && computerSelection === "Scissors")
        winVal = 0;
    else if (playerSelection === "Paper" && computerSelection === "Rock")
        winVal = 1;
    else if (playerSelection === "Scissors" && computerSelection === "Paper")
        winVal = 1;
    else if (playerSelection === "Scissors" && computerSelection === "Rock")
        winVal = 0;


    return([winVal, playerSelection, computerSelection]);
}


function scoreDisplay([winVal, playerSelection, computerSelection], playerResults, compResults){
    const ongoingResults = document.querySelector(".displayResults");

    if(winVal === 0){
        ongoingResults.textContent = "You lost! " + computerSelection + " beats " + playerSelection + ".";
        compResults++;
    }
    else if(winVal === 1){
        ongoingResults.textContent = "You won! " + playerSelection + " beats " + computerSelection + ".";
        playerResults++;
    }
    else if (winVal === 2){
        ongoingResults.textContent = "You tied!";
        playerResults += .5;
        compResults += .5;
    }
    else{
        ongoingResults.textContent = "Error!";
    }
    

    return [playerResults, compResults];
}

function gameWin(playerScore, compScore){
    if(playerScore > compScore)
        return "Congratulations, you won!";
    else if (compScore > playerScore)
        return "The computer has defeated you.";
    else
        return "The game has ended in a draw.";
}

function endGame(playerWins, compWins, playerResults, compResults, gameEndedOnce){
    const scoreState = document.querySelector(".scoreState");
    const endGameContainer = document.querySelector(".endGame");
    const resultsDisplay = document.querySelector(".displayResults");
    const yesButton = document.querySelector("#yesButton");
    const noButton = document.querySelector("#noButton");
    if(!gameEndedOnce){
        scoreState.textContent = "Final Results: ";
        playerWins.textContent = "Player score: " + playerResults;
        compWins.textContent = "Computer score: " + compResults;
        endGameContainer.style.display = "block";
        resultsDisplay.textContent = gameWin(playerResults, compResults);
    }
    
    yesButton.addEventListener('click', function(){
        endGameContainer.style.display = "none";
        scoreState.textContent = "Current Score: ";
        resultsDisplay.textContent = "Press a button to play!";
        playerWins.textContent = "Player score: 0";
        compWins.textContent = "Computer score: 0";


        game();
        return 1;
    })
    noButton.addEventListener('click', function(){
        return 0;
    })
}

function game(){
    // playerResults and compResults are used to iterate wins for the player and computer respectively
    const playerWins = document.querySelector(".playerWinNum");
    const compWins = document.querySelector(".compWinNum");


    let playerResults = 0;
    let compResults = 0;

    let roundResult = [];
    let roundCount = 0;

    let gameEndedOnce = false;
    
    const buttons = document.querySelectorAll('button.gameButton');
    buttons.forEach((button) => {
       button.addEventListener('click', function(e){
        roundCount++;
        if(roundCount <= 5){
        // playRound returns an array with the results (roundResult[0]),
        // the player's selection roundResult[1], and then the computer's selection roundResult[2]
        roundResult = playRound(e.target.innerText, computerPlay());

        [playerResults, compResults] = scoreDisplay(roundResult, playerResults, compResults);
        playerWins.textContent = "Player score: " + playerResults;
        compWins.textContent = "Computer score: " + compResults;
        }
        if(roundCount === 5){
            if(endGame(playerWins, compWins, playerResults, compResults, gameEndedOnce)){
                playerResults = 0;
                compResults = 0;
                roundResult = [];
                roundCount = 0;

            }
            gameEndedOnce = true;

            return;
        }
        });
    });

}
uiElements();
// Call the gameplay loop
game();

function testGame(amountOfClicks){
    const clickRock = document.getElementById("rockSelection");
    for(let i = 0; i < amountOfClicks; i++){
        clickRock.click();
    }

    const playerWins = document.querySelector(".playerWinNum");
    
    return playerWins.textContent;
}
