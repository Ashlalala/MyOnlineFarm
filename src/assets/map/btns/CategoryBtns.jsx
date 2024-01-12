import React from 'react';

import { styles,layout } from '../../../styles';

const categoryBtnsInfo=['animals','plants','structures','fencing'];

const CategoryBtns = (props) => {
  return (
    <div className={`${styles.flexStart} border-solid border-4 border-black w-[100%] text-wrap flex-wrap
    bg-orange-50 p-0.5`}
    id='category-btns'>{
      categoryBtnsInfo.map((btnInfo,index)=>{
        const btnLabel=btnInfo.charAt(0).toUpperCase() + btnInfo.slice(1);
        return(
        <label key={index+"label"} htmlFor={btnInfo}>
        <div key={index} className={`border-solid border-black border-2 w-[82px] h-[66px] text-sm  m-0.5
        ${props.category==btnInfo?'bg-sky-500':'bg-sky-300'} cursor-pointer` }
        >
          <input 
          key={index} type="radio" className="hidden" 
          onClick={e=>props.onclick(e)} name="categorySelector" 
          value={btnInfo} id={btnInfo}  />
          {btnLabel}
        </div>
        </label>
        )
      })
    }</div>
  )
}

export default CategoryBtns