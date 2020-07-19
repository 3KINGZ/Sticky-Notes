import React, { useState } from "react";
import Buttons from "./components/Buttons";
import NoteInput from "./components/NoteInput";
import Note from "./components/Note";

function App() {
  //states
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) ||
      [
        // {
        //   id: 0,
        //   time: "7:42 pm",
        //   item:
        //     "just checking if things work out this will be a really long web dev is getting too complicated just speaking what's in my mind while typing the lenovo keyboard is really good you know akes me enjoy typing(coding) just cruising i hhope no worries are coming my way that's what i hate the most you know",
        // },
      ]
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
        ...notes,
        {
          id: `${Math.floor(Math.random() * 100)}${
            input[Math.floor(Math.random() * input.length)]
          }`,
          time: `${today.getHours()}:${today.getMinutes()}`,
          item: input,
        },
      ]);
      setInput("");
      setPopUp(false);
    }
  }

  //useEffect for saving localStorage because of it's side effect
  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  });

  //function for saving text to input
  function onSearch(event) {
    setSearchText(event.target.value.toLowerCase());
  }

  //function for delNotes
  function deleteNotes(id) {
    setNotes([...notes.filter((note) => note.id !== id)]);
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
          .reverse()
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
