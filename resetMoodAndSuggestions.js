const axios = require("axios");

// Job that clears all of the users
// moods and suggested tasks at midnight
// each day. This way we can reset
// the suggestion and mood systems
// so that the users can add a new
// mood and get new suggested tasks
// each day.
const clearMood = async () => {
  await axios.get(
    "https://aqueous-sierra-33243.herokuapp.com/api/user/clearMood"
  );
};

const clearSuggestedTasks = async () => {
  await axios.post(
    "https://aqueous-sierra-33243.herokuapp.com/api/tasks/clear-suggest"
  );
};

clearMood();
clearSuggestedTasks();
