import React from "react";
import "./tag.scss";
import { RxCross2 } from "react-icons/rx";

export default function Tag({ text, id, handleDelete }) {
  return (
    <span
      id={id}
      onClick={() => handleDelete(id)}
      className="tag-element-container"
    >
      {text} <RxCross2 className="cross-icon" />
    </span>
  );
}
