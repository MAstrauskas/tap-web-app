import React, { useState } from "react";
import moment from "moment";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Theme from "../../shared/Theme/Theme";
import { styled } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${Theme.colors.white}`,
    boxShadow: theme.shadows[5],
    padding: "0 0"
  },
  title: {
    backgroundColor: `${Theme.colors.first}`,
    color: `${Theme.colors.white}`,
    flex: "1 1 100%",
    padding: `1rem`
  },
  eachDetail: {
    padding: "1rem auto",
    "& > div": {
      color: `${Theme.colors.black} !important`
    }
  }
}));

const Title = withStyles(theme => ({
  root: {
    flex: "1 1 100%",
    backgroundColor: `${Theme.colors.first}`,
    color: `${Theme.colors.white}`,
    padding: `1rem`
  }
}))(Typography);

export default function TaskDetails({
  message,
  taskName,
  taskDescription,
  taskDueDate,
  taskPriority,
  taskDifficulty
}) {
  const classes = useStyles();
  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenDetails}
        size="small"
        style={{
          backgroundColor: `${Theme.colors.gray}`,
          color: `${Theme.colors.white}`,
          "&:hover": {
            backgroundColor: `${Theme.colors.fourth}`
          }
        }}
      >
        {message === taskName && message.length > 7
          ? message.substring(0, 7) + "..."
          : message}
      </Button>

      <Modal
        aria-labelledby="Completed-task-details"
        aria-describedby="All the details of completed task"
        className={classes.modal}
        open={openDetails}
        onClose={handleCloseDetails}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openDetails}>
          <form
            data-testid="task-details"
            autoComplete="off"
            className={classes.paper}
          >
            <Title variant="h6" id="task-details">
              Task Details
            </Title>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "2rem 4rem"
              }}
            >
              <TextField
                margin="normal"
                className={classes.eachDetail}
                multiline
                id="standard-required"
                name="taskName"
                label="Name"
                data-testid="task-name"
                value={taskName}
                disabled
              />

              <TextField
                margin="normal"
                className={classes.eachDetail}
                id="standard-textarea"
                name="taskDescription"
                label="Description"
                data-testid="task-description"
                multiline={taskDescription.length > 0 ? true : false}
                value={taskDescription.length > 0 ? taskDescription : "N/A"}
                disabled
              />

              <TextField
                margin="normal"
                className={classes.eachDetail}
                id="date-picker-inline"
                name="taskDueDate"
                label="Due Date"
                data-testid="task-due-date"
                value={moment(taskDueDate).format("LL")}
                disabled
              />

              <TextField
                margin="normal"
                className={classes.eachDetail}
                labelId="priority-select-label"
                id="priority-select"
                name="taskPriority"
                label="Priority"
                data-testid="task-priority"
                value={taskPriority}
                disabled
              />

              <TextField
                margin="normal"
                className={classes.eachDetail}
                labelId="difficulty-select-label"
                id="difficulty-select"
                name="taskDifficulty"
                label="Difficulty"
                data-testid="task-difficulty"
                value={taskDifficulty}
                disabled
              />
            </div>
          </form>
        </Fade>
      </Modal>
    </>
  );
}
