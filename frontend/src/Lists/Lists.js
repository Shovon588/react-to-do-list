import React from 'react'
import './Lists.css'

const list_items = (props) => {

  return (
      <li><button className="remove-item-btn" value={props.value} onClick={props.click}>x</button>{props.name}</li>
  )
}


export default list_items
