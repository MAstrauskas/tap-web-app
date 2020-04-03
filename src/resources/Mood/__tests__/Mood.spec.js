import mongoose from "mongoose";
import request from "supertest";
import MoodModel from "../Mood.model";
import app from "../../../app";

describe("Mood", () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  it("should create a mood and add into the database", async () => {
    const moodData = {
      email: "test@email.com",
      moodName: "__MOOD_NAME__",
      moodMotivation: "__MOOD_MOTIVATION__",
      isTired: false
    };

    const validMood = new MoodModel(moodData);
    const savedMood = await validMood.save();

    expect(savedMood._id).toBeDefined();
    expect(savedMood.email).toBe(moodData.email);
    expect(savedMood.moodName).toBe(moodData.moodName);
    expect(savedMood.moodMotivation).toBe(moodData.moodMotivation);
    expect(savedMood.isTired).toBe(moodData.isTired);
  });

  it("should get a mood from the database", async () => {
    const moodData = {
      email: "test@email.com",
      moodName: "__MOOD_NAME__",
      moodMotivation: "__MOOD_MOTIVATION__",
      isTired: false
    };

    const validMood = new MoodModel(moodData);
    const savedMood = await validMood.save();

    const mockMoodData = {
      email: "test@email.com",
      moodName: "__MOOD_NAME__",
      moodMotivation: "__MOOD_MOTIVATION__",
      isTired: false,
      __v: 0
    };

    const res = await request(app).get(`/api/mood/${savedMood._id}`);

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text)).toHaveProperty("email", mockMoodData.email);
    expect(JSON.parse(res.text)).toHaveProperty(
      "moodName",
      mockMoodData.moodName
    );
    expect(JSON.parse(res.text)).toHaveProperty(
      "moodMotivation",
      mockMoodData.moodMotivation
    );
    expect(JSON.parse(res.text)).toHaveProperty(
      "isTired",
      mockMoodData.isTired
    );
  });

  it("should throw an error if mood does not exist in the database", async () => {
    const mockMoodData = {
      _id: "123123",
      email: "test@email.com",
      moodName: "__MOOD_NAME__",
      moodMotivation: "__MOOD_MOTIVATION__",
      isTired: false,
      __v: 0
    };

    const res = await request(app).get(`/api/mood/${mockMoodData._id}`);

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual(
      "Error occured trying to find a mood. Please check if the information is correct."
    );
  });

  it("should add a mood to the database", async () => {
    const mockMoodData = {
      email: "test@email.com",
      moodName: "__MOOD_NAME__",
      moodMotivation: "__MOOD_MOTIVATION__",
      isTired: false,
      __v: 0
    };

    const res = await request(app)
      .post("/api/mood/add")
      .send(mockMoodData);

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text)).toHaveProperty("email", mockMoodData.email);
    expect(JSON.parse(res.text)).toHaveProperty(
      "moodName",
      mockMoodData.moodName
    );
    expect(JSON.parse(res.text)).toHaveProperty(
      "moodMotivation",
      mockMoodData.moodMotivation
    );
    expect(JSON.parse(res.text)).toHaveProperty(
      "isTired",
      mockMoodData.isTired
    );
  });

  it("should throw an error if provided mood format is wrong", async () => {
    const mockMoodData = {
      mood: "__MOOD_NAME__",
      moodMotivation: "__MOOD_MOTIVATION__",
      isTired: false
    };

    const res = await request(app).post("/api/mood/add");

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual(
      "Error occured while trying to add a mood. Please check if the information is correct"
    );
  });
});
