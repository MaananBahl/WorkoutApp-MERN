import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import WorkoutForm from "./WorkoutForm";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <Button className="addButton" variant="outlined" onClick={handleClickOpen}>
          + Add Workout
        </Button>
        {open === true ? (
            <WorkoutForm open={open} setOpen={() => setOpen()}/>
        ): null}
      </div>
    </header>
  );
};

export default Navbar;
