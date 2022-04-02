function uiElements(){

    const container = document.querySelector(".container");

    const buttonContainer = document.createElement("div");
    const resultsContainer = document.createElement("div");

    const rockButton = document.createElement("button");
    rockButton.textContent = "Rock"
    rockButton.setAttribute("id", "rockSelection");
    const paperButton = document.createElement("button");
    paperButton.textContent = "Paper";
    const scissorsButton = document.createElement("button");
    scissorsButton.textContent = "Scissors";

    const resultsText = document.createElement("p");
    resultsText.textContent = "Press a button to play!";
    resultsText.classList.toggle("displayResults");

    const playerResults = document.createElement("p");
    playerResults.textContent = "Player score: ";
    playerResults.classList.toggle("playerWinNum");

    const compResults = document.createElement("p");
    compResults.textContent = "Computer score: ";
    compResults.classList.toggle("compWinNum");

    buttonContainer.appendChild(rockButton);
    buttonContainer.appendChild(paperButton);
    buttonContainer.appendChild(scissorsButton);

    resultsContainer.appendChild(resultsText);
    resultsContainer.appendChild(playerResults);
    resultsContainer.appendChild(compResults);

    container.appendChild(buttonContainer);
    container.appendChild(resultsContainer);


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

function game(){
    // playerResults and compResults are used to iterate wins for the player and computer respectively
    const playerWins = document.querySelector(".playerWinNum");
    const compWins = document.querySelector(".compWinNum");
    let playerResults = 0;
    let compResults = 0;

    let roundResult = [];
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
       button.addEventListener('click', function(e){
        // playRound returns an array with the results (roundResult[0]),
        // the player's selection roundResult[1], and then the computer's selection roundResult[2]

        roundResult = playRound(e.target.innerText, computerPlay());
        [playerResults, compResults] = scoreDisplay(roundResult, playerResults, compResults);
        playerWins.textContent = "Player score: " + playerResults;
        compWins.textContent = "Computer score: " + compResults;
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
