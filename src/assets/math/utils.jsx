let selectedCategory;

class Point{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }

  equals(point){
    return this.x==point.x && this.y==point.y;
  }

  draw(ctx,{size=18,color='black',outline=false,hovered=false}={}){
    const rad=size/2;
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.arc(this.x, this.y, rad, 0, Math.PI*2);
    ctx.fill();
    if(outline){
      ctx.beginPath();
      ctx.fillStyle='yellow';
      ctx.arc(this.x, this.y, rad*0.7, 0, Math.PI*2);
      ctx.fill();
      /*
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.strokeStyle='yellow';
      ctx.arc(this.x,this.y,rad*0.6,0,Math.PI*2);
      ctx.stroke();
      */
    } 
    if(hovered){
      ctx.beginPath();
      ctx.fillStyle='green';
      ctx.arc(this.x, this.y, rad*0.5, 0, Math.PI*2);
      ctx.fill();
      //ctx.beginPath();
      //ctx.lineWidth=2;
      //ctx.strokeStyle='orange';
      //ctx.arc(this.x,this.y,rad*0.4,0,Math.PI*2);
      //ctx.stroke();
    }
  }
}
class Vector{
  constructor(x=random(2)-1,y=random(2)-1){
    this.x=x
    this.y=y
  }
  MaxMin(max,min=0){
    this.x=Math.min(max,Math.max(min,this.x))
    this.y=Math.min(max,Math.max(min,this.y))
  }
  add(add){
    //console.log(this)
    this.x+=add.x;
    this.y+=add.y;
    return this;
  }
  sub(sub){
    this.x+=sub.x;
    this.y+=sub.y;
    return this;
  }

  div(div){
    this.x/=div;
    this.y/=div;//hhhhh
    return this;//remove return
  }
  mult(mult){
    this.x*=mult;
    this.y*=mult;//hhhhh
    return this;
  }
}

function random(max=1,min=0){
  return Math.max(min,Math.random()*max);
}


function add2d(a,b){
  return new Vector(a.x+b.x,a.y+b.y);
}
function sub2d(a,b){
  return new Vector(a.x-b.x,a.y-b.y);
}


function hypo2d(point1,point2){
  const a=point2.x-point1.x;
  const b=point2.y-point1.y;
  return Math.sqrt(a**2+b**2);
}






function checkPointInRange(loc,points,range){
  let minDist=Number.MAX_SAFE_INTEGER;
  let nearest=null;
  for(const point of points){
    const dist=distance(loc,point);
    if(dist<minDist){
      minDist=dist;
      nearest=point;
    }
  }
  if (minDist<range){
    return nearest;

  }
  return null;
}

function distance(p1,p2){
  if(!p2.x){p2=p2.position}
  const a=(p1.x-p2.x)**2;
  const b=(p1.y-p2.y)**2;
  return Math.sqrt(a+b);
}

function average(p1,p2){
  return new Point((p1.x+p2.x)/2,(p1.y+p2.y)/2);
}

function add(p1,p2){
  return new Point(p1.x+p2.x,p1.y+p2.y);
}
function subtract(p1,p2){
  return new Point(p1.x-p2.x,p1.y-p2.y);
}

function scale(p,scaler){
  return new Point(p.x*scaler,p.y*scaler)
}

function translate(loc,angle,offset){
  return new Point(
    loc.x+Math.cos(angle)*offset,
    loc.y+Math.sin(angle)*offset
  );
}

function angle(p){
  return Math.atan2(p.y,p.x);
}


function getIntersection(A, B, C, D) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (bottom != 0) {
     const t = tTop / bottom;
     const u = uTop / bottom;
     if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
           x: lerp(A.x, B.x, t),
           y: lerp(A.y, B.y, t),
           offset: t,
        };
     }
  }

  return null;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getRandomColor() {
  const hue = 290 + Math.random() * 260;
  return "hsl(" + hue + ", 100%, 60%)";
}

function getYofX(x,p1,p2){
  let difference=sub2d(p2,p1);
  changePerUnit=difference.y/difference.x;
  return (x-p1.x)*changePerUnit+p1.y;
}








