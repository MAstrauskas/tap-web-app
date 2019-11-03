const Task = require("./Task.model");

/**
 * GET /api/tasks
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
export async function taskList(req, res, next) {
  // TODO All task logic
}

/**
 * GET /api/tasks/id
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
export async function taskDetail(req, res, next) {
  // TODO One Task logic
}

/**
 * GET /api/tasks.add
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
export async function addTask_get(req, res, next) {
  // TODO GET logic for adding a task
}

/**
 * POST /api/tasks/add
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
export async function addTask_post(req, res, next) {
  // TODO POST logic for adding a task
}

/**
 * GET /api/tasks/id/edit
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
export async function editTask_get(req, res, next) {
  // TODO GET logic for updating a task
}

/**
 * POST /api/tasks/id/edit
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
export async function editTask_post(req, res, next) {
  // TODO POST logic for updating a task
}

/**
 * GET /api/tasks/id/delete
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
export async function deleteTask_get(req, res, next) {
  // TODO GET logic for deleting a task
}

/**
 * POST /api/tasks/id/delete
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
export async function deleteTask_post(req, res, next) {
  // TODO POST logic for deleting a task
}
