import {
  GET_NOTES,
  DELETE_NOTE,
  CREATE_NOTE,
  UPDATE_NOTE,
  UPDATE_FAVORITE,
} from "../actions/actionTypes";

const handleNotes = (state = [], action) => {
  switch (action.type) {
    case GET_NOTES:
      return action.result;
    case DELETE_NOTE:
      let tempNote1 = [...state];
      tempNote1.splice(action.index, 1);
      return tempNote1;
    case CREATE_NOTE:
      let tempNote2 = [...state];
      tempNote2.unshift(action.noteObj);
      tempNote2.sort(function (a, b) {
        return b.is_favorite - a.is_favorite;
      });
      return tempNote2;
    case UPDATE_NOTE:
      let tempNote3 = [...state];
      tempNote3 = tempNote3.map((noteObject, noteIndex) => {
        if (noteIndex === action.index) {
          return { ...action.noteObj };
        }
        return noteObject;
      });

      return tempNote3;
    case UPDATE_FAVORITE:
      let tempNote4 = [...state];
      tempNote4 = tempNote4.map((noteObj, noteIndex) => {
        if (noteIndex === action.index) {
          return { ...noteObj, is_favorite: !noteObj.is_favorite };
        }
        return noteObj;
      });

      return tempNote4;

    default:
      return state;
  }
};

export default handleNotes;
