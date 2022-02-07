
//initialize DOM variables
let gridCount = 8;
let mouseDown = false;
gridState = [];

//debugging canvas listener
//canvas.addEventListener('mousemove',function(e){getMousePosition(canvas,e)});

//initialize DOM elements
let sketchContainer = document.querySelector('.sketchContainer');
let gridRow = document.createElement('div');
let eightButton = document.getElementById('eight');
let sixteenButton = document.getElementById('sixteen');
let sixtyFourButton = document.getElementById('sixtyfour');
let trashIcon = document.querySelector('.trashIcon');

//initialize event listeners
eightButton.addEventListener('click', function(){refreshGrid(8)});
sixteenButton.addEventListener('click', function(){refreshGrid(16)});
sixtyFourButton.addEventListener('click', function(){refreshGrid(64)});
trashIcon.addEventListener('click', trashClick);

//log mouses position within canvas mostly for debugging
function getMousePosition(canvas, event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    console.log(x,y);
}

//these two help the mouseover event listeners to draw pixels onto the grid
sketchContainer.onmousedown = function() {
    mouseDown = true;
}
sketchContainer.onmouseup = function() {
    mouseDown = false;
    updateGridState();
    drawShirt(170,130,19);
}

//initialize the canvas context on top of shirt
let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
let fillColor = 'black';

function drawShirt(startX, startY, increment){
    let xPos = startX;
    let yPos = startY;

    for (i = 0; i < gridState.length; i++){
        for (p = 0; p < gridState[i].length; p++){
            if (gridState[i][p] === 1){
                ctx.fillRect(xPos, yPos, increment, increment);
            }
            else{
                continue;
            }
        }
    }
}

function eraseShirt(){
    ctx.clearRect(0,0,500,500);
}

function drawGrid(gridValue){
    //use gridValue to insert divs into DOM
    for (i = 0; i < gridValue; i++){
        tempGridRow = document.createElement('div');
        tempGridRow.id = i;
        tempGridRow.classList.add('gridRow');
        for (p = 0; p < gridValue; p++){
            tempUnit = document.createElement('div');
            tempUnit.id = p;
            tempUnit.classList.add('gridUnit');
            tempGridRow.appendChild(tempUnit);
        }
        sketchContainer.appendChild(tempGridRow);
    }
}

function getGridState(){
    //return a boolean array of the grid state to hopefully facilitate export2pdf
    gridRows = document.querySelectorAll('.gridRow');
    tempArray = [];

    for (i = 0; i < gridRows.length; i++){
        let tempRow = [];
        let children = gridRows[i].children;

        for (p = 0; p < children.length; p++){
            if (children[p].style.backgroundColor === 'black'){
                tempRow.push(1);
            }
            else{
                tempRow.push(0);
            }
        }
        tempArray.push(tempRow);
    }

    return tempArray;
}

function updateGridState(){
    gridState = getGridState();
}

function trashClick(){
    //do these two things when the trash icon is clicked
    eraseGrid(sketchContainer);
    buildGrid(gridCount);
    eraseShirt();
}

function getUnitDimension(gridValue){
    //divide the height of grid element by gridValue to get unit size
    return sketchContainer.offsetHeight / gridValue;
}

function styleGrid(gridValue){
    //add height and width to grid units
    let unitDim = getUnitDimension(gridValue);
    let unitDimConvert = unitDim.toString();
    let allUnits = document.querySelectorAll('.gridUnit');

    for (i = 0; i < allUnits.length; i++){
        allUnits[i].style.height = `${unitDimConvert}px`;
        allUnits[i].style.width = `${unitDimConvert}px`;
    }
}

function changeColor(){
    if (mouseDown){
        this.style.backgroundColor = 'black';
    }
}

function changeColorBrute(){
        this.style.backgroundColor = 'black';
}

function addGridListeners(){
    let allUnits = document.querySelectorAll('.gridUnit');
    
    for (i = 0; i < allUnits.length; i++){
        allUnits[i].addEventListener('mouseover', changeColor);
        allUnits[i].addEventListener('mousedown', changeColorBrute);
    }
}

function buildGrid(gridValue){
    drawGrid(gridValue);
    styleGrid(gridValue);
    addGridListeners();
}

function refreshGrid(gridValue){
    eraseGrid(sketchContainer);
    buildGrid(gridValue);
    gridCount = gridValue;
}

function eraseGrid(container){
    while (container.firstElementChild){
        container.firstElementChild.remove();
    }
}

buildGrid(gridCount);

