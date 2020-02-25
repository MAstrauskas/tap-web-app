import React from "react";
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
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
