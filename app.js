var mom = document.getElementById('mothergrid');
var palette = document.getElementsByClassName('select');
var color = "white";
var porthole = document.getElementById('porthole');
var undoButton = document.getElementsByClassName('undoButton')[0];
var colorButton = document.getElementsByClassName('colorButton')[0];
var redoButton = document.getElementsByClassName('redoButton')[0];
var clearButton = document.getElementsByClassName('clearButton')[0];
var undoArr = [];
var undoTrav = 0;
var tinyArr = [];

//colors a single pixel, triggers paint and undoListen functions for mouse movement
var assign = function(event) {
  if (event.target.className === "grid") {
    // document.addEventListener("mouseover", undoListen);
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
  tinyArr = [];
  undoArr = undoArr.slice(0, undoArr.length - undoTrav);
  undoTrav = 0;
}

//keeps track of the most recent change
var undoListen = function(event) {
  if (event.target.className === "grid"){
    for (var j = 0; j < document.getElementsByClassName('grid').length; j++){
      if (document.getElementsByClassName('grid')[j].style.backgroundColor !== "white" && document.getElementsByClassName('grid')[j].style.backgroundColor !== "") {
        var newObj = {};
        newObj[document.getElementsByClassName('grid')[j].id] = document.getElementsByClassName('grid')[j].style.backgroundColor;
        console.log(newObj);
        tinyArr.push(newObj);
      }
    }
    if (undoCheck(tinyArr)){
      undoArr.push(tinyArr);
    }
  }
}
//checks arrays to make sure identical ones aren't added to the end of the undo array
var undoCheck = function (checkArr) {
  if (checkArr.length === 0 && undoArr.length === 0) {
    return true;
  }
  else if (checkArr.length !== undoArr[undoArr.length - 1].length) {
    return true;
  }
  else {
    for (var i = 0; i < checkArr.length; i++) {
      for (key in checkArr[i]) {
        if (checkArr[i][key] !== undoArr[undoArr.length - 1][i][key]) {
          return true;
        }
      }
    }
    return false;
  }
}

//reverts the most recent change
var undo = function() {
  if (undoArr.length - undoTrav > 0){
    if (undoTrav === 0){
      tinyArr = [];
      for (var j = 0; j < document.getElementsByClassName('grid').length; j++){
        if (document.getElementsByClassName('grid')[j].style.backgroundColor !== "white" && document.getElementsByClassName('grid')[j].style.backgroundColor !== "") {
          var newObj = {};
          newObj[document.getElementsByClassName('grid')[j].id] = document.getElementsByClassName('grid')[j].style.backgroundColor;
          console.log(newObj);
          tinyArr.push(newObj);
        }
      }
      if (undoCheck(tinyArr)) {
        undoArr.push(tinyArr);
        undoTrav += 1;
      }
    }
    for (var k = 0; k < document.getElementsByClassName('grid').length; k++){
      document.getElementsByClassName('grid')[k].style.backgroundColor = "white";
    }
    for (var i = 0; i < undoArr[undoArr.length - undoTrav - 1].length; i++){
      for(key in undoArr[undoArr.length - undoTrav - 1][i]) {
        document.getElementById(key).style.backgroundColor = undoArr[undoArr.length - undoTrav - 1][i][key];
      }
    }
    undoTrav += 1;
  }
}

var redo = function () {
  if (undoTrav > 1){
    for (var k = 0; k < document.getElementsByClassName('grid').length; k++){
      document.getElementsByClassName('grid')[k].style.backgroundColor = "white";
    }
    for (var i = 0; i < undoArr[undoArr.length - undoTrav + 1].length; i++){
      for(key in undoArr[undoArr.length - undoTrav + 1][i]) {
        document.getElementById(key).style.backgroundColor = undoArr[undoArr.length - undoTrav + 1][i][key];
      }
    }
    undoTrav -= 1;
  }
}

var clear = function() {
  undoClear();
  for (var j = 0; j < document.getElementsByClassName('grid').length; j++){
    if (document.getElementsByClassName('grid')[j].style.backgroundColor !== "white" && document.getElementsByClassName('grid')[j].style.backgroundColor !== "") {
      var newObj = {};
      newObj[document.getElementsByClassName('grid')[j].id] = document.getElementsByClassName('grid')[j].style.backgroundColor;
      console.log(newObj);
      tinyArr.push(newObj);
    }
  }
  if (undoCheck(tinyArr)){
    undoArr.push(tinyArr);
  }
  for (var k = 0; k < document.getElementsByClassName('grid').length; k++){
    document.getElementsByClassName('grid')[k].style.backgroundColor = "white";
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
  // document.removeEventListener('mouseover', undoListen);
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
redoButton.addEventListener('click', redo);
clearButton.addEventListener('click', clear);
populate(1800);
