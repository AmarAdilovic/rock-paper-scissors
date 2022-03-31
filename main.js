function uiElements(){

    const container = document.querySelector(".container");

    const buttonContainer = document.createElement("div");
    const resultsContainer = document.createElement("div");

    const rockButton = document.createElement("button");
    rockButton.textContent = "Rock"
    const paperButton = document.createElement("button");
    paperButton.textContent = "Paper";
    const scissorsButton = document.createElement("button");
    scissorsButton.textContent = "Scissors";

    const resultsText = document.createElement("p");
    resultsText.textContent = "These are the results";
    resultsText.classList.toggle("displayResults");

    container.appendChild(buttonContainer);
    container.appendChild(resultsContainer);

    buttonContainer.appendChild(rockButton);
    buttonContainer.appendChild(paperButton);
    buttonContainer.appendChild(scissorsButton);

    resultsContainer.appendChild(resultsText);

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
    // Purely for testing purposes
    console.log("Player selection: " + playerSelection);
    console.log("Computer selection: " + computerSelection);

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

    console.log("Win value: " + winVal);

    return([winVal, playerSelection, computerSelection]);
}


function scoreDisplay(array, playerResults, compResults){
    const ongoingResults = document.querySelector(".displayResults");

    if(array[0] === 0){
        ongoingResults.textContent = "You lost! " + array[2] + " beats " + array[1] + ".";
        compResults++;
    }
    else if(array[0] === 1){
        ongoingResults.textContent = "You won! " + array[1] + " beats " + array[2] + ".";
        playerResults++;
    }
    else if (array[0] === 2){
        ongoingResults.textContent = "You tied!";
        playerResults += .5;
        compResults += .5;
    }
    else{
        ongoingResults.textContent = "Error!";
    }
    
    // Purely for testing purposes
    console.log("Final score: \nPlayer wins: " +
      playerResults + "\nComputer wins: " + compResults);

    return ([playerResults, compResults]);
}

function game(){
    // playerResults and compResults are used to iterate wins for the player and computer respectively
    let results = [];
    let playerResults = 0;
    let compResults = 0;

    let array = [];
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
       button.addEventListener('click', function(e){
        // playRound returns an array with the results (array[0]),
        // the player's selection array[1], and then the computer's selection array[2]
        array = playRound(e.target.innerText, computerPlay())
        results = scoreDisplay(array, playerResults, compResults);
        playerResults = results[0];
        compResults = results[1];
        });
    });
}


uiElements();
// Call the gameplay loop
game();
