var game = [
    [1, 2, 1],
    [3, 1, 1],
    [3, 2, 2]
]

var tileSize = 30;
var gameSize = 3;

function setup() {
    createCanvas(640, 480);
    textSize(28)
}
  
function draw() {
    background('white');
    game.forEach(function(row, rowIndex) {
        row.forEach(function(col, colIndex) {
            text(col, colIndex * tileSize, (rowIndex + 1) * tileSize)
        })
    });
}

function mouseClicked() {
    var x = floor(mouseX / tileSize), y = floor(mouseY / tileSize);
    var poppedElements = popGameElement(y, x);
}

function gameValue(row, col) {
    if (row < 0 || col < 0 || row >= gameSize || col >= gameSize) {
        return '';
    } else {
        return game[row][col];
    }
}

function popGameElement(row, col) {
    var poppedElements = findPoppedElements(row, col);
    if (poppedElements.length > 1) {
        poppedElements.forEach(([row, col]) => {
            game[row][col] = 0;
        });
        gravityDown();
        gravityLeft();    
    }
}

function gravityDown() {
    game[0].forEach((_, colIndex) => {
        var col = game.map(row => row[colIndex]).filter(candidate => candidate > 0);
        while (col.length < gameSize) {
            col.unshift('');
        }
        game.forEach((row) => {
            row[colIndex] = col.shift();
        });
    });
}

function gravityLeft() {
    game.forEach((row, rowIndex) => {
        var row = row.filter(candidate => candidate > 0);
        while (row.length < gameSize) {
            row.push('');
        }
        game[rowIndex] = row;
    });
}

function findPoppedElements(row, col) {
    var value = game[row][col];
    var result = [[row, col]];
    
    var checkRow = row - 1; // direction up
    while (value == gameValue(checkRow, col)) {
        result.push([checkRow, col]);
        checkRow--;
    }
    checkRow = row + 1; // direction down
    while (value == gameValue(checkRow, col)) {
        result.push([checkRow, col]);
        checkRow++;
    }

    var checkCol = col - 1; // direction left
    while (value == gameValue(row, checkCol)) {
        result.push([row, checkCol]);
        checkCol--;
    }
    var checkCol = col + 1; // direction right
    while (value == gameValue(row, checkCol)) {
        result.push([row, checkCol]);
        checkCol++;
    }

    return result;
}