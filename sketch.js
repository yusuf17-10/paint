var canvas;

var database;
var paint= [];
var p=[];
var allPaths;
var flag2=false;
var currentPath=[];
var flag=false;
//var clearButton1
function setup() {
    database=firebase.database();
    canvas = createCanvas(800, 800);
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);

    
    getpaint();
    
   
}

 async function getpaint(){
  await database.ref('allPaths').once("value",(data)=>{
    allPaths=data.val();
  })
  for(var p in allPaths){
      currentPath.push(allPaths[p]);
     
   }
  paint.push(currentPath);
  console.log(paint)
}
function update(){
  database.ref('/').update({
    currentPath:currentPath
  })
}
function startPath(){
  flag=true;
  currentPath=[];
 paint.push(currentPath);
}

function endPath(){
  flag=false;
}
function updateAll(){
  database.ref("/").update({
    allPaths:allPaths
  })
}



function draw() {
  background(0) ;
  //console.log(allPaths);
  
if(allPaths!==undefined){
  if(flag){
  flag2=true;
  var point={
    x:mouseX,
    y:mouseY
  }
  currentPath.push(point);
  update();
}
if(!flag && flag2){
  
  for(var i in currentPath){
    allPaths.push(currentPath[i]);
  }
  updateAll();
  flag2=false;
}
}


stroke(255);
strokeWeight(4)
noFill();

for (i=0; i<paint.length; i++){
  var path=paint[i];
  beginShape();
  for (j=0; j<path.length; j++) {
   vertex(path[j].x,path[j].y)
}
  endShape();
}

}

 async function keyPressed(){
  if(keyCode===32){
    allPaths=[];
    paint=[]
    currentPath=[];
    update();
    updateAll();
  }
  
}
