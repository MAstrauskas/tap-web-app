import Task from "./Task.model";
import {
  calculateTaskSuggestion,
  makeTaskSuggested
} from "./helpers/TaskSuggester";

/**
 * GET /api/tasks
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.taskList = (req, res, next) => {
  Task.find({ email: req.params.email }, (err, tasks) => {
    res.send({ tasks: tasks });
  }).catch(next);
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
    } else {
      res.send("Task has been added - " + `"${task.taskName}"`);
    }
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
    } else {
      res.send("Task has been updated.");
    }
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
  await Task.findByIdAndDelete(req.params.id)
    .then(() => res.send("Task deleted."))
    .catch(() => res.status(500).send("Error occured deleting a task."));
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
  const today = new Date();

  const data = {
    isTaskComplete: req.body.isTaskComplete,
    isTaskSuggested: req.body.isTaskSuggested,
    taskUpdateDate: req.body.taskUpdateDate,
    taskCompleteDate: today
  };

  Task.findByIdAndUpdate(taskId, data, (err, task) => {
    if (err) {
      res
        .status(500)
        .send(
          "Error occured while trying to add a task to completed list. Please check if the information is correct."
        );
    } else {
      res.send("Task has been updated.");
    }
  });
};

/**
 * GET /api/tasks/calculate-suggest
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.taskCalculateSuggest = (req, res, next) => {
  Task.find({ email: req.params.email }, async (err, tasks) => {
    await calculateTaskSuggestion(req.params.email, tasks);

    await res.send({ tasks: tasks });
  }).catch(next);
};

/**
 * GET /api/tasks/make-suggest
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.taskMakeSuggest = (req, res, next) => {
  Task.find({ email: req.params.email }, async (err, tasks) => {
    await makeTaskSuggested(req.params.email, tasks);

    await res.send({ tasks: tasks });
  }).catch(next);
};
