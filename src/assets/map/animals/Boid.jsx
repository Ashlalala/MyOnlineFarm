export default class Boid{
  constructor(type,x,y,fencing){
    this.type=type;
    this.info=this.getInfo();
    this.animalImg=new Image();
    this.animalImg.src=this.info.imgLink;

    this.position=new Vector(x,y);
    this.velocity=(new Vector(0,0))
    this.acceleration=(new Vector())
    this.maxSpeed=0.1;

    this.fencing=fencing;
  }

  getInfo(){
    let ans={'visionRange':0,'personalDistanceRange':0}
    if(this.type=='sheep'){
      ans.imgLink="../../../../public/map/animals/sheepImg.png";
      ans.visionRange=80;
      ans.personalDistanceRange=24;
      ans.alignmentMult=5;
      ans.flockingMult=0.01;
      ans.personalDistanceMult=100;
    }
    if(this.type=='cow'){
      ans.imgLink="../../../../public/map/animals/cowImg.png";
      ans.visionRange=160;
      ans.personalDistanceRange=80;
      ans.alignmentMult=5;
      ans.flockingMult=0.01;
      ans.personalDistanceMult=300;
    }
    return ans
  }

  updateFencing(segments){
    this.fencing=segments;
  }

  applyAllFences(){
    for(let fence of this.fencing){
      this.applyOneFence(fence);
    }
  }

  applyOneFence(fence){
    if(
      Math.floor(this.position.y)>Math.min(fence.p1.y,fence.p2.y)-15&&
      Math.floor(this.position.y)<Math.max(fence.p1.y,fence.p2.y)+15&&
      Math.floor(this.position.x)>Math.min(fence.p1.x,fence.p2.x)-15&&
      Math.floor(this.position.x)<Math.max(fence.p1.x,fence.p2.x)+15
    ){
      const corespondingY=getYofX(this.position.x,fence.p1,fence.p2);
      if(this.position.y>corespondingY-15&&this.position.y<corespondingY+15){
        let positionChange=this.velocity;
        this.position.add(positionChange.mult(-10))
        this.velocity=new Vector();
      }
    }
  }

  getInstincts(flock){
    const inPersonalDistanceAvgP=new Vector(0,0);
    let personalDistanceW;
    let totalInPersonalDistance=0;

    const avgP=new Vector(0,0);
    let flockingW;
    const avgV=new Vector(0,0);
    
    let totalInVisionRange=0;
    for(const other of flock){
      const distanceCurr=hypo2d(other.position,this.position);
      if(other!=this&&distanceCurr<this.info.visionRange){
        avgP.add(other.position);
        avgV.add(other.velocity);
        totalInVisionRange++;
        if(distanceCurr<this.info.personalDistanceRange){
          inPersonalDistanceAvgP.add(sub2d(this.position,other.position).div(distanceCurr**2));
          totalInPersonalDistance++
        }/*else{
        avgP.add(other.position);
        totalInVisionRange++;
        }*/
      }        
    }
    if(totalInPersonalDistance>0){
      personalDistanceW=inPersonalDistanceAvgP.div(totalInPersonalDistance);
    }
    if(totalInVisionRange>0){
      avgP.div(totalInVisionRange);
      avgV.div(totalInVisionRange);
      flockingW=sub2d(avgP,this.position);
    }
    return [personalDistanceW,flockingW,avgV];
  }

  applyInstincts(flock){
    const instincts=this.getInstincts(flock)
    const personalDistance=instincts[0];
    const flocking=instincts[1];    
    const alignment=instincts[2];

    if(flocking&&alignment){
      const flockInstincts=add2d(
        flocking.mult(this.info.flockingMult),
        alignment.mult(this.info.alignmentMult)).div(2)
        this.acceleration.add(flockInstincts)
    }else{
      if(flocking)this.acceleration.add(flocking.mult(this.info.flockingMult));
      if(alignment)this.acceleration.add(alignment.mult(this.info.alignmentMult));
    }
    if(personalDistance)this.acceleration.add(personalDistance.mult(this.info.personalDistanceMult));
  }

  update(flock){
      this.applyInstincts(flock);
      this.velocity.MaxMin(this.maxSpeed,this.maxSpeed*-1);
      this.applyAllFences();
      this.position.add(this.velocity);
      this.acceleration.MaxMin(this.maxSpeed,this.maxSpeed*-1);
      this.velocity.add(this.acceleration);
      this.acceleration=new Vector(0,0);
  }

  draw(ctx,{radius=1,color='black'}={}){
    ctx.drawImage(
      this.animalImg,
      this.position.x-this.animalImg.width/2,
      this.position.y-this.animalImg.height/2
    );
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.arc(this.position.x,this.position.y,radius,0,Math.PI*2);
    ctx.fill();
  }
}
