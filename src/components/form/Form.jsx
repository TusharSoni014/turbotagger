import React, { useEffect, useState } from "react";
import "./form.scss";
import { Input } from "antd";
import TagsContainer from "../tagsContainer/TagsContainer";
import Loader from "../loader/Loader";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

export default function Form() {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 3;
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  const [queryTitle, setQueryTitle] = useState("");
  const [tags, setTags] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (queryTitle === "") {
      toast.error("Type something in the title input");
    } else {
      setTags(null);
      setIsLoading(true);
      const headers = {
        Origin: "http://localhost:3000",
        "X-Requested-With": "XMLHttpRequest",
      };
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://rapidtags.io/api/generator?query=${queryTitle}&type=YouTube`,
        { headers }
      );
      const responseJson = await response.json();
      setQueryTitle("");
      console.log(responseJson);
      setTags(responseJson.tags);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="form-container">
        <div className="input-link-container">
          <form onSubmit={handleSubmit} className="form-element">
            <Input
              value={queryTitle}
              onChange={(e) => {
                setQueryTitle(e.target.value);
              }}
              className="title-input-box"
              placeholder="Enter Youtube Title"
            />
          </form>
        </div>
      </div>
      {isLoading ? (
        <div className="loading-container">
          <Loader />
        </div>
      ) : (
        ""
      )}

      {tags && <TagsContainer tags={tags} />}
    </>
  );
}
