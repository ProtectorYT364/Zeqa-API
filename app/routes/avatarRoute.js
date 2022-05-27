module.exports = app => {
  const avatar = require("../controllers/avatarController.js");
  const router = require("express").Router();

  router.get("/:name", avatar.findOne);
  
  app.use("/api/players/avatars", router);
};