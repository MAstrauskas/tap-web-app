import mongoose from "mongoose";
import request from "supertest";
import UserModel from "../User.model";
import app from "../../../app";

describe("User", () => {
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

  it("should create the user and add into the database", async () => {
    const userData = {
      firstName: "__FIRST_NAME__",
      lastName: "__LAST_NAME__",
      email: "test@email.com",
    };

    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
    expect(savedUser.email).toBe(userData.email);
  });

  it("should get all of the users from a database", async () => {
    const userData2 = {
      firstName: "__FIRST_NAME_2__",
      lastName: "__LAST_NAME_2__",
      email: "test2@email.com",
    };
    const userData3 = {
      firstName: "__FIRST_NAME_3__",
      lastName: "__LAST_NAME_3__",
      email: "test3@email.com",
    };

    const validUser2 = new UserModel(userData2);
    const validUser3 = new UserModel(userData3);

    await validUser2.save();
    await validUser3.save();

    const mockUsersData = [
      {
        firstName: "__FIRST_NAME_2__",
        lastName: "__LAST_NAME_2__",
        email: "test2@email.com",
        __v: 0,
      },
      {
        firstName: "__FIRST_NAME_3__",
        lastName: "__LAST_NAME_3__",
        email: "test3@email.com",
        __v: 0,
      },
    ];

    const res = await request(app).get("/api/user");

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text)[1]).toHaveProperty(
      "firstName",
      mockUsersData[0].firstName
    );
    expect(JSON.parse(res.text)[2]).toHaveProperty(
      "firstName",
      mockUsersData[1].firstName
    );
    expect(JSON.parse(res.text)[1]).toHaveProperty(
      "lastName",
      mockUsersData[0].lastName
    );
    expect(JSON.parse(res.text)[2]).toHaveProperty(
      "lastName",
      mockUsersData[1].lastName
    );
    expect(JSON.parse(res.text)[1]).toHaveProperty(
      "email",
      mockUsersData[0].email
    );
    expect(JSON.parse(res.text)[2]).toHaveProperty(
      "email",
      mockUsersData[1].email
    );
  });

  it("should get a single user from a database", async () => {
    const userData4 = {
      firstName: "__FIRST_NAME_4__",
      lastName: "__LAST_NAME_4__",
      email: "test4@email.com",
    };

    const mockUsersData = {
      firstName: "__FIRST_NAME_4__",
      lastName: "__LAST_NAME_4__",
      email: "test4@email.com",
      __v: 0,
    };

    const validUser = new UserModel(userData4);
    await validUser.save();

    const res = await request(app).get(`/api/user/single/${validUser.email}`);

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text)[0]).toHaveProperty(
      "firstName",
      mockUsersData.firstName
    );
    expect(JSON.parse(res.text)[0]).toHaveProperty(
      "lastName",
      mockUsersData.lastName
    );
    expect(JSON.parse(res.text)[0]).toHaveProperty(
      "email",
      mockUsersData.email
    );
  });

  it("should add a new user", async () => {
    const userData5 = {
      name: "__FIRST_NAME_5__ __LAST_NAME_5__",
      email: "test5@email.com",
    };

    const mockUsersData = {
      firstName: "__FIRST_NAME_5__",
      lastName: "__LAST_NAME_5__",
      email: "test5@email.com",
      __v: 0,
    };

    const res = await request(app).post("/api/user/add").send(userData5);

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text)).toHaveProperty(
      "firstName",
      mockUsersData.firstName
    );
    expect(JSON.parse(res.text)).toHaveProperty(
      "lastName",
      mockUsersData.lastName
    );
    expect(JSON.parse(res.text)).toHaveProperty("email", mockUsersData.email);
  });
});
