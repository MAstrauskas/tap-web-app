import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Theme from "./Theme/Theme";

const useStyles = makeStyles({
  root: {
    minWidth: 225,
    color: `${Theme.colors.white}`,
    height: 225
  },
  title: {
    fontSize: 14
  }
});

export default function SummaryCard({
  type,
  color,
  header,
  defaultTitle,
  showButtons,
  defaultTasks,
  weekTasks,
  totalTasks
}) {
  const classes = useStyles();
  const [currentTitle, setCurrentTitle] = useState(defaultTitle);
  const [currentNumber, setCurrentNumber] = useState(defaultTasks);

  const handleCurrentView = (title, view) => {
    setCurrentTitle(title);
    setCurrentNumber(view);
  };

  return (
    <Card
      className={classes.root}
      style={{ backgroundColor: "rgb(232, 244, 253)" }}
    >
      <Alert severity={type} color={color}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            {header}
          </Typography>
          <Typography variant="h5" component="h2">
            {currentTitle}
          </Typography>
          <Typography variant="h2" component="p" align="right">
            {currentNumber === 0 ? defaultTasks : currentNumber}
          </Typography>
        </CardContent>
        <CardActions>
          {showButtons === true ? (
            <>
              <Button
                onClick={() => handleCurrentView(defaultTitle, defaultTasks)}
              >
                Today
              </Button>
              <Button onClick={() => handleCurrentView("This Week", weekTasks)}>
                Week
              </Button>
              <Button onClick={() => handleCurrentView("Total", totalTasks)}>
                Total
              </Button>
            </>
          ) : (
            <>
              <Button disabled></Button>
              <Button disabled></Button>
              <Button disabled></Button>
            </>
          )}
        </CardActions>
      </Alert>
    </Card>
  );
}
