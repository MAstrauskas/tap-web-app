const sinon = require("sinon");
const sinonTest = require("sinon-test");
const test = sinonTest(sinon);

const MoodController = require("../Mood.controller");
const Mood = require("../Mood.model");

describe("Mood Controller", function() {
  let req = {
    body: {
      email: "__EMAIL__",
      moodName: "__MOOD_NAME__",
      moodMotivation: "__MOOD_MOTIVATION__",
      isTired: false
    },
    params: {},
    error: new Error({ error: "Tests not working" }),
    res: {},
    expectedResult: {}
  };

  beforeEach(() => {
    res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ end: sinon.spy() })
    };
  });

  it(
    "should add mood to the databse",
    test(function() {
      expectedResult = req.body;
      this.stub(Mood, "create").yields(null, expectedResult);

      MoodController.addMood_post(req, res);

      sinon.assert.calledWith(Mood.create, req.body);
      sinon.assert.calledWith(res.json, sinon.match({ email: req.body.email }));
      sinon.assert.calledWith(
        res.json,
        sinon.match({ moodName: req.body.moodName })
      );
      sinon.assert.calledWith(
        res.json,
        sinon.match({ moodMotivation: req.body.moodMotivation })
      );
      sinon.assert.calledWith(
        res.json,
        sinon.match({ isTired: req.body.isTired })
      );
    })
  );
});
