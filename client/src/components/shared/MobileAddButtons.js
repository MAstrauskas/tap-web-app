import React from "react";
import { NavLink } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MoodIcon from "@material-ui/icons/Mood";
import TableFooter from "@material-ui/core/TableFooter";
export default function MobileAddButtons() {
  return (
    <TableFooter>
      <NavLink to="/tasks/add">
        <Fab
          color="secondary"
          size="medium"
          aria-label="add-task"
          style={{ position: "fixed", bottom: "10px", right: 70 }}
        >
          <AddIcon />
        </Fab>
      </NavLink>
      <NavLink to="/tasks/moodist">
        <Fab
          color="primary"
          size="medium"
          aria-label="add-mood"
          style={{ position: "fixed", bottom: "10px", right: 10 }}
        >
          <MoodIcon />
        </Fab>
      </NavLink>
    </TableFooter>
  );
}
