//initialize the DOM elements being manipulated 
const leftBanana = document.querySelector("#left");
const centerBanana = document.querySelector("#center");
const rightBanana = document.querySelector("#right");
const resultText = document.querySelector('.resultText');
const upperContainer = document.querySelector('.upperContainer');
const scoreDom = document.querySelectorAll('.scoreUnit');
const boom = document.querySelector('.boom');
let gameOver = false;

//build the endButton, which appears on game end
const endButton = document.createElement('div');
endButton.textContent = '...Play Again?';
endButton.classList.add('endButton');
endButton.addEventListener('click', startNew);

//include event listeners for the bananas
leftBanana.addEventListener('click',function(){if (!gameOver) {playOnce('left')}});
centerBanana.addEventListener('click',function(){if (!gameOver) {playOnce('center')}});
rightBanana.addEventListener('click',function(){if (!gameOver) {playOnce('right')}});

//init some stats and data used for scoring/rendering 
let playerScore = 0;
let computerScore = 0;
const scoreUnits = [
    ['p1','p2','p3','p4','p5'],
    ['c1','c2','c3','c4','c5']
];
const choices = ['left','center','right'];

//starting text, plus arrays of result text that can be added to anytime
const resultTextStart = 'Only one will survive!';

const roundWinText = [
'Your banana has proven mightier than your foes!',
'You strike your enemy down with the power of your victorious banana!',
'Onlookers witness the destruction of your enemy, brought about by your superior banana!',
'Congratulations, your banana wins!'
];

const roundLoseText = [
'Your family watches in horror as your banana crumbles weaklessly!',
'Once again, your banana proves to be the weaker one.',
'Embarrassing! Pick a better banana next time!',
"Clearly you are not getting the hang of this.  Maybe it's time to hang the banana up?",
'Loser!',
];


function startNew(){
    //start a new game of BANANAS, scrub the scoreboard and reset some values
    scrubScore();
    boom.removeChild(endButton);
    playerScore = 0;
    computerScore = 0;
    resultText.textContent = resultTextStart;
    gameOver = false;
    resultText.classList.remove('winnerBanana');
}

function getRoundEndText(result){
    //use result to get a random text from the resultant text array
    if (result === 'human'){
        randomChoice = getRandom(roundWinText.length);
        return roundWinText[randomChoice];
    }
    else if (result === 'computer'){
        randomChoice = getRandom(roundLoseText.length);
        return roundLoseText[randomChoice];
    }
    else {
        return 'Its a tie!';
    }
}

function announceRoundEndText(result){
    //announce the text, replace the result text content with it
    if (result === 'human'){
        resultText.textContent = getRoundEndText('human');
    }
    else if(result === 'computer'){
        resultText.textContent = getRoundEndText('computer');
    }
    else if(result === 'tie'){
        resultText.textContent = 'Its a tie!';
    }
}


function getRandom(randomRange){
    //basic random helper function
    return Math.floor(Math.random()*randomRange);
}

function getComputerChoice(){
    //use random to get a random computer choice
    randomChoice = getRandom(choices.length);
    return choices[randomChoice];
}

function decideOutcome(humanChoice, computerChoice){
    //use humanChoice and computerChoice to determine winner, return string of winner
    if (humanChoice === computerChoice){
        return 'tie';
    }

    switch(humanChoice){
        case 'left':
            return computerChoice === 'center' ? 'computer' : 'human';
            break;
        case 'center':
            return computerChoice === 'right' ? 'computer' : 'human';
            break;
        case 'right':
            return computerChoice === 'left' ? 'computer' : 'human';
            break;
        default:
            return 'i have no fucking idea what happened';
            break;
    }
}

function changeScore(result){
    //use result to change the score
    if (result === 'human'){
        playerScore += 1;
    }
    else if (result === 'computer'){
        computerScore += 1;
    }
    else return;
}

function drawScore(pScore, cScore){
    //very sketchy, i don't like this but it works to update the score container
    for (i=0; i<pScore; i++){
        domNug = document.querySelector(`#${scoreUnits[0][i]}`);
        domNug.style.backgroundColor = 'red';
    }
    for (i=0; i<cScore; i++){
        domNug = document.querySelector(`#${scoreUnits[1][i]}`);
        domNug.style.backgroundColor = 'red';
    }

}

function scrubScore(){
    //wipe the scoreboard clean for a new game
    scoreDom.forEach(element => element.style.backgroundColor = 'yellow');
}

function updateUI(result){
    //update the result text and score
    announceRoundEndText(result);
    drawScore(playerScore, computerScore);
}

function checkEnd(){
    //is the game over
    if (playerScore === 5 || computerScore === 5){
        endGame();
    }
}

function whoWon(){
    //who is the winner
    return playerScore === 5 ? 'player' : 'computer';
}

function endGame(){
    //smelly, displays ending text & adds the endButton to the page, 
    //i'd like to get back in here and add some more css styling / 
    //changes dependent on the winner. 
    let winner = whoWon();
    if (winner === 'player'){
        resultText.textContent = 'You win!';
        resultText.classList.add('winnerBanana');
    }
    else if (winner === 'computer'){
        resultText.textContent = 'You lose!';
    }

    boom.appendChild(endButton);
    gameOver = true;
}

function playOnce(humanChoice){
    //smelly and coupled, but it sets the game in motion
    //once a banana has been selected
    computerChoice = getComputerChoice();
    result = decideOutcome(humanChoice, computerChoice);
    
    changeScore(result);
    updateUI(result);
    checkEnd();
    
}

