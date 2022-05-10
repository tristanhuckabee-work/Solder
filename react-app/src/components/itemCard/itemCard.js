import React from "react";

import './itemCard.css';

const ItemCard = ({ item }) => {
  return (

    <div className='item-card'>
      <div className='item-info'>
        <p>{item.name}</p>
        <p>{item.price}</p>
      </div>
      <div
        className='item-card-img'
        style={{ backgroundImage: `url(${item.pics[0]})`}}
      ></div>
    </div>
  )
}

export default ItemCard;