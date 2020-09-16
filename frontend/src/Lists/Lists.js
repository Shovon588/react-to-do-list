import React from "react";
import "./Lists.css";

const list_items = (props) => {
  return (
    <li>
      <button
        className="fa fa-check"
        style={{ fontSize: "20px", outline: "none" }}
        value={props.value}
        onClick={props.toggleStatus}
      ></button>
      <button
        className="fa fa-edit"
        style={{ fontSize: "20px", outline: "none" }}
        value={props.value}
        onClick={props.edit}
      ></button>
      <button
        className="fa fa-trash mr-2"
        style={{ fontSize: "20px", outline: "none" }}
        value={props.value}
        onClick={props.delete}
      ></button>

      <span style={props.style}>{props.name}</span>
    </li>
  );
};

export default list_items;
