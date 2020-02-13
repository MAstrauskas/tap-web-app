const sinon = require("sinon");
const sinonTest = require("sinon-test");
const test = sinonTest(sinon);

const TaskController = require("../Task.controller");
const Task = require("../Task.model");

describe("Task Controller", () => {
  let req = {
    params: { email: "__EMAIL__" },
    expectedResult: [
      {
        _id: "__ID__",
        email: "__EMAIL__",
        taskName: "__NAME__",
        taskDescription: "__DESCRIPTION__",
        taskCreateDate: "__DATE__",
        taskDueDate: "__DATE__",
        taskPriority: "__PRIORITY__",
        taskDifficulty: "__DIFFICULTY__",
        isTaskComplete: false,
        isTaskSuggested: true,
        taskGroup: 3,
        taskTotalPoints: 1.75
      }
    ]
  };

  beforeEach(() => {
    res = {
      status: sinon.stub().returns({ end: sinon.spy() }),
      send: sinon.spy(),
      json: sinon.spy()
    };
  });

  it(
    "should get task list from the database",
    test(function() {
      expectedResult = req.expectedResult;
      this.stub(Task, "find").yields(null, expectedResult);

      TaskController.taskList(req, res);

      sinon.assert.calledWith(Task.find, req.params);
      sinon.assert.calledWith(res.send, sinon.match.object);
      sinon.assert.calledWith(
        res.send,
        sinon.match({
          tasks: [
            {
              _id: "__ID__",
              email: "__EMAIL__",
              taskName: "__NAME__",
              taskDescription: "__DESCRIPTION__",
              taskCreateDate: "__DATE__",
              taskDueDate: "__DATE__",
              taskPriority: "__PRIORITY__",
              taskDifficulty: "__DIFFICULTY__",
              isTaskComplete: false,
              isTaskSuggested: true,
              taskGroup: 3,
              taskTotalPoints: 1.75
            }
          ]
        })
      );
    })
  );

  it(
    "should get 1 task from the database",
    test(function() {
      req.params = { id: "__ID__" };
      expectedResult = req.expectedResult;
      this.stub(Task, "findOne").yields(null, expectedResult);

      TaskController.taskDetail(req, res);

      sinon.assert.calledWith(Task.findOne, { _id: req.params.id });
      sinon.assert.calledWith(res.json, sinon.match.array);
      sinon.assert.calledWith(
        res.json,
        sinon.match([
          {
            _id: "__ID__",
            email: "__EMAIL__",
            taskName: "__NAME__",
            taskDescription: "__DESCRIPTION__",
            taskCreateDate: "__DATE__",
            taskDueDate: "__DATE__",
            taskPriority: "__PRIORITY__",
            taskDifficulty: "__DIFFICULTY__",
            isTaskComplete: false,
            isTaskSuggested: true,
            taskGroup: 3,
            taskTotalPoints: 1.75
          }
        ])
      );
    })
  );

  it(
    "should create a task in the database",
    test(function() {
      req.body = {
        email: "__EMAIL__",
        taskName: "__NAME__",
        taskDescription: "__DESCRIPTION__",
        taskCreateDate: "__DATE__",
        taskDueDate: "__DATE__",
        taskUpdateDate: "__DATE__",
        taskPriority: "__PRIORITY__",
        taskDifficulty: "__DIFFICULTY__",
        isTaskComplete: false,
        isTaskSuggested: true
      };

      expectedResult = req.expectedResult;
      this.stub(Task, "create").yields(null, req.body);

      TaskController.addTask_post(req, res);

      sinon.assert.calledWith(Task.create, req.body);
      sinon.assert.calledWith(
        res.send,
        sinon.match("Task has been added - " + `"${req.body.taskName}"`)
      );
    })
  );

  it(
    "should edit a task in the database",
    test(function() {
      req.body = {
        email: "__EMAIL__",
        taskName: "__NAME__",
        taskDescription: "__DESCRIPTION__",
        taskCreateDate: "__DATE__",
        taskDueDate: "__DATE__",
        taskUpdateDate: "__DATE__",
        taskPriority: "__PRIORITY__",
        taskDifficulty: "__DIFFICULTY__",
        isTaskComplete: false,
        isTaskSuggested: true
      };
      req.params = { id: "__ID__" };

      expectedResult = req.body;
      this.stub(Task, "findByIdAndUpdate").yields(null, req.body);

      TaskController.editTask_post(req, res);

      sinon.assert.calledWith(res.send, sinon.match("Task has been updated."));
    })
  );

  it(
    "should find completed tasks from the database",
    test(function() {
      req.params = { id: "__ID__" };
      expectedResult = req.body;
      this.stub(Task, "find").yields(null, { isTaskComplete: true });

      TaskController.tasksCompleted_get(req, res);

      sinon.assert.calledWith(Task.find, { isTaskComplete: true });
      sinon.assert.calledWith(
        res.send,
        sinon.match({ tasks: { isTaskComplete: true } })
      );
    })
  );

  it(
    "should add a completed task to the database",
    test(function() {
      const data = {
        isTaskComplete: true,
        taskUpdateDate: "__DATE__"
      };

      req.body.id = "__ID__";

      expectedResult = req.body;

      this.stub(Task, "findByIdAndUpdate").yields(null, data);

      TaskController.tasksCompleted_add(req, res);

      sinon.assert.calledWith(res.send, sinon.match("Task has been updated."));
    })
  );
});
