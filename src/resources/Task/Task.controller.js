const Task = require("./Task.model");

/**
 * GET /api/tasks
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.taskList = (req, res, next) => {
  Task.find({}, (err, tasks) => {
    res.send({ tasks: tasks });
  });
};

/**
 * GET /api/tasks/id
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.taskDetail = (req, res, next) => {
  Task.findOne({ _id: req.params.id }, err => {
    if (err) {
      res
        .status(500)
        .send(
          "Error occured trying to find a task. Please check if the infromation is correct."
        );
    }
  })
    .then(task => res.json(task))
    .catch(next);
};

/**
 * GET /api/tasks/add
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.addTask_get = (req, res, next) => {
  // TODO GET logic for adding a task
};

/**
 * POST /api/tasks/add
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.addTask_post = (req, res, next) => {
  const newTask = new Task({
    userId: req.body.userId,
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    taskCreateDate: req.body.taskCreateDate,
    taskUpdateDate: req.body.taskUpdateDate,
    taskDueDate: req.body.taskDueDate,
    taskPriority: req.body.taskPriority,
    taskDifficulty: req.body.taskDifficulty,
    isTaskComplete: req.body.isTaskComplete,
    isTaskSuggested: req.body.isTaskSuggested
  });

  newTask
    .save(err => {
      if (err) {
        res
          .status(500)
          .send(
            "Error occured while trying to add a task. Please check if the information is correct"
          );
      }
    })
    .then(task => res.json(task))
    .catch(next);
};

/**
 * GET /api/tasks/id/edit
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.editTask_get = (req, res, next) => {
  // TODO GET logic for updating a task
};

/**
 * POST /api/tasks/id/edit
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.editTask_post = (req, res, next) => {
  // TODO POST logic for updating a task
};

/**
 * GET /api/tasks/id/delete
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.deleteTask_get = (req, res, next) => {
  // TODO GET logic for deleting a task
};

/**
 * POST /api/tasks/id/delete
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.deleteTask_post = (req, res, next) => {
  // TODO POST logic for deleting a task
};
