import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useWorkoutsContext } from "../hooks/UseWorkoutsContext";

const WorkoutForm = ({open, setOpen}) => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {

    const workout = {title, load, reps};
    console.log(workout);
    const response = await fetch('/api/workouts', {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json();

    if(!response.ok){
        setError(json.error);
        setEmptyFields(json.emptyFields);
    }

    if(response.ok){
        setTitle('');
        setLoad(null);
        setReps(null);
        setError(null);
        setEmptyFields([]);
        console.log("New workout added");
        dispatch({
          type: 'CREATE_WORKOUT',
          payload: json
        })
        setOpen(false);
    }
    
    // window.location.reload();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialogTitle">Add a New Workout</DialogTitle>
        { error!=null ? <div style={{color: "red", fontSize: '0.8rem', margin: '1.5rem 1rem 0 1.6rem'}}>{error}</div> : null}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Exercise Title"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            style={{width: "99%"}}
            color={emptyFields.includes('title') ? "error" : "primary"}
            className={emptyFields.includes('title') ? 'error' : ''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="load"
            label="Load (in Kgs)"
            type="number"
            fullWidth
            variant="outlined"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            style={{width: "99%"}}
            color={emptyFields.includes('load') ? "error" : "primary"}
            className={emptyFields.includes('load') ? 'error' : ''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Reps"
            type="number"
            fullWidth
            variant="outlined"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            style={{width: "99%"}}
            color={emptyFields.includes('reps') ? "error" : "primary"}
            className={emptyFields.includes('reps') ? 'error' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkoutForm;
