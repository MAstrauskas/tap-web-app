import mongoose from "mongoose";
import request from "supertest";
import UserModel from "../User.model";
import app from "../../../app";

describe("User", () => {
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

  it("should create the user and add into the database", async () => {
    const userData = {
      firstName: "__FIRST_NAME__",
      lastName: "__LAST_NAME__",
      email: "test@email.com"
    };

    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
    expect(savedUser.email).toBe(userData.email);
  });
});
