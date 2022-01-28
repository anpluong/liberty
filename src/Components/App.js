import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { BiTrash, BiPencil } from "react-icons/bi";
import { FaStar, FaRegStar } from "react-icons/fa";
import {
  getNotes,
  deleteNote,
  createNote,
  updateFavorite,
} from "../actions/notes";
import ModalAddNote from "./ModalAddNote";

const App = () => {
  const dispatch = useDispatch();
  let originalNotes = useSelector((notes) => {
    return notes;
  });

  let [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("add");
  const [index, setIndex] = useState();

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  useEffect(() => {
    setNotes(originalNotes);
  }, [originalNotes]);

  const handleOpen = (status, index) => {
    if (status === "edit") {
      setIndex(index);
    }
    setStatus(status);
    setOpen(true);
  };

  const handleClose = (status) => {
    setStatus(status);
    setOpen(false);
  };

  const createClick = (noteObj) => {
    dispatch(createNote(noteObj));
  };

  let notesArray = notes.map((noteObj, index) => {
    let newDate = (new Date(noteObj.creation_date * 1000) + "").slice(0, 24);

    return (
      <tr key={`${noteObj}-${index}`}>
        <td>{noteObj.id}</td>
        <td>{noteObj.title}</td>
        <td>{noteObj.content}</td>
        <td>{newDate}</td>
        <td onClick={() => dispatch(updateFavorite(index))}>
          {noteObj.is_favorite ? <FaStar /> : <FaRegStar />}
        </td>
        <td>
          <BiPencil size='22' onClick={() => handleOpen("edit", index)} />
          <BiTrash size='22' onClick={() => dispatch(deleteNote(index))} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <button onClick={() => handleOpen("add")}>Add Note</button>
      <ModalAddNote
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
        createClick={createClick}
        index={index}
        notes={notes}
        status={status !== "edit" ? "add" : "edit"}
      />
      <table>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Content</th>
          <th>Creation Date</th>
          <th>Favorite</th>
          <th>Actions</th>
        </tr>
        {notesArray}
      </table>
    </>
  );
};

export default App;
