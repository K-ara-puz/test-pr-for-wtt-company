const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const base = require('./db');
console.log(base);

const express = require('express');
const app = express();
const port = 3000;
// const history = require('connect-history-api-fallback');

// app.use(history());
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});