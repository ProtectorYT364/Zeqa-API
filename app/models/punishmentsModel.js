const db = require("./db.js");
const dbSecondary = require("./db_secondary.js");

const Punishments = function(punishments) {
  this.name = punishments.name;
  this.sensitivename = punishments.sensitivename;
  this.reason = punishments.reason;
  this.staff = punishments.staff;
  this.duration = punishments.duration;
};

Punishments.findByName = (name, result) => {
  db.query(`SELECT * from BansData where name = '${name}'`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${name}'`, (err, res2) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }

        if (res2.length) {
          res[0].sensitivename = res2[0].sensitivename;
          result(null, res[0]);
          return;
        }
      });
      return;
    }

    result({ kind: "not_found" }, "Player not banned");
  });
};

module.exports = Punishments;