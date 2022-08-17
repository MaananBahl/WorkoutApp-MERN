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
    }

    if(response.ok){
        setTitle('');
        setLoad(null);
        setReps(null);
        setError(null);
        console.log("New workout added");
        dispatch({
          type: 'CREATE_WORKOUT',
          payload: json
        })
    }
    setOpen(false);
    // window.location.reload();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Workout</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Exercise Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            autoFocus
            margin="dense"
            id="load"
            label="Load (in Kgs)"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Reps"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkoutForm;
