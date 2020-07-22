import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  TablePagination,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TaskDetails from "./TaskDetails";

const useStyles = makeStyles((theme) => ({
  root: { paddingLeft: "2rem", paddingRight: "2rem" },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  inline: {
    display: "inline",
  },
  completedTasks: {
    display: "flex",
    flexDirection: "column",
  },
  list: {
    width: "100%",
  },
  tableFooter: {
    display: "flex",
    justifyContent: "end",
  },
}));

export default function TaskHistory({ tasks }) {
  const classes = useStyles();
  const tabletView = useMediaQuery("(max-width: 960px)");

  let listSize = "710px";

  if (tabletView) {
    listSize = "350px";
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleTasksPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div
      className={classes.root}
      style={{ maxWidth: listSize }}
      data-testid="task-history"
    >
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
        <ExpansionPanelDetails className={classes.completedTasks}>
          <List dense={true} className={classes.list}>
            {(rowsPerPage > 0
              ? tasks.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tasks
            ).map((task) => {
              return (
                <ListItem key={task._id}>
                  <ListItemIcon>
                    <DoneIcon />
                  </ListItemIcon>
                  {tabletView ? (
                    <TaskDetails
                      message={task.taskName}
                      taskName={task.taskName}
                      taskDescription={task.taskDescription}
                      taskDueDate={task.taskDueDate}
                      taskPriority={task.taskPriority}
                      taskDifficulty={task.taskDifficulty}
                    />
                  ) : (
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
                  )}
                  {!tabletView ? (
                    <ListItemSecondaryAction>
                      <TaskDetails
                        message="Check details"
                        taskName={task.taskName}
                        taskDescription={task.taskDescription}
                        taskDueDate={task.taskDueDate}
                        taskPriority={task.taskPriority}
                        taskDifficulty={task.taskDifficulty}
                      />
                    </ListItemSecondaryAction>
                  ) : null}
                </ListItem>
              );
            })}

            <TablePagination
              data-testid="task-history-pagination"
              component="div"
              rowsPerPageOptions={
                tabletView ? 5 : [5, 10, 15, { label: "All", value: -1 }]
              }
              labelRowsPerPage={tabletView ? "" : "Tasks per page"}
              colSpan={12}
              count={tasks.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                  "data-testid": "rows-per-page",
                },
                native: true,
              }}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleTasksPerPageChange}
            />
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
