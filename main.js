function computerPlay(){
    // Will return a random integer, either 1, 2, or 3
    let randInt = Math.floor(Math.random() * 3) + 1;
    if(randInt === 1)
        return "rock";
    else if(randInt === 2)
        return "paper";
    else if(randInt === 3)
        return "scissors";
    
}


function playerPlay(){
    let invalidSelection = true;
    let playerSelection;
    while(invalidSelection){
        // The player selection will always be normalized to all lower case letters
        playerSelection = (prompt("What would you like to do?: ")).toLowerCase();
        // If there is an invalid selection, the while loop continues
        if(playerSelection !== "rock" && playerSelection !== "paper" && playerSelection !== "scissors"){
            alert("Invalid entry, please try again. (Valid entries are \"Rock\", \"Paper\", or \"Scissors\".");
        }
        else{
            invalidSelection = false;
        }
    }
    return playerSelection;
}


function playRound(playerSelection, computerSelection){
    // If there is a tie, a 2 is returned
    // If the player loses, a 0 is returned
    // If the player wins, a 1 is returned
    let winVal = -1;
    if(playerSelection === computerSelection)
        winVal = 2;
    else if (playerSelection === "rock" && computerSelection === "paper")
        winVal = 0;
    else if (playerSelection === "rock" && computerSelection === "scissors")
        winVal = 1;
    else if (playerSelection === "paper" && computerSelection === "scissors")
        winVal = 0;
    else if (playerSelection === "paper" && computerSelection === "rock")
        winVal = 1;
    else if (playerSelection === "scissors" && computerSelection === "paper")
        winVal = 1;
    else if (playerSelection === "scissors" && computerSelection === "rock")
        winVal = 0;

    return([winVal, playerSelection, computerSelection]);
}

function capitalizeFirstLetter(string){
    return string[0].toUpperCase() + string.substring(1);
}

function game(){
    // playerResults and compResults are used to iterate wins for the player and computer respectively
    let playerResults = 0;
    let compResults = 0;
    for(let i = 0; i < 5; i++){
        // playRound returns an array with the results (array[0]),
        // the player's selection array[1], and then the computer's selection array[2]
        let array = playRound(playerPlay(), computerPlay());

        if(array[0] === 0){
            alert("You lost! " + capitalizeFirstLetter(array[2]) + " beats " + array[1] + ".");
            compResults++;
        }
        else if(array[0] === 1){
            alert("You won! " + capitalizeFirstLetter(array[1]) + " beats " + array[2] + ".");
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
    }
    console.log("Final score: \nPlayer wins: " +
      playerResults + "\nComputer wins: " + compResults);
}

// Call the gameplay loop
game();
