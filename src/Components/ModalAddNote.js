import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { updateNote } from "../actions/notes";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: "30%",
    outline: "none",
    height: "44%",
    '@media (max-width:760px)': { 
      width: '60%',
      height: '80%'
    },
    '@media (max-width:425px)': { 
      width: '60%',
      height: '80%'
    },
    '@media (max-width:375px)': { 
      width: '60%',
      height: '80%'
    }
  },
  formStyle: {
    marginLeft: "30px",
    marginTop: "10px",
  },
  id: {
    width: "80%",
    height: "40px",
  },
  title: {
    width: "80%",
    height: "40px",
  },
  content: {
    width: "80%",
    height: "40px",
  },
  formControl: {
    minWidth: 120,
  },

}));

const ModalAddNote = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [noteObj, setNoteObj] = useState({
    id: "",
    title: "",
    content: "",
    is_favorite: false,
    creation_date: "",
  });

  const handleChange = (e) => {
    setNoteObj({ ...noteObj, [e.target.name]: e.target.value });
  };

  const closeHandler = (e) => {
    props.handleClose("add");
  };

  useEffect(() => {
    setNoteObj({
      id: props.status === "add" ? "" : props.notes[props.index].id,
      title: props.status === "add" ? "" : props.notes[props.index].title,
      content: props.status === "add" ? "" : props.notes[props.index].content,
      is_favorite:
        props.status === "add" ? false : props.notes[props.index].is_favorite,
      creation_date:
        props.status === "add"
          ? Date.now() / 1000
          : props.notes[props.index].creation_date,
    });
  }, [props.open, props.status, props.index]);

  const textFieldHandler = (e) => {
    setNoteObj({ ...noteObj, [e.target.name]: e.target.value });
  };

  const saveClick = () => {
    // if (isIdValidated()) {
      noteObj.creation_date = Date.now() / 1000;

      props.createClick(noteObj);

      props.handleClose("add");
    // }
  };

  const updateClick = () => {
    dispatch(updateNote(noteObj, props.index));
    props.handleClose("add");
  };

  // const isIdValidated = () => {
  //   return (
  //     props.notes.every((noteObject) => noteObject.id !== noteObj.id) &&
  //     noteObj.content !== "" &&
  //     noteObj.title !== ""
  //   );
  // };

  return (
    <Modal
      className={classes.modal}
      open={props.open}
      onClose={closeHandler}
      BackdropComponent={Backdrop}
    >
      <section className={classes.paper}>
        <Box height='5%' color='#FFF' p={1} bgcolor='primary.main'>
          {props.status === "add" ? "Add Note" : "Edit Note"}
        </Box>
        <form className={`${classes.formStyle}`}>
          <TextField
            required
            size='small'
            name='id'
            label='id'
            variant='outlined'
            onChange={textFieldHandler}
            value={noteObj.id}
            className={classes.id}
            id='id'
            inputProps={{ maxLength: 10 }}
          />
          <br />
          <br />

          <TextField
            required
            size='small'
            inputProps={{ maxLength: 10 }}
            label='title'
            placeholder='Title'
            name='title'
            value={noteObj.title}
            className={classes.title}
            variant='outlined'
            onChange={textFieldHandler}
          />
          <br />
          <br />
          <TextField
            required
            size='small'
            inputProps={{ maxLength: 10 }}
            label='content'
            placeholder='Content'
            name='content'
            value={noteObj.content}
            className={classes.content}
            variant='outlined'
            onChange={textFieldHandler}
          />
          <br />
          <br />

          <FormControl
            variant='outlined'
            className={classes.formControl}
            size='small'
          >
            <InputLabel id='demo-simple-select-outlined-label'>
              Favorite
            </InputLabel>
            <Select
              value={noteObj.is_favorite ? true : false}
              onChange={handleChange}
              label='Favorite'
              name='is_favorite'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </form>
        <Box ml='2rem' mt='1rem' mb='2rem' flex>
          <Button
            variant='contained'
            color='Primary'
            className={classes.saveAddnoteBtn}
            style={{ marginRight: "10px" }}
            onClick={props.status === "add" ? saveClick : updateClick}
          >
            Save
          </Button>
          <Button
            variant='outlined'
            color='Cancel'
            onClick={closeHandler}
            className={classes.cancelAddnoteBtn}
          >
            Close
          </Button>
        </Box>
      </section>
    </Modal>
  );
};

export default ModalAddNote;
