// Global variables.
let grid;
let cols; 
let rows;
let totalPositions;
const w = 40;
const h = 40;
const totalMines = 10;

// HELPER FUNCTIONS

//Create matrix containing columns and rows
function createMatrix(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);	
	}
	return arr;
}

// Create a cell for each column and row.
function createGrid() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j]=new Cell(i, j, w); 
		}		
	}
}

// Creates an array with all the possible positions in the grid.
function getTotalPositions() {
totalPositions = [];
for (let i = 0; i < cols; i++) {
	for (let j = 0; j < rows; j++) {
		totalPositions.push([i, j]);			
		}		
	}
	return totalPositions;
}

// Random assign mines into a cell 
function createRandomMinesPosition() {
for (let k = 0; k < totalMines; k++) {
	let index = floor(random(totalPositions.length));
	let choice = totalPositions[index];
	let i = choice[0];
	let j = choice[1];
	totalPositions.splice(index, 1); //Deletes that coordinate so it's no longer an option;
	grid[i][j].mine = true;
	}
}

// Returns the number of adjacent cells.
function getAdjacentCells () { 
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].countMines(); 
		}		
	}
}

//If press the mouse in a cell shows the content of the cell.
function mousePressed() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				if(mouseButton === LEFT) {
					if (!grid[i][j].flagged) {
						grid[i][j].reveal();
					}

					if (grid[i][j].mine) {
						gameOver();
					}
				}
				if(mouseButton === RIGHT) {
					grid[i][j].flag();
				}
			}
		}		
	}
}

//Create the game
function init () {
	createCanvas(401,401);

	cols = floor(width / w); //Calculates the number of columns.
	rows = floor(height / w); //Calculates the number of rows.
	grid = createMatrix(cols,rows);

	createGrid();
	getTotalPositions();
	createRandomMinesPosition();
	getAdjacentCells();
}

//Ends the game if you click a mine.
function gameOver() {
	// Returns the number of adjacent cells.
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].revealed = true; 
		}		
	}
}

//Creates the button and calls a function inside to restart the game
function restartGame () {
  const button = createButton('Restart Game');
  button.mousePressed(init);
}

//Setting up the board.
function setup() {
	restartGame();
	init();
}

function draw() {
	background(255);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].show();
		}		
	}
}

