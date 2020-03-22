import React from "react";
import { Field } from "formik";
import { withStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

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

function MoodForm({
  title,
  values,
  touched,
  errors,
  handleSubmit,
  handleChange,
  handleBlur,
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
        <Typography id="mood" gutterBottom>
          How are you feeling? *
        </Typography>

        <RadioGroup
          aria-label="mood"
          required
          name="mood"
          value={values.mood}
          onChange={handleChange}
          onBlur={handleBlur}
          row
          style={{ justifyContent: "space-around" }}
        >
          <FormControlLabel
            value="negative"
            control={<Radio />}
            label={<SentimentVeryDissatisfiedIcon />}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="neutral"
            control={<Radio />}
            label={<SentimentSatisfiedIcon />}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="positive"
            control={<Radio />}
            label={<SentimentVerySatisfiedIcon />}
            labelPlacement="bottom"
          />
        </RadioGroup>

        <FormControl
          required
          error={Boolean(errors.moodMotivation && touched.moodMotivation)}
          style={{ paddingBottom: "1rem" }}
        >
          <InputLabel id="motivation-select-label">Motivation</InputLabel>
          <Field
            as={Select}
            required
            labelId="motivation-select-label"
            id="motivation-select"
            name="moodMotivation"
            data-testid="mood-motivation"
            value={values.moodMotivation}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="Low">Low - I have no motivation</MenuItem>
            <MenuItem value="Medium">Medium - I want to do something</MenuItem>
            <MenuItem value="High">High - bring it on!</MenuItem>
          </Field>
          {errors.moodMotivation && touched.moodMotivation && (
            <FormHelperText>{String(errors.moodMotivation)}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          required
          error={Boolean(errors.moodTired && touched.moodTired)}
        >
          <InputLabel id="mood-tired-select-label">Are you tired?</InputLabel>
          <Field
            as={Select}
            required
            labelId="mood-tired-select-label"
            id="mood-tired-select"
            name="moodTired"
            data-testid="mood-tired"
            value={values.moodTired}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Field>
          {errors.moodTired && touched.moodTired && (
            <FormHelperText>{String(errors.moodTired)}</FormHelperText>
          )}
        </FormControl>

        <AddButton variant="contained" type="submit" disabled={!isValid}>
          Add Mood
        </AddButton>

        <CancelButton onClick={routeBack}>Go back</CancelButton>
      </div>
    </form>
  );
}

export default MoodForm;
