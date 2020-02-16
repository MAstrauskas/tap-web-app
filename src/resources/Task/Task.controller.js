const Task = require("./Task.model");
const TaskSuggester = require("./helpers/TaskSuggester");

/**
 * GET /api/tasks
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.taskList = (req, res, next) => {
  Task.find({ email: req.params.email }, (err, tasks) => {
    TaskSuggester.calculateTaskSuggestion(req.params.email, tasks);
    TaskSuggester.makeTaskSuggested(req.params.email, tasks);

    res.send({ tasks: tasks });
  }).catch(next);
};

/**
 * GET /api/tasks/id
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.taskDetail = (req, res, next) => {
  Task.findOne({ _id: req.params.id }, function(err, task) {
    if (err) {
      res
        .status(500)
        .send(
          "Error occured trying to find a task. Please check if the information is correct."
        );
    }

    return res.json(task);
  });
};

/**
 * POST /api/tasks/add
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.addTask_post = async (req, res, next) => {
  const body = await {
    email: req.body.email,
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    taskCreateDate: req.body.taskCreateDate,
    taskUpdateDate: req.body.taskUpdateDate,
    taskDueDate: req.body.taskDueDate,
    taskPriority: req.body.taskPriority,
    taskDifficulty: req.body.taskDifficulty,
    isTaskComplete: req.body.isTaskComplete,
    isTaskSuggested: req.body.isTaskSuggested
  };

  await Task.create(body, function(err, task) {
    if (err) {
      res
        .status(500)
        .send(
          "Error occured while trying to add a task. Please check if the information is correct"
        );
    }

    res.send("Task has been added - " + `"${task.taskName}"`);
  });
};

/**
 * PUT /api/tasks/edit/id
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.editTask_post = (req, res, next) => {
  let taskId = req.params.id;

  const data = {
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    taskUpdateDate: req.body.taskUpdateDate,
    taskDueDate: req.body.taskDueDate,
    taskPriority: req.body.taskPriority,
    taskDifficulty: req.body.taskDifficulty,
    isTaskComplete: req.body.isTaskComplete,
    isTaskSuggested: req.body.isTaskSuggested
  };

  Task.findByIdAndUpdate(taskId, data, (err, task) => {
    if (err) {
      res
        .status(500)
        .send(
          "Error occured while trying to edit a task. Please check if the information is correct"
        );
    }

    res.send("Task has been updated.");
  });
};

/**
 * POST /api/tasks/delete/id
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.deleteTask_post = async (req, res, next) => {
  const resultMessage = await Task.findByIdAndDelete(req.params.id)
    .then(() => console.log(req))
    .catch(next);

  res.json({ resultMessage });
};

/**
 * GET /api/tasks/completed/all
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.tasksCompleted_get = (req, res, next) => {
  Task.find({ isTaskComplete: true }, (err, tasks) => {
    res.send({ tasks: tasks });
  });
};

/**
 * PATCH /api/tasks/completed
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.tasksCompleted = (req, res, next) => {
  let taskId = req.body.id;

  const data = {
    isTaskComplete: req.body.isTaskComplete,
    taskUpdateDate: req.body.taskUpdateDate
  };

  Task.findByIdAndUpdate(taskId, data, (err, task) => {
    if (err) {
      res
        .status(500)
        .send(
          "Error occured while trying to add a task to completed list Please check if the information is correct"
        );
    }

    res.send("Task has been updated.");
  });
};
