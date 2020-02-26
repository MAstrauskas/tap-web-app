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
  TablePagination,
  Typography,
  useMediaQuery
} from "@material-ui/core";

import DoneIcon from "@material-ui/icons/Done";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: { paddingLeft: "2rem", paddingRight: "2rem" },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  inline: {
    display: "inline"
  },
  completedTasks: {
    display: "flex",
    flexDirection: "column"
  },
  list: {
    width: "100%"
  },
  tableFooter: {
    display: "flex",
    justifyContent: "end"
  }
}));

export default function TaskHistory({ tasks }) {
  const classes = useStyles();
  const tabletView = useMediaQuery("(max-width: 960px)");
  const mobileView = useMediaQuery("(max-width: 600px)");

  let listSize = "710px";

  if (tabletView) {
    listSize = "350px";
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleTasksPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        <ExpansionPanelDetails className={classes.completedTasks}>
          <List dense={true} className={classes.list}>
            {(rowsPerPage > 0
              ? tasks.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tasks
            ).map(task => {
              return (
                <ListItem key={task._id}>
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

            <TablePagination
              component="div"
              count={tasks.length}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
              labelRowsPerPage={mobileView ? "" : "Tasks per page"}
              page={page}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleTasksPerPageChange}
            />
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
