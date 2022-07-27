import { useContext, useEffect, useState } from "react";
import {useWorkoutsContext} from '../hooks/UseWorkoutsContext';

// components
import WorkoutDetails from "../components/WorkoutDetails";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const {workouts, dispatch} = useWorkoutsContext(); 

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        // setWorkouts(json);
        dispatch({
          type: 'SET_WORKOUTS',
          payload: json
        })
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      {workouts &&
        workouts.map((workout) => (
          <div className="workoutsContainer" key={workout._id}>
            <WorkoutDetails key={workout._id} workout={workout} />
          </div>
        ))}
    </div>
  );
};

export default Home;
