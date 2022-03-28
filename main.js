function computerPlay(){
    // Will return a random integer, either 1, 2, or 3
    let randInt = Math.floor(Math.random() * 3) + 1;
    if(randInt === 1){
        console.log("computer: Rock");
        return "rock";
    }
    else if(randInt === 2){
        console.log("computer: Paper");
        return "paper";
    }
    else if(randInt === 3){
        console.log("computer: Scissors");
        return "scissors";
    }
}


function playerPlay(){
    console.log("playerPlay called");
    let invalidSelection = true;
    let playerSelection;
    while(invalidSelection){
        playerSelection = (prompt("What would you like to do?: ")).toLowerCase();
        if(playerSelection !== "rock" && playerSelection !== "paper" && playerSelection !== "scissors"){
            alert("Invalid entry, please try again. (Valid entries are \"Rock\", \"Paper\", or \"Scissors\".");
            console.log("Player selection: " + playerSelection);
        }
        else{
            invalidSelection = false;
        }
    }
    return playerSelection;
}


function playRound(playerSelection, computerSelection){
    if(playerSelection === computerSelection){
        alert("You have tied! Try again.");
        playRound(playerPlay(), computerPlay());
    }
    else if (playerSelection === "rock" && computerSelection === "paper"){
        alert("You have lost! Paper beats rock.");
    }
    else if (playerSelection === "rock" && computerSelection === "scissors"){
        alert("You have won! Rock beats scissors.");
    }
    else if (playerSelection === "paper" && computerSelection === "scissors"){
        alert("You have lost! Scissors beats paper.");
    }
    else if (playerSelection === "paper" && computerSelection === "rock"){
        alert("You have won! Paper beats rock.");
    }
    else if (playerSelection === "scissors" && computerSelection === "paper"){
        alert("You have won! Scissors beats paper.");
    }
    else if (playerSelection === "scissors" && computerSelection === "rock"){
        alert("You have lost! Rock beats scissors.");
    }
}

playRound(playerPlay(), computerPlay());
