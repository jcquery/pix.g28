var mom = document.getElementById('mothergrid');
var palette = document.getElementsByClassName('select');
var color = "white";
var porthole = document.getElementById('porthole');
var undoButton = document.getElementsByClassName('undoButton')[0];
var colorButton = document.getElementsByClassName('colorButton')[0];
undoArr = [];
undoTrav = 0;

//colors a single pixel, triggers paint and undoListen functions for mouse movement
var assign = function(event) {
  if (event.target.className === "grid") {
    document.addEventListener("mouseover", undoListen);
    event.target.style.backgroundColor =  color;
    document.addEventListener("mouseover", paint);
    document.addEventListener("mouseup", paintOff);
  };
}

//sets the chosen color via the chooser
var chooseColor = function() {
  color = colorButton.value;
  porthole.style.backgroundColor = colorButton.value;
}

//clears the most recent change
var undoClear = function() {
  undoArr = [];
}

//keeps track of the most recent change
var undoListen = function(event) {
  if (event.target.className === "grid" && event.target.style.backgroundColor !== color) {
    var newArr = []
    var newObj = {};
    newObj[event.target.id] = event.target.style.backgroundColor;
    console.log(newObj);
    newArr.push(newObj);
    undoArr.push(newArr);
  }
}

//reverts the most recent change
var undo = function() {
  for (var i = 0; i < undoArr.length; i++){
    for(key in undoArr[i]) {
      document.getElementById(key).style.backgroundColor = undoArr[i][key];
    }
  }
}

//colors pixels on mouseover
var paint = function(event) {
  if (event.target.className === "grid" && event.target.style.backgroundColor !== color) {
    event.target.style.backgroundColor = color;
    event.target.removeEventListener('mousedown', assign);
  }
}

//turns off coloring pixels with movement
var paintOff = function () {
  document.removeEventListener('mouseover', undoListen);
  document.removeEventListener("mouseover", paint);
  document.removeEventListener("mouseup", paintOff);
}

//selects the color to paint
var clrselect = function(event) {
  color = event.target.id;
  porthole.style.backgroundColor = event.target.id;
}

//builds the grid
var populate = function (num) {
  for (var i = 0; i < num; i++){
    div = document.createElement('div');
    div.className = "grid";
    div.style.backgroundColor = "white";
    div.id = (i + 1);
    mom.appendChild(div);
  }
  for (var i = 0; i < palette.length; i++) {
    palette[i].addEventListener('click', clrselect);
  }
}

mom.addEventListener('mousedown', undoClear);
document.addEventListener('mousedown', undoListen);
document.addEventListener('mousedown', assign);
undoButton.addEventListener('click', undo);
populate(1800);
