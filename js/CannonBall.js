class CannonBall
{
    constructor(x,y,r)
    {
        var options = 
        {
            restitution: 0.85,
            isStatic: true,
            friction: 1,
            density: 1,
        };
        this.image = loadImage("assets/cannonball.png");    
        this.body = Bodies.circle(x,y,r,options);
        this.r = r;
        this.trajectory = [];
        //boolean true, false

        //flag value
        this.isSink = false; 
        this.speed = 0.05;       
        this.animation = [this.image]
        
        World.add(myWorld, this.body);
        
    
    }

    animate()
    {
        this.speed += 0.05;
      //  this.speed = this.speed + 0.05;
    }

    remove(index)
    {
            this.isSink = true;

            Matter.Body.setVelocity(this.this.body, {x:0, y:0});

            this.animation  = waterAnimation;
            this.speed = 0.05;
            this.r = 150;

            setTimeout(()=>
            {
             Matter.World.remove(myWorld, this.body);
            // ball.splice(index,1);
            delete balls[index];
            }, 1000);
            

    }

    shoot()
    {
        // Body.setVelocity(this.body, {x: 10, y:-12})
   

         var velocity = p5.Vector.fromAngle(cannon.angle);
         velocity.mult(15);
         Body.setStatic(this.body, false);
         Body.setVelocity(this.body, {x: velocity.x, y: velocity.y});

    }

     display()
     {
    

        var pos = this.body.position; 
        var angle = this.body.angle;

        //floor -round off value
        var index = floor(this.speed % this.animation.length)
        push();
        translate(pos.x, pos.y);;
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index],0,0,this.r, this.r);
        pop();

        //getting the position of the ball and pushing them in the trajectory array
        if(this.body.velocity.x > 0 && this.body.position.x>250 && this.isSink ===false)
        {
            var position = [this.body.position.x, this.body.position.y]
            this.trajectory.push(position);

           // [ [x1,y1], [x2,y2], [x3,y3], [x4,y4] ]
        }

        //setting the image to the trajectory
        for(var i =0; i<this.trajectory.length; i=i+1)
        {
            image(this.image,this.trajectory[i][0], this.trajectory[i][1], 5, 5 )
        }

     }   
}   