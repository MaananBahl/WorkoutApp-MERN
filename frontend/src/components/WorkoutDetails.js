import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import mypic from "../assets/mypic.png";
import { useWorkoutsContext } from "../hooks/UseWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleDelete = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: "DELETE",
    })

    const json = await response.json();

    if(response.ok){
      dispatch({
        type: 'DELETE_WORKOUT',
        payload: json
      })
    }
  }

  return (
      <Card sx={{ maxWidth: 345, margin: "1rem", width: '100%' }}>
        {/* <CardMedia
          component="img"
          height="140"
          // image={process.env.PUBLIC_URL + "/mypic.png"}
          image={mypic}
          alt="green iguana"
        /> */}
        <CardContent className="workout_container">
          <Typography gutterBottom variant="h5" component="div" className="workout_title">
            {workout.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Load (kgs): </strong>
            {workout.load}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>reps: </strong>
            {workout.reps}
          </Typography>
        </CardContent>
        <CardActions sx={{margin: '0 0 0.5rem 0.5rem'}}>
          {/* <Button variant="outlined" size="small">Edit</Button> */}
          <Button size="small" onClick={handleDelete} className="delete_button">Delete</Button>
        </CardActions>
      </Card>
  );
};

export default WorkoutDetails;
