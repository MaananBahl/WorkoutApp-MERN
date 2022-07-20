import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import mypic from "../assets/mypic.png";

const WorkoutDetails = ({ workout }) => {
  return (
      <Card sx={{ maxWidth: 345, margin: "1rem", width: '100%' }}>
        <CardMedia
          component="img"
          height="140"
          // image={process.env.PUBLIC_URL + "/mypic.png"}
          image={mypic}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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
          <Button variant="outlined" size="small">Edit</Button>
          <Button variant="outlined" size="small">Delete</Button>
        </CardActions>
      </Card>
  );
};

export default WorkoutDetails;
