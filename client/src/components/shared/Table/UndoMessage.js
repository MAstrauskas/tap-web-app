import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function UndoMessage({ open, handleClose, handleUndo }) {
  return (
    <Snackbar
      data-testid="undo-message"
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      message="Task completed"
      action={
        <Fragment>
          <Button
            data-testid="undo-button"
            color="secondary"
            size="small"
            onClick={handleUndo}
          >
            UNDO
          </Button>
          <IconButton
            data-testid="close-undo-message"
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Fragment>
      }
    />
  );
}
