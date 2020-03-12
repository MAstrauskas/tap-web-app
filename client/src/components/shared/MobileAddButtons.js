import React from "react";
import { NavLink } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MoodIcon from "@material-ui/icons/Mood";

export default function MobileAddButtons() {
  return (
    <div>
      <NavLink to="/tasks/add">
        <Fab
          color="secondary"
          size="small"
          aria-label="add-task"
          style={{ position: "absolute", bottom: 2, right: 50 }}
        >
          <AddIcon />
        </Fab>
      </NavLink>
      <NavLink to="/tasks/moodist">
        <Fab
          color="primary"
          size="small"
          aria-label="add-mood"
          style={{ position: "absolute", bottom: 2, right: 2 }}
        >
          <MoodIcon />
        </Fab>
      </NavLink>
    </div>
  );
}
