var Engine = Matter.Engine;
var World= Matter.World;
var Events = Matter.Events;
var Bodies = Matter.Bodies;

var plinkos = [];
var divisions = [];

var diviH = 300; 
var score = 0;
var turn = 0; 

var gamestate = "start";

var divNew;
var plinko,plinko1,plinko2,plinko3;
var particle = null; 


function setup() {
  createCanvas(800,800);
  engine = Engine.create();
  world = engine.world; 
 
  height = 800;
  width = 800;

  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <= width; k = k + 80) {
   divNew = new Division(k,height, 10, diviH);
   divisions.push(divNew);
  }

  for (var d = 75; d <= width; d = d + 50) {
    plinko = new Plinko(d, 75);
    plinkos.push(plinko);
  }

  for (var d = 50; d <= width - 10; d = d + 50) {
    plinko1 = new Plinko( d, 175);
    plinkos.push(plinko1);
  }

  for (var d = 75; d <= width; d = d + 50) {
    plinko2 = new Plinko( d, 275);
    plinkos.push(plinko2);
  }

  for (var d = 50; d <= width - 10; d = d + 50) {
    plinko3 = new Plinko( d, 375);
    plinkos.push(plinko3);
  }
   
}

function draw() {
  background("black");  
  
  textSize(20);
  text("Score : "+score,20,30);

  if (turn >= 5) {
    text ("Game Over",300,250)
  }

  Engine.update(engine);

  ground.display();

  for (var d = 0; d < plinkos.length; d++) {
    plinkos[d].display();
  }


  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if (onkeypress) { 
    mousePressed();
  }
 
  if(particle!=null) {
    particle.display();

    if (particle.body.position.y > 760) {

      if (particle.body.position.x < 300) score = score + 500;
      else if (particle.body.position.x < 600) score = score + 100; 
      else if (particle.body.position.x < 900) score = score + 200; 
        
      particle = null; 
      if (turn >= 5) {
        gamestate = "end"; 
        
      }
    }
  }

}

function mousePressed() {

  if (gamestate === "start") {
    turn++; 
    particle = new Particle(mouseX,10,10,10);
  }

}


 
