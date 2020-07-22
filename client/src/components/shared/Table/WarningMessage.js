import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Typography } from "@material-ui/core";
import Theme from "../Theme/Theme";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  buttons: {
    marginLeft: "auto",
  },
}));

export default function WarningMessage({
  open,
  task,
  taskId,
  handleDelete,
  handleClose,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="warning-message">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key="center-center"
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <div>
          <MuiAlert elevation={6} variant="filled" severity="warning">
            <Typography>
              Are you sure you want to delete
              <span style={{ color: `${Theme.colors.fourth}` }}> {task}</span>?
            </Typography>
            <div className={classes.buttons}>
              <Button
                data-testid="warning-button-yes"
                style={{ color: `${Theme.colors.fourth}` }}
                size="small"
                onClick={() => {
                  handleDelete(taskId);
                  handleClose();
                }}
              >
                Yes
              </Button>
              <Button
                data-testid="warning-button-no"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                No
              </Button>
            </div>
          </MuiAlert>
        </div>
      </Snackbar>
    </div>
  );
}
