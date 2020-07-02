import React from "react";

function Buttons({ onOpenAddNote }) {
  return (
    <>
      <span className="add-note">
        <button onClick={onOpenAddNote}>+</button>
      </span>
      <span className="close-note">X</span>
    </>
  );
}

export default Buttons;
