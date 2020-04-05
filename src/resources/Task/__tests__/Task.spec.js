import mongoose from "mongoose";
import request from "supertest";
import TaskModel from "../Task.model";
import UserModel from "../../User/User.model";
import app from "../../../app";

describe("Task", () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create a task and add into the database", async () => {
    const taskData = {
      email: "test@gmail.com",
      taskName: "__TASK_NAME__",
      taskDescription: "__TASK_DESCRIPTION__",
      taskCreateDate: new Date("2020-04-01T00:00:00.000Z"),
      taskDueDate: new Date("2020-04-03T00:00:00.000Z"),
      taskPriority: "High",
      taskDifficulty: "Medium",
      isTaskComplete: false,
      isTaskSuggested: false
    };

    const validTask = new TaskModel(taskData);
    const savedTask = await validTask.save();

    expect(savedTask._id).toBeDefined();
    expect(savedTask.email).toBe(taskData.email);
    expect(savedTask.taskName).toBe(taskData.taskName);
    expect(savedTask.taskDescription).toBe(taskData.taskDescription);
    expect(savedTask.taskCreateDate).toBe(taskData.taskCreateDate);
    expect(savedTask.taskDueDate).toBe(taskData.taskDueDate);
    expect(savedTask.taskPriority).toBe(taskData.taskPriority);
    expect(savedTask.taskDifficulty).toBe(taskData.taskDifficulty);
    expect(savedTask.isTaskComplete).toBe(taskData.isTaskComplete);
    expect(savedTask.isTaskSuggested).toBe(taskData.isTaskSuggested);
  });

  it("should get a list of tasks from the database", async () => {
    const taskData = {
      email: "test@gmail.com",
      taskName: "__TASK_NAME_2__",
      taskDescription: "__TASK_DESCRIPTION_2__",
      taskCreateDate: new Date("2020-04-01T00:00:00.000Z"),
      taskDueDate: new Date("2020-04-03T00:00:00.000Z"),
      taskPriority: "High",
      taskDifficulty: "Medium",
      isTaskComplete: false,
      isTaskSuggested: false
    };

    const mockTaskData = [
      {
        email: "test@gmail.com",
        taskName: "__TASK_NAME__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-04-01T00:00:00.000Z",
        taskDueDate: "2020-04-03T00:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false
      },
      {
        email: "test@gmail.com",
        taskName: "__TASK_NAME_2__",
        taskDescription: "__TASK_DESCRIPTION_2__",
        taskCreateDate: "2020-04-01T00:00:00.000Z",
        taskDueDate: "2020-04-03T00:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false
      }
    ];

    const validTask = new TaskModel(taskData);
    await validTask.save();

    const res = await request(app).get(`/api/tasks/${taskData.email}`);

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).tasks[0]).toHaveProperty(
      "email",
      mockTaskData[0].email
    );
    expect(JSON.parse(res.text).tasks[1]).toHaveProperty(
      "email",
      mockTaskData[1].email
    );
    expect(JSON.parse(res.text).tasks[0]).toHaveProperty(
      "taskName",
      mockTaskData[0].taskName
    );
    expect(JSON.parse(res.text).tasks[1]).toHaveProperty(
      "taskName",
      mockTaskData[1].taskName
    );
    expect(JSON.parse(res.text).tasks[0]).toHaveProperty(
      "taskDescription",
      mockTaskData[0].taskDescription
    );
    expect(JSON.parse(res.text).tasks[1]).toHaveProperty(
      "taskDescription",
      mockTaskData[1].taskDescription
    );
    expect(JSON.parse(res.text).tasks[0]).toHaveProperty(
      "taskCreateDate",
      mockTaskData[0].taskCreateDate
    );
    expect(JSON.parse(res.text).tasks[1]).toHaveProperty(
      "taskCreateDate",
      mockTaskData[1].taskCreateDate
    );
    expect(JSON.parse(res.text).tasks[0]).toHaveProperty(
      "taskDueDate",
      mockTaskData[0].taskDueDate
    );
    expect(JSON.parse(res.text).tasks[1]).toHaveProperty(
      "taskDueDate",
      mockTaskData[1].taskDueDate
    );
    expect(JSON.parse(res.text).tasks[0]).toHaveProperty(
      "taskPriority",
      mockTaskData[0].taskPriority
    );
    expect(JSON.parse(res.text).tasks[1]).toHaveProperty(
      "taskPriority",
      mockTaskData[1].taskPriority
    );
    expect(JSON.parse(res.text).tasks[0]).toHaveProperty(
      "taskDifficulty",
      mockTaskData[0].taskDifficulty
    );
    expect(JSON.parse(res.text).tasks[1]).toHaveProperty(
      "taskDifficulty",
      mockTaskData[1].taskDifficulty
    );
    expect(JSON.parse(res.text).tasks[0]).toHaveProperty(
      "isTaskComplete",
      mockTaskData[0].isTaskComplete
    );
    expect(JSON.parse(res.text).tasks[1]).toHaveProperty(
      "isTaskComplete",
      mockTaskData[1].isTaskComplete
    );
    expect(JSON.parse(res.text).tasks[0]).toHaveProperty(
      "isTaskSuggested",
      mockTaskData[0].isTaskSuggested
    );
    expect(JSON.parse(res.text).tasks[1]).toHaveProperty(
      "isTaskSuggested",
      mockTaskData[1].isTaskSuggested
    );
  });

  it("should add a task to the database", async () => {
    const taskData = {
      email: "test@gmail.com",
      taskName: "__TASK_NAME_3__",
      taskDescription: "__TASK_DESCRIPTION_3__",
      taskCreateDate: new Date("2020-04-01T00:00:00.000Z"),
      taskDueDate: new Date("2020-04-03T00:00:00.000Z"),
      taskPriority: "High",
      taskDifficulty: "Medium",
      isTaskComplete: false,
      isTaskSuggested: false
    };

    const res = await request(app)
      .post("/api/tasks/add")
      .send(taskData);

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Task has been added - "__TASK_NAME_3__"');
  });

  it("should throw an error if the format of the request is incorrect when adding a task", async () => {
    const taskData = {
      email: "test@gmail.com",
      taskDueDate: new Date("2020-04-03T00:00:00.000Z"),
      taskPriority: "High",
      taskDifficulty: "Medium",
      isTaskComplete: false,
      isTaskSuggested: false
    };

    const res = await request(app)
      .post("/api/tasks/add")
      .send(taskData);

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual(
      "Error occured while trying to add a task. Please check if the information is correct"
    );
  });

  it("should edit a task and save it to the database", async () => {
    const taskData = {
      email: "test@gmail.com",
      taskName: "__TASK_NAME_4__",
      taskDescription: "__TASK_DESCRIPTION_4__",
      taskCreateDate: new Date("2020-04-01T00:00:00.000Z"),
      taskDueDate: new Date("2020-04-03T00:00:00.000Z"),
      taskPriority: "High",
      taskDifficulty: "Medium",
      isTaskComplete: false,
      isTaskSuggested: false
    };

    const validTask = new TaskModel(taskData);
    const savedTask = await validTask.save();

    const editedTaskData = {
      taskName: "__TASK_NAME_4__",
      taskDescription: "__TASK_DESCRIPTION_EDITED_4__",
      taskUpdateDate: new Date("2020-04-01T00:00:00.000Z"),
      taskDueDate: new Date("2020-04-03T00:00:00.000Z"),
      taskPriority: "High",
      taskDifficulty: "Medium",
      isTaskComplete: false,
      isTaskSuggested: false
    };

    const res = await request(app)
      .put(`/api/tasks/edit/${savedTask._id}`)
      .send(editedTaskData);

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Task has been updated.");
  });

  it("should throw an error if editing the task was unsuccessful", async () => {
    const editedTaskData = {
      taskId: "123",
      taskName: "__TASK_NAME_4__",
      taskDifficulty: "Medium",
      isTaskComplete: false,
      isTaskSuggested: false
    };

    const res = await request(app)
      .put(`/api/tasks/edit/${editedTaskData.taskId}`)
      .send(editedTaskData);

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual(
      "Error occured while trying to edit a task. Please check if the information is correct"
    );
  });

  it("should delete a from the database", async () => {
    const taskData = {
      email: "test@gmail.com",
      taskName: "__TASK_NAME_5__",
      taskDescription: "__TASK_DESCRIPTION_5__",
      taskCreateDate: new Date("2020-04-01T00:00:00.000Z"),
      taskDueDate: new Date("2020-04-03T00:00:00.000Z"),
      taskPriority: "High",
      taskDifficulty: "Medium",
      isTaskComplete: false,
      isTaskSuggested: false
    };

    const validTask = new TaskModel(taskData);
    const savedTask = await validTask.save();

    const res = await request(app).delete(`/api/tasks/delete/${savedTask._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Task deleted.");
  });

  it("should throw an error if editing the task was unsuccessful", async () => {
    const taskData = {
      taskId: "123"
    };

    const res = await request(app).delete(
      `/api/tasks/delete/${taskData.taskId}`
    );

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual("Error occured deleting a task.");
  });

  it("should get a completed task from the database", async () => {
    const taskData = {
      email: "test@gmail.com",
      taskName: "__TASK_NAME_6__",
      taskDescription: "__TASK_DESCRIPTION_6__",
      taskCreateDate: new Date("2020-04-01T00:00:00.000Z"),
      taskDueDate: new Date("2020-04-03T00:00:00.000Z"),
      taskPriority: "High",
      taskDifficulty: "Medium",
      isTaskComplete: true,
      isTaskSuggested: false
    };

    const expectedData = {
      email: "test@gmail.com",
      isTaskComplete: true,
      isTaskSuggested: false,
      taskCreateDate: "2020-04-01T00:00:00.000Z",
      taskDescription: "__TASK_DESCRIPTION_6__",
      taskDifficulty: "Medium",
      taskDueDate: "2020-04-03T00:00:00.000Z",
      taskName: "__TASK_NAME_6__",
      taskPriority: "High"
    };

    const validTask = new TaskModel(taskData);
    await validTask.save();

    const res = await request(app).get("/api/tasks/completed/all");

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).tasks[0]).toHaveProperty(
      "isTaskComplete",
      expectedData.isTaskComplete
    );
  });

  it("should make a task completed and save it to the database", async () => {
    const taskData = {
      email: "test@gmail.com",
      taskName: "__TASK_NAME_7__",
      taskDescription: "__TASK_DESCRIPTION_7__",
      taskCreateDate: new Date("2020-04-01T00:00:00.000Z"),
      taskDueDate: new Date("2020-04-03T00:00:00.000Z"),
      taskPriority: "High",
      taskDifficulty: "Medium",
      isTaskComplete: false,
      isTaskSuggested: false
    };

    const validTask = new TaskModel(taskData);
    const savedTask = await validTask.save();

    const mockData = {
      id: savedTask._id,
      taskUpdateDate: new Date("2020-04-01T00:00:00.000Z"),
      taskCompleteDate: new Date("2020-04-03T00:00:00.000Z"),
      isTaskComplete: true,
      isTaskSuggested: false
    };

    const res = await request(app)
      .patch("/api/tasks/completed")
      .send(mockData);

    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Task has been updated.");
  });

  it("should throw an error if completing the task was unsuccessful", async () => {
    const taskData = {
      id: "123"
    };

    const res = await request(app)
      .patch("/api/tasks/completed")
      .send(taskData);

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual(
      "Error occured while trying to add a task to completed list. Please check if the information is correct."
    );
  });

  it("should calculate the suggested tasks", async () => {
    const taskData = {
      email: "test@gmail.com"
    };

    const userData = {
      firstName: "__FIRST_NAME__",
      lastName: "__LAST_NAME__",
      email: "test@gmail.com",
      userProductivity: 5
    };

    const validUser = new UserModel(userData);
    await validUser.save();

    const expectedData = {
      email: "test@gmail.com"
    };

    const res = await request(app).get(
      `/api/tasks/calculate-suggest/${taskData.email}`
    );

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).tasks[0]).toHaveProperty(
      "email",
      expectedData.email
    );
  });

  it("should make the tasks suggested", async () => {
    const taskData = {
      email: "test@gmail.com"
    };

    const userData = {
      firstName: "__FIRST_NAME__",
      lastName: "__LAST_NAME__",
      email: "test@gmail.com",
      userProductivity: 5
    };

    const validUser = new UserModel(userData);
    await validUser.save();

    const expectedData = {
      email: "test@gmail.com"
    };

    const res = await request(app).get(
      `/api/tasks/make-suggest/${taskData.email}`
    );

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).tasks[0]).toHaveProperty(
      "email",
      expectedData.email
    );
  });
});
