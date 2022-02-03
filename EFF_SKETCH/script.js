let gridValue = 16;
let sketchContainer = document.querySelector('.sketchContainer');
let gridRow = document.createElement('div');
gridRow.classList.add('gridRow');
let gridUnit = document.createElement('div');
gridUnit.classList.add('gridUnit');

function drawGrid(){
    gridUnitHeight = sketchContainer.offsetWidth / gridValue;
    gridUnitWidth = gridUnit.height;
    gridRowWidth = sketchContainer.offsetWidth;
    gridRowHeight = gridUnit.height;
  

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

drawGrid();
