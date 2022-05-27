module.exports = app => {
  const punishments = require("../controllers/punishmentsController.js");
  const router = require("express").Router();

  router.get("/:name", punishments.findOne);
  
  app.use("/api/players/punishments", router);
};