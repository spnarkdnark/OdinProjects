
let sketchContainer = document.querySelector('.sketchContainer');
gridCount = 16;
let gridRow = document.createElement('div');
gridRow.classList.add('gridRow');

let gridUnit = document.createElement('div');
gridUnit.classList.add('gridUnit');

let eightButton = document.getElementById('eight');
let sixteenButton = document.getElementById('sixteen');
let sixtyFourButton = document.getElementById('sixtyfour');

eightButton.addEventListener('click', function(){refreshGrid(8)});
sixteenButton.addEventListener('click', function(){refreshGrid(16)});
sixtyFourButton.addEventListener('click', function(){refreshGrid(64)});

let mouseDown = false;

sketchContainer.onmousedown = function() {
    mouseDown = true;
}

sketchContainer.onmouseup = function() {
    mouseDown = false;
}

function drawGrid(gridValue){
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

function killGrid(container){
    while (container.firstElementChild){
        container.firstElementChild.remove();
    }
}

let trashIcon = document.querySelector('.trashIcon');
trashIcon.addEventListener('click', trashClick);

function trashClick(){
    killGrid(sketchContainer);
    buildGrid(gridCount);
}

function getUnitDimension(gridValue){
    return sketchContainer.offsetHeight / gridValue;
}

function styleGrid(gridValue){
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
    killGrid(sketchContainer);
    buildGrid(gridValue);
    gridCount = gridValue;
}

buildGrid(gridCount);
