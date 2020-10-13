const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { config } = require("./config");
const platziStore = require("./routes");
const notFoundHandler = require("./utils/middleware/notFoundHandler")
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require("./utils/middleware/errorHandlers");

// Routes

app.get("/", (req, res) => {
  let userInfo = req.header("user-agent");
  res.send(`UserInfo: ${userInfo}`);
});

platziStore(app);

// 404 handler
app.use(notFoundHandler);

// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error: ", err);
    return;
  }
  console.log(`Listening http://localhost:${config.port}`);
});
