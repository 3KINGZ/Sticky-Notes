import React from "react";

function NoteInput({
  inputValue,
  onInputChange,
  onNoteSave,
  onKeyEnter,
  onClosePopUP,
}) {
  return (
    <div>
      <textarea
        cols="40"
        value={inputValue}
        onChange={onInputChange}
        onKeyPress={onKeyEnter}
      ></textarea>
      <button onClick={onNoteSave}>Add-Note</button>
      <span className="close-popup-btn">
        <button onClick={onClosePopUP}>X</button>
      </span>
    </div>
  );
}

export default NoteInput;
