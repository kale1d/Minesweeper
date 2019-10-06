//Properties of the Cell
function Cell(x,y,w) {
  this.x = x;
  this.y = y;
  this.w = w;
  if(random(1) < 0.5) {
    this.mine = true;
  } else {
    this.mine = false;
  }
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
    }
  }
}

// Function which shows the cell information
Cell.prototype.contains = function (x, y) {
  // if the mouse is between the start of the cell or the end of the cell
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function () {
  this.revealed = true;
}