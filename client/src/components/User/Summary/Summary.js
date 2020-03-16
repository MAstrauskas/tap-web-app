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

export default function Summary({ userEmail }) {
  const classes = useStyles();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState([]);
  const mobileView = useMediaQuery("(max-width: 800px)");

  useEffect(() => {
    const handleCompleteTasks = async () => {
      await axios.get(`/api/tasks/${userEmail}`).then(res => {
        setCompletedTasks([
          ...res.data.tasks.filter(task => task.isTaskComplete)
        ]);
      });
    };

    const handleTotalTasks = async () => {
      await axios.get(`/api/tasks/${userEmail}`).then(res => {
        setTotalTasks([...res.data.tasks]);
      });
    };

    handleCompleteTasks();
    handleTotalTasks();
  }, [userEmail]);

  const completedTasksToday = completedTasks.filter(task => {
    const taskCompleteDate = new Date(task.taskCompleteDate);
    const todaysDate = new Date();

    return (
      taskCompleteDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)
    );
  }).length;
  const completedTasksWeek = completedTasks.filter(task => {
    const taskCompleteDate = new Date(task.taskCompleteDate).setHours(
      0,
      0,
      0,
      0
    );
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
  const completedTasksTotal = completedTasks.length;
  const unfinishedTasks = totalTasks.length - completedTasksTotal;

  return (
    <div className={classes.root}>
      <div className={classes.cards}>
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
      <TaskHistory tasks={completedTasks} />

      {mobileView && <MobileAddButtons />}
    </div>
  );
}
