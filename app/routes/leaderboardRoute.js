module.exports = app => {
  const leaderboard = require("../controllers/leaderboardController.js");
  const router = require("express").Router();

  router.get("/:name", leaderboard.findOne);
  
  app.use("/api/leaderboards", router);
};