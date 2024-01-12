import Flock from "./animals/Flock";
import Envelope from "./prim/Envelop";


export default class Map{
  constructor(graph,roadWidth=3,roadRoundness=11){
    this.graph=graph;
    this.roadWidth=roadWidth;
    this.roadRoundness=roadRoundness;
    this.envelopes=[];
    this.roadBorders=[];
    this.generate();

    this.flocks={sheep:new Flock(0,'sheep'),cows:new Flock(0,'cow')};
  }

  updateFlocks(){
    this.flocks.sheep.updateFencing(this.graph.segments);
    this.flocks.cows.updateFencing(this.graph.segments);
  }

  generate(){//remove this if running slow
    this.envelopes.length=0;
    for(const segment of this.graph.segments){
      this.envelopes.push(
        new Envelope(segment,this.roadWidth,this.roadRoundness)
      );
    }
    //this.roadBorders=Polygon.union(this.envelopes.map((e)=>e.polygon));
  }

  addFlock(type,amount){
    if(type=='sheep'){
      this.flocks.sheep.push(new Flock(amount));
    }
  }

  addBoids(amount,type,x,y){
    let flockToAddTo=this.getFlockOfType(type);
    flockToAddTo.addBoids(amount,x,y,this.graph.segments);
  }

  removeBoid(boid,type){
    let flockToAddTo=this.getFlockOfType(type);
    flockToAddTo.removeBoid(boid);
  }

  getFlockOfType(type){

    if(type=='sheep'){
      return this.flocks.sheep;
    }
    else if(type=='cow'){
      return this.flocks.cows;
    }
  } 

  draw(ctx){
    for(const envelope of this.envelopes){
      envelope.draw(ctx,{fill:'#BBB',stroke:'#BBB',lineWidth:14});
    }
    for(const segment of this.graph.segments){
      segment.draw(ctx,{color:'white',width:4,dash:[10,10]});
    }
    this.flocks.sheep.draw(ctx)
    this.flocks.cows.draw(ctx)
  }
}