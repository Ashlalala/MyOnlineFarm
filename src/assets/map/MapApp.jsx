import React,{ useState } from 'react';
import { useEffect, useRef } from 'react';

import {styles,layout} from '../../styles';

import Controls from "./Controls";

import Canvas from "./Canvas";
import CategoryBtns from './btns/CategoryBtns';
import PodCategoryBtns from './btns/PodCategoryBtns';

const MapApp=()=>{
  const ref=useRef();
  const [controls, setControls] = useState(undefined);
  const [mapActive, setMapActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [selectedPodCategory, setSelectedPodCategory] = useState(undefined);


  function handleNewFarmBtnClick(){
    setMapActive(true);
    const canvas=ref.current;
    setControls(new Controls(canvas));
  }

  function handleCategoryBtnClick(e){
    setSelectedCategory(e.target.value);
    controls.handleRadioCategoryClick(e.target.value);
  }
  function handleAnimalBtnClick(e){
    setSelectedPodCategory(e.target.value);
    controls.handleRadioAnimalChange(e.target.value);
  }

  return (
  <>
  <button  onClick={handleNewFarmBtnClick} className={`${mapActive?'hidden':styles.flexCenter}`}>New Farm</button>
  <section className={`${mapActive?styles.flexCenter:'hidden'}`}>
    <div className={`${layout.mapSideBox}`} id='info'>
    </div>
    <Canvas className={`${layout.mapCanvas} mx-0.5`} canvasref={ref}/>
    <div className={`${layout.mapSideBox} overflow-scroll p-0`} id='add-to-map'>
      <CategoryBtns category={selectedCategory} onclick={handleCategoryBtnClick}/>
      <PodCategoryBtns category={selectedCategory} podCategory={selectedPodCategory} onclick={handleAnimalBtnClick}/>
    </div>
  </section>
  <br />
  <button className="text-3xl font-bold underline w-[100%]">Clear Map</button>
  </>
  )
}

export default MapApp