import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

import SummaryCard from "../../shared/Card";
import TaskHistory from "./TaskHistory";
import MobileAddButtons from "../../shared/MobileAddButtons";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  cards: {
    display: "flex",
    [theme.breakpoints.down("sm")]: { flexDirection: "column" }
  },
  card: {
    padding: "2rem"
  }
}));

export const getCompletedTasksForToday = tasks => {
  const completedTasks = tasks.filter(task => {
    const taskCompleteDate = moment(task.taskCompleteDate);
    const todaysDate = moment();
    const daysDifference = todaysDate.diff(taskCompleteDate, "days");

    return daysDifference === 0 ? task : null;
  }).length;

  return completedTasks;
};

export const getCompletedTasksForThisWeek = tasks => {
  const completedTasks = tasks.filter(task => {
    const taskCompleteDate = moment(task.taskCompleteDate);
    const weekStart = moment()
      .startOf("week")
      .toDate();
    const weekEnd = moment()
      .endOf("week")
      .toDate();

    weekStart.setDate(weekStart.getDate() + 1);
    weekEnd.setDate(weekEnd.getDate() + 1);

    return taskCompleteDate >= weekStart && taskCompleteDate <= weekEnd;
  }).length;

  return completedTasks;
};

export default function Summary({ userEmail, token }) {
  const classes = useStyles();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState([]);
  const mobileView = useMediaQuery("(max-width: 800px)");

  useEffect(() => {
    const handleCompleteTasks = async () => {
      await axios
        .get(`/api/tasks/${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setCompletedTasks([
            ...res.data.tasks.filter(task => task.isTaskComplete)
          ]);
        });
    };

    const handleTotalTasks = async () => {
      await axios
        .get(`/api/tasks/${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setTotalTasks([...res.data.tasks]);
        });
    };

    handleCompleteTasks();
    handleTotalTasks();
  }, [userEmail, token]);

  const completedTasksToday = getCompletedTasksForToday(completedTasks);
  const completedTasksWeek = getCompletedTasksForThisWeek(completedTasks);
  const completedTasksTotal = completedTasks.length;
  const unfinishedTasks = totalTasks.length - completedTasksTotal;

  return (
    <div className={classes.root}>
      <div className={classes.cards} data-testid="summary-cards">
        <div className={classes.card}>
          <SummaryCard
            type="success"
            color="success"
            defaultHeader="Completed tasks"
            secondHeader=""
            defaultTitle="Today"
            secondTitle="This Week"
            thirdTitle="Total"
            showButtons={true}
            defaultOption={completedTasksToday}
            secondOption={completedTasksWeek}
            thirdOption={completedTasksTotal}
          />
        </div>
        <div className={classes.card}>
          <SummaryCard
            type="info"
            color="info"
            defaultHeader="Unfinished tasks"
            secondHeader="Points earned"
            defaultTitle="Total"
            secondTitle="Total points"
            thirdTitle=""
            showButtons={false}
            defaultOption={unfinishedTasks}
            secondOption={0}
          />
        </div>
      </div>
      <div data-testid="task-history">
        <TaskHistory tasks={completedTasks} />
      </div>

      {mobileView && <MobileAddButtons />}
    </div>
  );
}
