module.exports = app => {
  const alias = require("../controllers/aliasController.js");
  const router = require("express").Router();

  router.get("/:name", alias.findOne);
  
  app.use("/api/players/alias", router);
};