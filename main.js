
img = "";
objects = [];
status = "";
music = "";

function preload(){
  music = loadSound('alarme.mp3');
}


function setup() {
  canvas = createCanvas(510, 400);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(510, 400);
  video.hide();
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded() {
  console.log("Modelo Carregado!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 510, 400);
  if (status != "") {

    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status: Objetos detectados:";
      document.getElementById("detectedObjects").innerHTML = "Bebê encontrado";

      fill("#FF0000");
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

      if (objects[i].label != "person") {
        console.log("Bebê não encontrado");
        music.play();

      }
    }
  }

}
