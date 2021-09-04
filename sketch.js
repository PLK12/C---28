const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Render = Matter.Render;

var myEngine, myWorld;
var cbImg, cannonBall;

var tower, towerImg, ground, cannon, boatImg
var backgroundImg;
var boat;
var balls = [];
var boats = [];

var boatAnimation = [];
var boatSpritesheet, boatSpritedata;
var boatFrames;

var brokenAnimation = [];
var brokenSpriteSheet, brokenSpritedata;
var brokenFrames;

var waterAnimation = [];
var waterSpriteSheet, waterSpritedata;
var waterFrames;

//new cannon balls when down is pressed. Please store it inside balls[]

function preload()
{
  towerImg = loadImage("assets/tower.png");
  backgroundImg = loadImage('assets/background.gif');
  cbImg = loadImage("assets/cannonball.png");

  boatImg = loadImage("assets/boat.png");

  boatSpritedata = loadJSON('assets/boat/boat.json');
  boatSpritesheet = loadImage('assets/boat/boat.png');

  brokenSpritedata = loadJSON('assets/boat/broken_boat.json');
  brokenSpriteSheet = loadImage('assets/boat/broken_boat.png');

  waterSpriteSheet = loadImage('assets/water_splash/water_splash.png');
  waterSpritedata = loadJSON('assets/water_splash/water_splash.json');

}

function setup(){
    createCanvas(1200,600);
    myEngine = Engine.create();
    myWorld = myEngine.world;


    /*var render = Render.create({
      element: document.body,
      engine: myEngine,
      options: {
        width: 1200,
        height: 600,
        wireframes: false
      }
    });

    Render.run(render);
    tower = new Tower(150, 380, 190, 330);

    ground = new Ground(600, height-1, width*2,1);
    angle = -PI/4
    cannon = new Cannon(185, 140, 90, 56,angle);*/

 //   boat = new Boat(width-400,height -100,200,200);

   
     boatFrames = boatSpritedata.frames;

     for(var i=0; i<boatFrames.length; i++)
     {
        var pos = boatFrames[i].position;

        var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
        boatAnimation.push(img);
     }
     //console.log(boatSpritedata);

     brokenFrames = brokenSpritedata.frames;

     for(var i = 0; i<brokenFrames.length; i++)
     {
       var pos = brokenFrames[i].position;

       var img = brokenSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
       brokenAnimation.push(img);
     }
    
     waterFrames = waterSpritedata.frames;

     for(var i = 0; i<waterFrames.length;i++)
     {
       var pos = waterFrames[i].position;

       var img = waterSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
       waterAnimation.push(img);
     }

}

function draw(){
    background(backgroundImg);
    Engine.update(myEngine);

    //for the cannon ball array
    for(var i=0; i<balls.length; i++)
    {
       //cannonball
        showCannonBalls(balls[i], i);

        //for the boats array
        for(var j = 0; j< boats.length; j++)
        {
            if(balls[i] !== undefined  && boats[j] !== undefined)
            {
             // Matter.SAT.collides.collided()
                var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
                if(collision.collided)
                {
                   if(!boats[j].isBroken  && !balls[i].isSink)
                   {
                      boats[j].remove(j);
                      j--;

                   }  
                    Matter.World.remove(myWorld, balls[i].body);
                   // balls.splice(i, 1);
                   delete balls[i];
                    i--;

                    /*
                    i=2
                    i=3
                    [c1, c2, c3, c4, c5]
                    [c1, c2, c4, c5]
                    j=0
                    [b1, b2];

                    */
                }
            }

        }
    }

    tower.display();
    ground.display();
    cannon.display();

    /*
    Body.setVelocity(boat.body,{
      x: -0.9,
      y: 0
    })
    
    boat.display();
   // cannonBall.display();

   */
  showBoats();
   
}

//user defined function
function showCannonBalls( ball, index)
{

  //verification : whether the cannonball -
     if(ball)
     {
        ball.display();
        ball.animate();

        if(ball.body.position.x >= width || ball.body.position.y >= height-80)
        {
             //isSink =false
              if(!ball.isSink)
              {
              //if(ball.isSink === true)
               //World.remove(myWorld, ball.body);
              //balls.splice(index,1);
                 ball.remove(index);
              }
        }
     }  
}




function keyPressed()
{
  if (keyCode === 32)
  {
    cannonBall = new CannonBall(cannon.x, cannon.y, 40);
    balls.push(cannonBall);
    
    
  }
}

function keyReleased()
{
   if(keyCode === 32)
   {
      
      cannonBall.shoot();
   }
}


function showBoats()
{
     //1st check whether 1st boat exists
      //[b]
    if(boats.length > 0)
     {
      if(boats.length < 4 && boats[boats.length-1].body.position.x < width-310)
      
      {

          var position = [height -100, height-180, height-150 ];
          var position = random(position);

          var boat =new Boat(width, height-100, 200, 200, position, boatAnimation);
          boats.push(boat);
 
       }

       for(var i =0; i<boats.length;i++)
       {
           Body.setVelocity(boats[i].body, {x: -0.9, y:0});
           boats[i].display();
          boats[i].animate();
        
       }
     }

     else
     {

        var boat = new Boat(width, height-100, 200, 200, height-110, boatAnimation);
        boats.push(boat);
     }
}



















