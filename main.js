status="";
objects=[];
function setup(){
  canvas=createCanvas(290, 290);
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();
}
function draw(){
    image(video, 0, 0, 290, 290);
    if(status!=""){
        objectDetector.detect(video, gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            fill("#00FF00");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#00FF00");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label==object_name){
              document.getElementById("object_status").innerHTML=object_name+" found";
              synth=window.speechSynthesis;
              utterThis=new SpeechSynthesisUtterance(object_name+"found");
              synth.speak(utterThis);
            }
            else{
              document.getElementById("object_status").innerHTML=object_name+" not found";
              synth=window.speechSynthesis;
              utterThis=new SpeechSynthesisUtterance(object_name+"not found");
              synth.speak(utterThis);
            }          
        }
    }
}
function start(){
  objectDetector=ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML="Status : Detecting Objects";
  object_name=document.getElementById("object_name").value;
}
function modelLoaded(){
  console.log("model loaded!")
  status = true;
}
function gotResult(error, results){
  if (error){
    console.log(error);
  }
  else{
  console.log(results);
  objects = results;
  }
}