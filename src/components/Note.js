import React from "react";

function Note({ note, time, delNotes }) {
  return (
    <div className="note">
      <div className="design"></div>
      <div className="time-container">
        <span onClick={delNotes} className="del-notes">
          <button>X</button>
        </span>
        <span className="time">{time}</span>
      </div>
      <div className="main-note">{note}</div>
    </div>
  );
}

export default Note;
