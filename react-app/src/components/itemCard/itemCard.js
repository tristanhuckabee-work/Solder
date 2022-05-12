import React from "react";
import { useHistory } from "react-router-dom";

import './itemCard.css';

const ItemCard = ({ item }) => {
  const history = useHistory();

  const onClick = () => {
    history.push(`/items/${item.id}`)
  }

  return (
    <div
      className='item-card'
      onClick={onClick}
    >
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