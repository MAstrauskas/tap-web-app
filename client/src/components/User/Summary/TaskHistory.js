import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DoneIcon from "@material-ui/icons/Done";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles(theme => ({
  root: { paddingLeft: "2rem", paddingRight: "2rem" },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  inline: {
    display: "inline"
  }
}));

export default function TaskHistory({ tasks }) {
  const classes = useStyles();
  const tabletView = useMediaQuery("(max-width: 960px)");

  let listSize = "710px";

  if (tabletView) {
    listSize = "350px";
  }

  // Show only 5 tasks per page
  const pagesPerList = tasks.length / 5;
  const [tasksPerPage, setTasksPerPage] = useState([]);

  const handleTasksPerPage = (start, end) => {
    setTasksPerPage([]);

    const arrayOf5Tasks = [];

    for (let i = start; i < end; i++) {
      if (i < tasks.length) {
        arrayOf5Tasks.push(tasks[i]);
      }
    }

    setTasksPerPage(...tasksPerPage, arrayOf5Tasks);
    console.log(tasks.length);
    console.log(tasksPerPage);
  };

  return (
    <div className={classes.root} style={{ maxWidth: listSize }}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="completed-task-history"
          id="completed-task-history"
        >
          <Typography className={classes.heading}>
            All Completed Tasks
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List dense={true}>
            {tasks.map(task => {
              return (
                <ListItem>
                  <ListItemIcon>
                    <DoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={task.taskName}
                    secondary={
                      task.taskDescription.length ? (
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                          >
                            {task.taskDescription}
                          </Typography>
                        </React.Fragment>
                      ) : null
                    }
                  />
                </ListItem>
              );
            })}
            <Pagination
              count={pagesPerList}
              shape="rounded"
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem"
              }}
              onChange={() => handleTasksPerPage(0, 5)}
            />
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
