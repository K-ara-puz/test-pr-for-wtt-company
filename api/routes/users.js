const express = require("express");
const router = express.Router();
// ** const mongoose = require('mongoose');
const path = require('path');
const User = require('../models/user');
const Inventory = require('../models/inventory');
const {pool: db} = require('../db/db-sql');

router.post("/login", async function (req, res) {
  let userData = req.body.user;
  let isMatch = false;
  // ** const matchedUser = await User.findOne({login: userData.login});
  const matchedUser = await db.query('SELECT * FROM users WHERE user_login = $1 AND user_password = $2',
  [userData.login, userData.password]);
  if (Object.keys(matchedUser.rows).length > 0) {
    isMatch = true;
  } else {
    isMatch = false
  }
  if (isMatch === true) {
    res.send({status: "success", userData: matchedUser.rows});
  } else {
    res.send('failed');
  }
  // ** 
  // let userData = req.body.user;
  // let isMatch = false;
  // let foundedUser = null;
  // for (i = 0; i < base.base.users.length; i++) {
  //   if (base.base.users[i].login === userData.login &&
  //     base.base.users[i].password === userData.password) {
  //       isMatch = true;
  //       foundedUser = base.base.users[i];
  //   }
  // }
  // if (isMatch === true) {
  //   res.send({status: "success", userData: {id: foundedUser.id}});
  // } else {
  //   res.send('failed');
  // }
  // **
});
router.post("/getTests", async function(req, res) {
  // ** const foundedUser = await User.findOne({_id: req.body.userId});
  const userTests = await db.query(`SELECT test_id, test_question
  FROM tests
  JOIN users USING(user_id)
  WHERE user_id = $1`, [req.body.userId]);
  // ** const userTests = foundedUser.tests;
  res.send(userTests.rows)
});
router.post("/getTestsResult", async function(req, res) {
  const testData = req.body.test;
  const userTestAnswers = Object.values(testData);
  // ** const userId = req.body.userId;
  // ** const testIndex = req.body.testNumber - 1;
  // ** let answerCounter = 0;
  const allQuestionsCount = req.body.allQuestionsCount;
  const query = {
    text: `SELECT COUNT(test_answer)
    FROM tests
    WHERE user_id = '1' AND test_answer IN (${userTestAnswers})`,
  }
  const result = await db.query(query);
  const testResult = {
    allQuestionsCount: allQuestionsCount,
    rightAnswers: result.rows[0].count
  };
  res.send(testResult)
  
  // *
  // const foundedUser = await User.findOne({_id: userId});
  // const allQuestionsCount = foundedUser.tests[testIndex].questions.length;
  // let rightAnswers = 0;

  // foundedUser.tests[testIndex].questions.forEach( question => {
  //   if (question.answer === testData[++answerCounter]) {
  //     rightAnswers++;
  //   }
  // });

  // const testResult = {
  //   allQuestionsCount: allQuestionsCount,
  //   rightAnswers: rightAnswers
  // };

  // await User.updateOne({_id: userId}, {$set: {["tests."+testIndex+".testResult"] : testResult}});
  // res.send(testResult)
  // *
});

module.exports = router;