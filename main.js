function uiElements(){
    const container = document.querySelector(".container");

    const rockButton = document.createElement("button");
    rockButton.textContent = "Rock";

    const paperButton = document.createElement("button");
    paperButton.textContent = "Paper";

    const scissorsButton = document.createElement("button");
    scissorsButton.textContent = "Scissors";



    container.appendChild(rockButton);
    container.appendChild(paperButton);
    container.appendChild(scissorsButton);

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


function scoreCount(array){
    // playerResults and compResults are used to iterate wins for the player and computer respectively
    let playerResults = 0;
    let compResults = 0;

    if(array[0] === 0){
        alert("You lost! " + array[2] + " beats " + array[1] + ".");
        compResults++;
    }
    else if(array[0] === 1){
        alert("You won! " + array[1] + " beats " + array[2] + ".");
        playerResults++;
    }
    else if (array[0] === 2){
        alert("You tied!");
        playerResults += .5;
        compResults += .5;
    }
    else{
        alert("Error!");
    }
    
    console.log("Final score: \nPlayer wins: " +
      playerResults + "\nComputer wins: " + compResults);
}

function game(){

    // playRound returns an array with the results (array[0]),
    // the player's selection array[1], and then the computer's selection array[2]
    let array = [];
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
       button.addEventListener('click', function(e){
        console.log(e.target.innerText);
        array = playRound(e.target.innerText, computerPlay())
        scoreCount(array);
        });
    });
}


uiElements();
// Call the gameplay loop
game();
