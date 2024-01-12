import React from 'react';

import { styles,layout } from '../../../styles';

const animals=['Sheep', 'Goat', "Cow", 'Chicken'];
const plants=['Apple Tree', 'Peach Tree', 'Lemon Tree'];
const structures=["House 1", "House 2", "House 3", "Chicken Coup", 'Barnhouse'];
const fencing=['Freehand Mode']

const categories={
  animals:animals, 
  plants:plants,
  structures:structures,
  fencing:fencing
}

const PodCategoryBtns = (props) => {
  let selectedCategoryList
  if(props.category=='animals'){
    selectedCategoryList=categories.animals
  }else if(props.category=='plants'){
    selectedCategoryList=categories.plants
  }else if(props.category=='structures'){
    selectedCategoryList=categories.structures
  }else if(props.category=='fencing'){
    selectedCategoryList=categories.fencing
  }else return <></>

  

  return(
    <div className={`${styles.flexStart} border-solid border-black border-4
    w-[100%] text-wrap flex-wrap p-0.5 my-1`} id='podCategory-btns'>{
      selectedCategoryList.map((btnInfo,index)=>{
        const btnValue=btnInfo.toLowerCase();
        return(
          <label htmlFor={btnValue} key={index+'label'}>
          <div key={index} className={`border-solid border-black border-2 w-[82px] h-[66px] text-sm m-0.5
          ${props.podCategory==btnValue&&'bg-sky-500'} cursor-pointer`} >
            <input type="radio" className='hidden'
            onClick={e=>props.onclick(e)} name={`${props.category}Selector`} 
            value={btnValue} id={btnValue} key={index}/>
            {btnInfo}
          </div>
          </label>
        )
      })
    }</div>  
  )
}

export default PodCategoryBtns


