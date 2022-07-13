const express = require("express");
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require("../controllers/workoutController");
const router = express.Router();

//get all workouts
router.get("/", getWorkouts);

//get a single workout
router.get("/:id", getWorkout);

//create a new workout
router.post("/", createWorkout);

//Delete a workout
router.delete("/:id", deleteWorkout);

//Delete a workout
router.patch("/:id", updateWorkout);

module.exports = router;
