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
  defaultHeader,
  secondHeader,
  defaultTitle,
  secondTitle,
  thirdTitle,
  showButtons,
  defaultOption,
  secondOption,
  thirdOption
}) {
  const classes = useStyles();
  const [currentTitle, setCurrentTitle] = useState(defaultTitle);
  const [currentNumber, setCurrentNumber] = useState(defaultOption);

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
            {defaultHeader}
          </Typography>
          <Typography variant="h5" component="h2">
            {currentTitle}
          </Typography>
          <Typography variant="h2" component="p" align="right">
            {currentNumber === 0 ? defaultOption : currentNumber}
          </Typography>
        </CardContent>
        <CardActions>
          {showButtons === true ? (
            <>
              <Button
                onClick={() => handleCurrentView(defaultTitle, defaultOption)}
              >
                Today
              </Button>
              <Button
                onClick={() => handleCurrentView(secondTitle, secondOption)}
              >
                Week
              </Button>
              <Button
                onClick={() => handleCurrentView(thirdTitle, thirdOption)}
              >
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
