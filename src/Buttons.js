import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { isLoading, page, numPages, handlePage } = useGlobalContext();

  return (
    <div className="btn-container">
      {/* if loading than disable the button */}
      <button
        className=""
        disabled={isLoading}
        onClick={() => {
          handlePage("decrease");
        }}
      >
        Prev
      </button>
      <p>
        {page + 1} of {numPages}
      </p>
      <button
        className=""
        disabled={isLoading}
        onClick={() => {
          handlePage("increase");
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Buttons;
