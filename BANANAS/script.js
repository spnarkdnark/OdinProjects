const leftBanana = document.querySelector("#left");
const centerBanana = document.querySelector("#center");
const rightBanana = document.querySelector("#right");
const resultText = document.querySelector('.resultText');
const upperContainer = document.querySelector('.upperContainer');

leftBanana.addEventListener('click',function(){playOnce('left')});
centerBanana.addEventListener('click',function(){playOnce('center')});
rightBanana.addEventListener('click',function(){playOnce('right')});

let playerScore = 0;

let computerScore = 0;

const scoreUnits = [
    ['p1','p2','p3','p4','p5'],
    ['c1','c2','c3','c4','c5']
];

const scoreDom = document.querySelectorAll('.scoreUnit');

const choices = ['left','center','right'];

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

const endButton = document.createElement('div');
endButton.textContent = '...Play Again?';
endButton.classList.add('endButton');
endButton.addEventListener('click', startNew);

function startNew(){
    scrubScore();
    upperContainer.removeChild(endButton);
    playerScore = 0;
    computerScore = 0;
    resultText.textContent = resultTextStart;
}

function getRoundEndText(result){
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
    return Math.floor(Math.random()*randomRange);
}

function getComputerChoice(){
    randomChoice = getRandom(choices.length);
    return choices[randomChoice];
}

function decideOutcome(humanChoice, computerChoice){

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
    if (result === 'human'){
        playerScore += 1;
    }
    else if (result === 'computer'){
        computerScore += 1;
    }
    else return;
}

function drawScore(pScore, cScore){
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
    scoreDom.forEach(element => element.style.backgroundColor = 'yellow');
}

function updateUI(result){
    announceRoundEndText(result);
    drawScore(playerScore, computerScore);
}

function checkEnd(){
    if (playerScore === 5 || computerScore === 5){
        endGame();
    }
}

function whoWon(){
    return playerScore === 5 ? 'player' : 'computer';
}

function endGame(){
    let winner = whoWon();
    if (winner === 'player'){
        resultText.textContent = 'You win!';
    }
    else if (winner === 'computer'){
        resultText.textContent = 'You lose!';
    }

    upperContainer.appendChild(endButton); 
}

function playOnce(humanChoice){
    
    computerChoice = getComputerChoice();
    result = decideOutcome(humanChoice, computerChoice);
    
    changeScore(result);
    updateUI(result);
    checkEnd();
    
}

