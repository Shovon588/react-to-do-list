import React from 'react'
import './Lists.css'

const list_items = (props) => {

  return (
    <li><button className="remove-item-btn" value={props.unique} onClick={props.click}>x</button>{props.name}</li>
  )
}


export default list_items
