let gridValue = 8;

let sketchContainer = document.querySelector('.sketchContainer');

let gridRow = document.createElement('div');
gridRow.classList.add('gridRow');

let gridUnit = document.createElement('div');
gridUnit.classList.add('gridUnit');

function drawGrid(){

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
    this.style.backgroundColor = 'black';
    return false;
}

function addGridListeners(){
    let allUnits = document.querySelectorAll('.gridUnit');
    
    for (i = 0; i < allUnits.length; i++){
        allUnits[i].addEventListener('mouseover', changeColor);
    }
}


function buildGrid(gridValue){
    drawGrid();
    styleGrid(gridValue);
    addGridListeners();
}


buildGrid(gridValue);