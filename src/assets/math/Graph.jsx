import Segment from "../map/prim/Segment";

export default class Graph{
    constructor(points=[], segments=[]){
      this.points=points;
      this.segments=segments;
    }
  
    static load(info){
      const points=info.points.map(
        (pointInfo)=>new Point(pointInfo.x,pointInfo.y)
      );
      const segments=info.segments.map(
        (segmentInfo)=>new Segment(
            points.find((p)=>p.equals(segmentInfo.p1)),
            points.find((p)=>p.equals(segmentInfo.p2))
          )
        );
        return new Graph(points,segments);
      }
  
    dispose(){
      this.points=[];
      this.segments=[];
    }
  
    addPoint(point){
      this.points.push(point);
      console.log('point add')
    }
    containsPoint(point){
      return this.points.find((p)=>p.equals(point));
    }
    tryAddPoint(point){
      if(this.containsPoint(point)){
        return false;
      }
      this.addPoint(point);
      return true;
    }
    addSegment(segment){
      this.segments.push(segment);
    }
    containsSegment(segment){
      return this.segments.find((s)=>s.equals(segment));
    }
    tryAddSegment(segment){
      if(this.containsSegment(segment)){
        return false;
      }
      this.addSegment(segment);
      return true;
    }
    removePoint(point){
      if(this.points.length==0){
        return false;
      }
      this.points.splice(this.points.indexOf(point), 1);
      const segmentsR=this.associatedSegments(point);
      for(let segment of segmentsR){//fffflet
        this.removeSegment(segment);
      }
        return true;
    }
    associatedSegments(point){
      let ans=[];
      for(const segment of this.segments){
        if(segment.includes(point)){
          ans.push(segment);
        }
      }
      return ans;
    }
    removeSegment(segment){
      if(this.segments.length==0){
        return false
      }
      this.segments.splice(this.segments.indexOf(segment), 1)
      return true
      //ddddddddddddddd

    }
  
    draw(ctx){
      for(const seg of this.segments){
        seg.draw(ctx);
      }
      for(const point of this.points){
        point.draw(ctx);
      }
    }
  }