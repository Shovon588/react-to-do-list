import React from 'react'
import './Lists.css'

const list_items = (props) => {
  return (
    <li><span><button className="remove-item-btn">x</button></span>{props.item}</li>
  )
}


export default list_items
