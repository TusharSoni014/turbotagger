import React, { useEffect, useState } from "react";
import "./tags-container.scss";
import Tag from "./tag/Tag";
import { Button } from "antd";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-hot-toast";

export default function TagsContainer({ tags }) {
  const [innerTags, setInnerTags] = useState(null);

  useEffect(() => {
    setInnerTags(tags);
  }, [tags]);

  function handleDelete(id) {
    const updatedTags = innerTags.filter((_, index) => index !== id);
    setInnerTags(updatedTags);
  }

  function handleCopy() {
    navigator.clipboard.writeText(innerTags.join(", "));
    toast.success("Tags Copied to clipboard.")
  }

  return (
    <div className="tags-container-parent">
      <Button onClick={handleCopy} className="copy-all-btn" type="primary">
        <BiCopy className="copy-icon" /> Copy All
      </Button>
      <div className="tag-container">
        {innerTags &&
          innerTags.map((element, index) => {
            return (
              <Tag
                handleDelete={handleDelete}
                id={index}
                key={index}
                text={element}
              />
            );
          })}
      </div>
    </div>
  );
}
