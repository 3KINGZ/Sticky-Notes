import React, { useState, useEffect } from "react";
import Buttons from "./components/Buttons";
import NoteInput from "./components/NoteInput";
import Note from "./components/Note";

function App() {
  //states
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [popUp, setPopUp] = useState(false);
  const [input, setInput] = useState("");
  const [searchText, setSearchText] = useState("");

  function openAddNotes() {
    setPopUp(!popUp);
  }

  function inputChange(event) {
    setInput(event.target.value);
    setSearchText("");
  }

  //function to saveNotes
  function saveNote(event) {
    const today = new Date();
    if (input.length > 0) {
      setNotes([
        {
          id: `${Math.floor(Math.random() * 100)}${
            input[Math.floor(Math.random() * input.length)]
          }`,
          time: `${today.getHours()}:${today.getMinutes()}`,
          item: input,
        },
        ...notes,
      ]);
      setInput("");
      setPopUp(false);
    }
  }

  //useEffect for saving localStorage because of it's side effect
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  });

  //function for saving text to input
  function onSearch(event) {
    setSearchText(event.target.value.toLowerCase());
  }

  //function for delNotes
  function deleteNotes(id) {
    setNotes([...notes.filter((note) => note.id !== id)].reverse());
  }

  return (
    <div className="notes-app">
      <div className="action-buttons">
        {popUp ? (
          <NoteInput
            inputValue={input}
            onInputChange={inputChange}
            onNoteSave={saveNote}
            onKeyEnter={(event) => (event.key === "Enter" ? saveNote() : null)}
            onClosePopUP={openAddNotes}
          />
        ) : (
          <Buttons onOpenAddNote={openAddNotes} />
        )}
      </div>
      <div className="title">Sticky Notes</div>
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={onSearch}
      />
      <div className="notes-container">
        {notes
          .filter((note) => note.item.toLowerCase().includes(searchText))
          .map((list) => (
            <Note
              key={list.id}
              note={list.item}
              time={list.time}
              delNotes={() => deleteNotes(list.id)}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
