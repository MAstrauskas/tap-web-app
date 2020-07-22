import React, { useState } from "react";
import moment from "moment";
import { makeStyles, withStyles, styled } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Theme from "../../shared/Theme/Theme";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${Theme.colors.white}`,
    boxShadow: theme.shadows[5],
    padding: "0 0",
  },
  title: {
    backgroundColor: `${Theme.colors.first}`,
    color: `${Theme.colors.white}`,
    flex: "1 1 100%",
    padding: `1rem`,
  },
}));

const Title = withStyles(() => ({
  root: {
    flex: "1 1 100%",
    backgroundColor: `${Theme.colors.first}`,
    color: `${Theme.colors.white}`,
    padding: `1rem`,
  },
}))(Typography);

const CancelButton = styled(Button)({
  backgroundColor: `${Theme.colors.third}`,
  color: `${Theme.colors.black}`,
  marginTop: "1rem",
  width: "100%",

  "&:hover": {
    backgroundColor: `${Theme.colors.fifth}`,
  },
});

export default function TaskDetails({
  message,
  taskName,
  taskDescription,
  taskDueDate,
  taskPriority,
  taskDifficulty,
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
        data-testid="task-details-button"
        onClick={handleOpenDetails}
        size="small"
        style={{
          backgroundColor: `${Theme.colors.gray}`,
          color: `${Theme.colors.white}`,
          "&:hover": {
            backgroundColor: `${Theme.colors.fourth}`,
          },
        }}
      >
        {message === taskName && message.length > 7
          ? message.substring(0, 7) + "..."
          : message}
      </Button>

      <Modal
        data-testid="completed-task-details"
        aria-labelledby="Completed-task-details"
        aria-describedby="All the details of completed task"
        className={classes.modal}
        open={openDetails}
        onClose={handleCloseDetails}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
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
                padding: "2rem 4rem",
              }}
            >
              <TextField
                margin="normal"
                multiline
                id="standard-required"
                name="taskName"
                label="Name"
                data-testid="task-name"
                value={taskName}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                margin="normal"
                id="standard-textarea"
                name="taskDescription"
                label="Description"
                data-testid="task-description"
                multiline={taskDescription.length > 0}
                value={taskDescription.length > 0 ? taskDescription : "N/A"}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                margin="normal"
                id="date-picker-inline"
                name="taskDueDate"
                label="Due Date"
                data-testid="task-due-date"
                value={moment(taskDueDate).format("LL")}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                margin="normal"
                labelId="priority-select-label"
                id="priority-select"
                name="taskPriority"
                label="Priority"
                data-testid="task-priority"
                value={taskPriority}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                margin="normal"
                labelId="difficulty-select-label"
                id="difficulty-select"
                name="taskDifficulty"
                label="Difficulty"
                data-testid="task-difficulty"
                value={taskDifficulty}
                InputProps={{
                  readOnly: true,
                }}
              />

              <CancelButton
                data-testid="close-task-details-button"
                onClick={handleCloseDetails}
              >
                Close details
              </CancelButton>
            </div>
          </form>
        </Fade>
      </Modal>
    </>
  );
}
