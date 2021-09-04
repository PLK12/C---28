class Boat
{
    constructor(x,y,w,h,boatPos,boatAnimation)
    {
        var options = 
        {
            friction:1,
            density:1,
            restitution: 0.85
        };

        this.body = Bodies.rectangle(x,y,w,h, options);
        this.w = w;
        this.h = h;

        this.animation = boatAnimation;
        this.speed = 0.05;
        this.boatPosition = boatPos;
        this.image = loadImage("assets/boat.png");

        World.add(myWorld, this.body);


    }

    animate()
    {
        this.speed = this.speed + 0.05;
      //  this.speed+= 0.05;
    }

    display()
    {
        
        var pos = this.body.position;

        var index = floor(this.speed %this.animation.length)   
        console.log(index);

        //floor 1.3  = 1, 1.9 = 1
        //index 0,1,2,3
        push();
        imageMode(CENTER);
        image(this.animation[index],pos.x,this.boatPosition, this.w,this.h);
        
        pop();

   }
   //boats[j].remove(j);
   remove(index)
   {

       this.animation = brokenAnimation;
       this.speed = 0.05;
       this.w = 300;
       this.h = 300,
       this.isBroken = true;

       setTimeout(()=>
       {
        Matter.World.remove(myWorld, boats[index].body);
        boats.splice(index,1);
       }, 2000);
       
   }

}