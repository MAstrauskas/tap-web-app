const axios = require("axios");

// Job that clears all of the users
// moods and suggested tasks at midnight
// each day. This way we can reset
// the suggestion and mood systems
// so that the users can add a new
// mood and get new suggested tasks
// each day.
const clearMood = async () => {
  await axios.get("https://ma738-tap.herokuapp.com/api/admin/clear-mood");
};

const clearSuggestedTasks = async () => {
  await axios.post("https://ma738-tap.herokuapp.com/api/admin/clear-suggest");
};

clearMood();
clearSuggestedTasks();
