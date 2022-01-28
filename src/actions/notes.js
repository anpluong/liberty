import axios from "axios";
import * as actionTypes from "./actionTypes.js";

export const getAllNotes = (result) => {
  return {
    type: actionTypes.GET_NOTES,
    result,
  };
};

export const deleteNote = (index) => {
  return {
    type: actionTypes.DELETE_NOTE,
    index,
  };
};

export const createNote = (noteObj) => {
  return {
    type: actionTypes.CREATE_NOTE,
    noteObj,
  };
};

export const updateFavorite = (index) => {
  return {
    type: actionTypes.UPDATE_FAVORITE,
    index,
  };
};

export const updateNote = (noteObj, index) => {
  return {
    type: actionTypes.UPDATE_NOTE,
    noteObj,
    index,
  };
};

export const getNotes = () => {
  return async (dispatch) => {
    await axios
      .get("https://61f106e6072f86001749efa4.mockapi.io/notes")
      .then((response) => {
        dispatch(getAllNotes(response.data));
      })
      .catch((error) => {
        return error;
      });
  };
};
