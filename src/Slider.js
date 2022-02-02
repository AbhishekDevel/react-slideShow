
import React from 'react';
import {getList} from './data';

export default function Slider(){
  const list = getList()
  return(
    <div className="slider-container">
      {list.map((slide,index) => {
        return(
        <div key={index} className="slide">
        <h2>{slide.name}</h2>
        <h4>{slide.price}</h4>
        <img src={slide.imgLink}/>
        <a href="#" className="btn">Buy Now</a>
      </div>)
      })}
    </div>
  )
}