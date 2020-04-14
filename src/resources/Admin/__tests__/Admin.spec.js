import mongoose from "mongoose";
import request from "supertest";
import TaskModel from "../../Task/Task.model";
import app from "../../../app";

describe("Admin", () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      (err) => {
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

  it("should clear the suggested tasks from the database", async () => {
    const taskData = {
      email: "admin@gmail.com",
      taskName: "__TASK_NAME_10__",
      taskDescription: "__TASK_DESCRIPTION_10__",
      taskCreateDate: new Date("2020-04-01T00:00:00.000Z"),
      taskDueDate: new Date("2020-04-03T00:00:00.000Z"),
      taskPriority: "High",
      taskDifficulty: "Medium",
      isTaskComplete: false,
      isTaskSuggested: false,
    };

    const validTask = new TaskModel(taskData);
    await validTask.save();

    const res = await request(app).post("/api/admin/clear-suggest");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('"Success clearing suggested tasks."');
  });

  it("should clear the suggested tasks from the database", async () => {
    const taskData = {
      email: "admin2@gmail.com",
      taskName: "__TASK_NAME_11__",
      taskDescription: "__TASK_DESCRIPTION_11__",
      taskCreateDate: new Date("2020-04-01T00:00:00.000Z"),
      taskDueDate: new Date("2020-04-03T00:00:00.000Z"),
      taskPriority: "High",
      taskDifficulty: "Medium",
      isTaskComplete: false,
      isTaskSuggested: false,
    };

    const validTask = new TaskModel(taskData);
    await validTask.save();

    const res = await request(app).get("/api/admin/clear-mood");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('"Success clearing user mood."');
  });
});
