var mom = document.getElementById('mothergrid');
var palette = document.getElementsByClassName('select');
var color = "white";
var porthole = document.getElementById('porthole')

var assign = function(event) {
  event.target.style.backgroundColor =  color;
  document.addEventListener("mousemove", paint);
  document.addEventListener("mouseup", paintOff)
  event.target.removeEventListener('mousedown', assign);
  event.target.addEventListener('mousedown', undo);
}

var undo = function(event) {
  event.target.style.backgroundColor = 'white';
  event.target.removeEventListener('mousedown', undo);
  event.target.addEventListener('mousedown', assign);
}

var paint = function(event) {
  if(event.target.className === "grid") {
    event.target.style.backgroundColor = color;
    event.target.removeEventListener('mousedown', assign);
    event.target.addEventListener('mousedown', undo);
  }
}

var paintOff = function () {
  document.removeEventListener("mousemove", paint);
  document.removeEventListener("mouseup", paintOff);
}

var clrselect = function(event) {
  color = event.target.id;
  porthole.style.backgroundColor = event.target.id;
}

var populate = function (num) {
  for (var i = 0; i < num; i++){
    div = document.createElement('div');
    div.className = "grid";
    div.addEventListener('mousedown', assign)
    mom.appendChild(div);
  }
  for (var i = 0; i < palette.length; i++) {
    palette[i].addEventListener('click', clrselect);
  }
}

populate(100);
