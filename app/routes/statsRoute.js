module.exports = app => {
  const stats = require("../controllers/statsController.js");
  const router = require("express").Router();

  router.get("/:name", stats.findOne);
  
  app.use("/api/players/stats", router);
};