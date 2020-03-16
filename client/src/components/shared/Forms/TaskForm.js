import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Field } from "formik";
import { withStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Theme from "../../shared/Theme/Theme";

const Title = withStyles(theme => ({
  root: {
    flex: "1 1 100%",
    backgroundColor: `${Theme.colors.first}`,
    color: `${Theme.colors.white}`,
    padding: `1rem`
  }
}))(Typography);

const AddButton = styled(Button)({
  backgroundColor: `${Theme.colors.first}`,
  color: `${Theme.colors.white}`,
  marginTop: "2.5rem",

  "&:hover": {
    backgroundColor: `${Theme.colors.fourth}`
  },
  "&:disabled": {
    backgroundColor: `${Theme.colors.disabled}`
  }
});

const CancelButton = styled(Button)({
  backgroundColor: `${Theme.colors.third}`,
  color: `${Theme.colors.black}`,
  marginTop: "1rem",
  width: "100%",

  "&:hover": {
    backgroundColor: `${Theme.colors.fifth}`
  }
});

function TaskForm({
  title,
  values,
  touched,
  errors,
  handleSubmit,
  handleChange,
  handleBlur,
  setFieldValue,
  isValid,
  routeBack
}) {
  return (
    <form
      onSubmit={handleSubmit}
      data-testid={`${title} form`}
      autoComplete="off"
    >
      <Title variant="h6" id={title}>
        {title}
      </Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem"
        }}
      >
        <Field
          as={TextField}
          required
          id="standard-required"
          name="taskName"
          label="Name"
          data-testid="task-name"
          value={values.taskName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.taskName && touched.taskName)}
          helperText={
            errors.taskName && touched.taskName && String(errors.taskName)
          }
        />

        <Field
          as={TextField}
          id="standard-textarea"
          name="taskDescription"
          label="Description"
          data-testid="task-description"
          rows="5"
          multiline
          value={values.taskDescription}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.taskDescription && touched.taskDescription)}
          helperText={
            errors.taskDescription &&
            touched.taskDescription &&
            String(errors.taskDescription)
          }
        />

        <Field
          as={KeyboardDatePicker}
          disableToolbar
          required
          id="date-picker-inline"
          name="taskDueDate"
          label="Due Date"
          data-testid="task-due-date"
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          value={new Date(values.taskDueDate)}
          onChange={date => setFieldValue("taskDueDate", Date.parse(date))}
          minDate={new Date()}
          KeyboardButtonProps={{ "aria-label": "change due date" }}
          error={Boolean(errors.taskDueDate && touched.taskDueDate)}
          helperText={
            errors.taskDueDate &&
            touched.taskDueDate &&
            "You must choose a valid date."
          }
        />

        <FormControl
          required
          error={Boolean(errors.taskPriority && touched.taskPriority)}
        >
          <InputLabel id="priority-select-label">Priority</InputLabel>
          <Field
            as={Select}
            required
            labelId="priority-select-label"
            id="priority-select"
            name="taskPriority"
            data-testid="task-priority"
            value={values.taskPriority}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Field>
          {errors.taskPriority && touched.taskPriority && (
            <FormHelperText>{String(errors.taskPriority)}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          required
          error={Boolean(errors.taskDifficulty && touched.taskDifficulty)}
        >
          <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
          <Field
            as={Select}
            required
            labelId="difficulty-select-label"
            id="difficulty-select"
            name="taskDifficulty"
            data-testid="task-difficulty"
            value={values.taskDifficulty}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </Field>
          {errors.taskDifficulty && touched.taskDifficulty && (
            <FormHelperText>{String(errors.taskDifficulty)}</FormHelperText>
          )}
        </FormControl>

        <AddButton
          variant="contained"
          type="submit"
          disabled={!isValid}
          onClick={routeBack}
        >
          {title === "Add a Task" ? "Add Task" : "Edit Task"}
        </AddButton>

        <CancelButton onClick={routeBack}>Go back</CancelButton>
      </div>
    </form>
  );
}

export default TaskForm;
