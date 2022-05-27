const express = require("express");
const cors = require("cors");
const logger = require("./modules/logger.js");

const app = express();

var corsOptions = {
  origin: "http://api.zeqa.net:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "zeqa.net - 19132" });
});

require("./app/routes/statsRoute.js")(app);
require("./app/routes/punishmentsRoute.js")(app);
require("./app/routes/aliasRoute.js")(app);
require("./app/routes/leaderboardRoute.js")(app);
require("./app/routes/avatarRoute.js")(app);

app.listen(3000, () => {
  logger.log("API is running on port 3000.", "ready");
});