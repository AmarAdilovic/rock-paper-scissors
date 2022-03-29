function computerPlay(){
    // Will return a random integer, either 1, 2, or 3
    let randInt = Math.floor(Math.random() * 3) + 1;
    if(randInt === 1){
        return "rock";
    }
    else if(randInt === 2){
        return "paper";
    }
    else if(randInt === 3){
        return "scissors";
    }
}


function playerPlay(){
    let invalidSelection = true;
    let playerSelection;
    while(invalidSelection){
        playerSelection = (prompt("What would you like to do?: ")).toLowerCase();
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
    if(playerSelection === computerSelection){
        return([2, playerSelection, computerSelection]);
    }
    else if (playerSelection === "rock" && computerSelection === "paper"){
        return([0, playerSelection, computerSelection]);
    }
    else if (playerSelection === "rock" && computerSelection === "scissors"){
        return([1, playerSelection, computerSelection]);
    }
    else if (playerSelection === "paper" && computerSelection === "scissors"){
        return([0, playerSelection, computerSelection]);
    }
    else if (playerSelection === "paper" && computerSelection === "rock"){
        return([1, playerSelection, computerSelection]);
    }
    else if (playerSelection === "scissors" && computerSelection === "paper"){
        return([1, playerSelection, computerSelection]);
    }
    else if (playerSelection === "scissors" && computerSelection === "rock"){
        return([0, playerSelection, computerSelection]);
    }
}


function game(){
    let playerResults = 0;
    let compResults = 0;
    for(let i = 0; i < 5; i++){
        let array = playRound(playerPlay(), computerPlay());
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
    }
    console.log("Final score: \nPlayer wins: " +
      playerResults + "\nComputer wins: " + compResults);
}

game();
