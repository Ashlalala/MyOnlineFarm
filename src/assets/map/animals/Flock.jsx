import Boid from "./Boid";

export default class Flock{
  constructor(amount,type,segments=[]){
    this.type=type;
    this.boids=this.getFlock(amount);
    this.fencing=segments;
  }

  updateFencing(segments){
    for(let boid of this.boids){
      boid.updateFencing(segments)
    }
  }

  getFlock(amount){//add type
    const flock=[];
    for(let i=0;i<amount;i++){
      flock.push(new Boid(this.type));
    }
    return flock;
  }

  addBoids(amount,x=random(width),y=random(height), fencing){
    for(let i=0;i<amount;i++){
      this.boids.push(new Boid(this.type,x+i/1000,y,fencing));
    }
  }
  removeBoid(boid){
    this.boids.splice(this.boids.indexOf(boid),1);
  }

  draw(ctx){
    for(const boid of this.boids){//const
      boid.update(this.boids);
      boid.draw(ctx); 
    }
  }
}