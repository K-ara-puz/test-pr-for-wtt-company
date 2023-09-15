const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const base = require('./db');

const express = require('express');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});