status="";
function setup(){
    canvas=createCanvas(290, 290);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video, 0, 0, 290, 290);
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}
function modelLoaded(){
    console.log("model loaded!");
    status=true;
}