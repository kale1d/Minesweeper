//Create matrix containing columns and rows
function createMatrix(cols, rows) {
let arr = new Array(cols);
for (let i = 0; i < arr.length; i++) {
	arr[i] = new Array(rows);	
	}
	return arr;
}

//Grid containing cells.
let grid;
let cols; 
let rows;
const w = 40;
const h = 40;

//Setting up the board.
function setup() {
	createCanvas(401,401);
	cols = floor(width / w); //Calculates the number of columns.
	rows = floor(height / w); //Calculates the number of rows.
	grid = createMatrix(cols,rows);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j]=new Cell(i * w, j * w, w); // Create a cell for each column and row.
		}		
	}
}

//If press the mouse in a cell shows the content of the cell.
function mousePressed() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				grid[i][j].reveal();
			}
		}		
	}
}

function draw() {
	background(255);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].show();
		}		
	}
}