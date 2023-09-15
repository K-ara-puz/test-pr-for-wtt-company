const express = require("express");
const router = express.Router();
const base = require('../db');

router.get("/", function (req, res) {
  console.log('Hello world!!!!!!!!!!!')
  res.send("Wiki home page");
});

router.get("/about", function (req, res) {
  console.log('Aboooooout!!!!!!')
  res.send("About this wiki");
});

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
    res.send('faileeeed');
  }
});
router.post("/getTests", function(req, res) {
  console.log(req.body);
  console.log(base.base.users)
  const foundedUser = base.base.users.find( el => el.id === req.body.userId);
  const userTests = foundedUser.tests;
  res.send(userTests)
});

module.exports = router;