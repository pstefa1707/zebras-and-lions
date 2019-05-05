var MAX_HEALTH = 80;
var ZEBRA_REPRODUCTION_RATE = 1.5;
var CELL_SIZE = 8; // 0 for every pixel


var zCount = 0;
var lCount = 0;
var cellArray = {};
var drawArray = {};
var GRID_HEIGHT;
var GRID_WIDTH;

function setup() {
  frameRate(60);
  GRID_WIDTH = windowWidth/CELL_SIZE;
  GRID_HEIGHT = windowHeight/CELL_SIZE;
  if (CELL_SIZE != 0) {
    noStroke();
    createCanvas(GRID_WIDTH*CELL_SIZE, GRID_HEIGHT*CELL_SIZE);
  } else {
    createCanvas(GRID_WIDTH, GRID_HEIGHT);
  }
  for (var x = 0; x < GRID_WIDTH; x++) {
    for (var y = 0; y < GRID_HEIGHT; y++) {
      cellArray[getCellIndex(x, y)] = new creature();
    }
  }
  textSize(24);
}

function draw() {
  background(color("green"));
  forEachCell(step);
  drawArr();
  var txt = "Lions: " + lCount + "\nZebras: " + zCount;
  push();
  stroke(0);
  fill(0);
  textAlign(LEFT, TOP);
  text(txt, 0, 0);
  textAlign(RIGHT, BOTTOM);
  text("FPS: " + round(frameRate()), GRID_WIDTH*CELL_SIZE, GRID_HEIGHT*CELL_SIZE)
  pop();
}

function getCellIndex(x, y) {
  var index = x + (y * (GRID_WIDTH));
  return index;
}

function drawSquare() {
  for (var x = 0; x < GRID_WIDTH; x++) {
    for (var y = 0; y < GRID_HEIGHT; y++) {
      if (cellArray[getCellIndex(x, y)].type != 0) {
      fill(cellArray[getCellIndex(x, y)].getColor());
      square(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE);
    }
  }
}
}
function drawPixel() {
  for (var x = 0; x < GRID_WIDTH; x++) {
    for (var y = 0; y < GRID_HEIGHT; y++) {
      if (cellArray[getCellIndex(x, y)].type != 0) {
      stroke(cellArray[getCellIndex(x, y)].getColor());
      point(x, y);
    }
  }
}
}

function drawArr() {
  switch (CELL_SIZE){
    case 0:
      drawPixel();
      break;
    default:
      drawSquare();
      break;
  }

}
function forEachCell(func) {
  for (var x = 0; x < GRID_WIDTH; x++) {
    for (var y = 0; y < GRID_HEIGHT; y++) {
      func(x, y);
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function step(x, y) {
  var index = getCellIndex(x, y);
  var thisCreature = cellArray[index];
  var thisType = thisCreature.getType();

  if (thisType == 0) return;

  var xOffset = getRandomInt(3) - 1;
  var yOffset = getRandomInt(3) - 1;

  var xAdj = x + xOffset;
  var yAdj = y + yOffset;

  if (xAdj < 0 || xAdj >= GRID_WIDTH) return;
  if (yAdj < 0 || yAdj >= GRID_HEIGHT) return;

  var adjIndex = getCellIndex(xAdj, yAdj);
  var otherCreature = cellArray[adjIndex];

  thisCreature.update();

  switch (thisType) {
    case 1:
      updateZebra(thisCreature, otherCreature);
      break;

    case 2:
      updateLion(thisCreature, otherCreature);
      break;

    default:
      break;
  }
}

function updateZebra(thisCreature, otherCreature) {
  var otherType = otherCreature.type;
  var reproduce = false;
  if (thisCreature.getHealth() >= MAX_HEALTH/ZEBRA_REPRODUCTION_RATE) {
    thisCreature.setHealth(10);
    reproduce = true;
  }

  switch (otherType) {
    case 1:
      break;
    case 2:
      break;
    case 0:
      if (reproduce) {
        zCount++;
        thisCreature.reproduce(otherCreature);
      } else {
        thisCreature.move(otherCreature);
      }
      break;
  }
}

function updateLion(thisCreature, otherCreature) {
  if (thisCreature.getHealth() <= 0) {
    lCount--;
    thisCreature.setType(0);
    return;
  }

  var otherType = otherCreature.getType();

  switch (otherType) {
    case 1:
      zCount--;
      lCount++;
      otherCreature.setType(2);
      thisCreature.heal(otherCreature.getHealth());
      break;
    case 2:
      break;
    default:
      thisCreature.move(otherCreature);
      break;
  }
}