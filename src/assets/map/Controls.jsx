import Map from "./Map";
import Graph from "../math/thefu";
import Viewport from "./ViewPort";
import GraphEditor from "./GraphEditor";

export default class Controls{
  constructor(canvas){
    this.mapCanvas=canvas
    this.mapCtx=this.mapCanvas.getContext('2d');
    this.mapCanvas.width=500;
    this.mapCanvas.height=500;
    this.mapCanvas.style['background-color']='green';
    this.graph=new Graph();
    this.map=new Map(this.graph);
    this.viewport=new Viewport(this.mapCanvas);
    this.graphEditor=new GraphEditor(this.viewport,this.graph, this.selectedCategory)

    this.mouse
    
    this.selectedAnimal=undefined;
    this.selectedBoids=undefined;
    
    this.selectedBoid=null
    this.hoveredBoid=null;
    this.draggedBoid=null

    this.animate()
    this.addEventListeners();
  }
  
  addEventListeners(){
    this.mapCanvas.addEventListener('mousedown',(e)=>{
      this.handleMouseDown(e);
    })
    this.mapCanvas.addEventListener('mousemove',(e)=>{
      this.handleMouseMove(e);
    })
  }  
  
  handleRadioCategoryClick(btnValue){
    selectedCategory=btnValue;
  }
  handleRadioAnimalChange(btnValue){
    this.selectedAnimal=btnValue;
    this.selectedBoids=this.map.getFlockOfType(this.selectedAnimal);
    this.updateBoidType(this.selectedBoids, this.selectedAnimal);
  }  
  
  handleMouseDown(e){
      this.map.updateFlocks();
      if(selectedCategory=='animals'){    
        if(!this.selectedAnimal){
          alert('Please select an animal');
        }
        else if(this.hoveredBoid){
          if(e.button==2){
            this.map.removeBoid(this.hoveredBoid,this.selectedAnimal)
          }
        }
        else{
          this.mouse=this.graphEditor.mouse;
          if(e.button==0){
            this.map.addBoids(1,this.selectedAnimal,this.mouse.x,this.mouse.y)
          }
          if(e.button==2){
            this.map.addBoids(10,this.selectedAnimal,this.mouse.x,this.mouse.y)
          }
        }
      }
  }

  handleMouseMove(e){
    this.mouse=this.graphEditor.mouse
    if(this.selectedBoids){
      this.hoveredBoid=checkPointInRange(this.mouse,this.selectedBoids.boids,this.graphEditor.range*this.viewport.zoom);
    }
  }
  
  updateBoidType(boid,type){
    if(type=='sheep'){boid=this.map.flocks.sheep};
    if(type=='cow'){boid=this.map.flocks.cows};
  }
    
  
  animate(){
    this.viewport.reset();
    this.map.generate();
    this.map.draw(this.mapCtx);
    this.graphEditor.display();
    requestAnimationFrame(() => { this.animate(); });
  }
}
