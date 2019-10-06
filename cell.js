//Properties of the Cell
function Cell(i,j,w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.adjacentCount = 0;
  this.mine = false;
  this.revealed = false;
};

//Add properties for the object Cell
Cell.prototype.show = function() {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.mine) {
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5); //creates the bomb image
    } else { 
      fill(200);
      rect(this.x, this.y, this.w, this.w);
      if (this.adjacentCount > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.adjacentCount, this.x + this.w * 0.5 , this.y + this.w - 18); //Number of adjacent bombs and place it in the center
      }
    }
  }
}

// Function which shows the cell information
Cell.prototype.contains = function (x, y) {
  // if the mouse is between the start of the cell or the end of the cell
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

// Reveals the cell content
Cell.prototype.reveal = function () {
  this.revealed = true;
  if (this.adjacentCount === 0) {
    this.cleanEmpty();
  }
}

//Clean all empty adjacent cells (no mines around).
Cell.prototype.cleanEmpty = function () {
  for (let xOffset = -1; xOffset <=1; xOffset++) {
    for (let yOffset = -1; yOffset <=1; yOffset++) {
      let i = this.i + xOffset;
      let j = this.j + yOffset;
      //Checks if the cells has or not an adjacent cell.
      if (i > -1 && i < cols && j > -1 && j < rows){
        let adjacent = grid[i][j];
        if (!adjacent.mine && !adjacent.revealed) {
          adjacent.reveal()
        }
      }
    }
  }
}
//Checks if the cell has or not mines around it
Cell.prototype.countMines = function () {
  if (this.mine) {
    this.adjacentCount = -1;
    return;
  }
  let total = 0;

  //Checks the surrounding cells 
  for (let xOffset = -1; xOffset <=1; xOffset++) {
    for (let yOffset = -1; yOffset <=1; yOffset++) {
      let i = this.i + xOffset;
      let j = this.j + yOffset;
      //Checks if the cells has or not an adjacent cell.
      if (i > -1 && i < cols && j > -1 && j < rows){
        let adjacent = grid[i][j];
        if (adjacent.mine) {
          total++;
        }
      }
    }    
  }
  this.adjacentCount = total;
}