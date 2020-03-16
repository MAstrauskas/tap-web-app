import React from "react";
import { useMediaQuery } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import MobileAddButtons from "../shared/MobileAddButtons";

export default function FAQ() {
  const mobileView = useMediaQuery("(max-width: 800px)");

  return (
    <div style={{ minWidth: "10rem", maxWidth: "60rem" }}>
      <Typography variant="h4" component="h4" gutterBottom>
        How does this app work?
      </Typography>
      <Typography variant="body1" gutterBottom>
        In this application, you can manage your own tasks the way you want it.
        Every task is added to the 'All Tasks' page which you can find in the
        side navigation. Once you add some tasks, they will be sorted by date &
        priority. To see the suggested tasks, you need to add a mood so that the
        application knows what to suggest.
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        style={{ paddingTop: "1rem" }}
      >
        Why do I need to input my mood?
      </Typography>
      <Typography variant="body1" gutterBottom>
        To show the most accurate suggested tasks, you should let the system
        know how you are feeling each day by answering three simple questions in
        the 'Moodist' form that you can access from the side navigation or a
        button below (if you're on mobile). Once you input your mood, the system
        starts doing some calculations (takes into consideration your tasks &
        answers from the 'Moodist') that will determine what kind of tasks will
        be suggested to you. You can change your mood as many times as you like
        as the system will re-calculate the suggestions for you.
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        style={{ paddingTop: "1rem" }}
      >
        Do I need to input my mood every time I login?
      </Typography>
      <Typography variant="body1" gutterBottom>
        No, you don't need to input your mood every time you log in. The system
        will offer you to input the mood once every day (1st time you log in).
        After that, it's up to you to decide whether you want to change your
        mood or not.
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        style={{ paddingTop: "1rem" }}
      >
        Do I need to input my mood first and then add tasks or vice versa?
      </Typography>
      <Typography variant="body1" gutterBottom>
        You should add your tasks first and then add your mood details in order
        to make the application work at its best.
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        style={{ paddingTop: "1rem" }}
      >
        Where can I see my completed tasks?
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can see your completed tasks in the 'Summary' page of the app by
        accessing it through the side navigation. There will be an 'All
        Completed Tasks' expandable list in which you can check all the details
        of the previous tasks.
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        style={{ paddingTop: "1rem" }}
      >
        Where can I see my deleted tasks?
      </Typography>
      <Typography variant="body1">
        Unfortunately, once you delete a task - it's gone forever. That's why we
        ask you twice before you delete any task.
      </Typography>

      {mobileView && <MobileAddButtons />}
    </div>
  );
}
