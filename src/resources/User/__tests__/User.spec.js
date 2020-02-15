const sinon = require("sinon");
const sinonTest = require("sinon-test");
const test = sinonTest(sinon);

const UserController = require("../User.controller");
const User = require("../User.model");

describe("User Controller", () => {
  let req = {
    body: {},
    expectedResult: {
      firstName: "__FIRST_NAME__",
      lastName: "__LAST_NAME__",
      email: "__EMAIL__"
    }
  };

  beforeEach(() => {
    res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ end: sinon.spy() })
    };
  });

  it(
    "should get a list of users from the database",
    test(function() {
      expectedResult = req.expectedResult;
      this.stub(User, "find").yields(null, expectedResult);

      UserController.userList(req, res);

      sinon.assert.calledWith(User.find, {});
      sinon.assert.calledWith(res.json, sinon.match(expectedResult));
    })
  );
});
