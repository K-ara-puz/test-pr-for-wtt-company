const express = require("express");
const router = express.Router();
const base = require('../db');

router.post("/login", function (req, res) {
  let userData = req.body.user;
  let isMatch = false;
  let foundedUser = null;
  for (i = 0; i < base.base.users.length; i++) {
    if (base.base.users[i].login === userData.login &&
      base.base.users[i].password === userData.password) {
        isMatch = true;
        foundedUser = base.base.users[i];
    }
  }
  if (isMatch === true) {
    res.send({status: "success", userData: {id: foundedUser.id}});
  } else {
    res.send('failed');
  }
});
router.post("/getTests", function(req, res) {
  const foundedUser = base.base.users.find( el => el.id === req.body.userId);
  const userTests = foundedUser.tests;
  res.send(userTests)
});
router.post("/getTestsResult", function(req, res) {
  const testData = req.body.test;
  const userId = Number(req.body.userId) - 1;
  const testIndex = req.body.testNumber - 1;
  let answerCounter = 0;
  const allQuestionsCount = base.base.users[userId].tests[testIndex].questions.length;
  let rightAnswers = 0;

  base.base.users[userId].tests[testIndex].questions.forEach( question => {
    if (question.answer === testData[++answerCounter]) {
      rightAnswers++;
    }
  });

  const testResult = {
    allQuestionsCount: allQuestionsCount,
    rightAnswers: rightAnswers
  };

  base.base.users[userId].tests[testIndex].testResult = testResult;

  res.send(testResult)
});

module.exports = router;