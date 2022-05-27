const dbSecondary = require("./db_secondary.js");

const Avatar = function(avatar) {
  this.skin = avatar.skin;
};

Avatar.findByName = (name, result) => {
  dbSecondary.query(`SELECT skin FROM PlayersData WHERE name = '${name}'`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    if (res.length) {
      let headsrc = `data:image/png;base64,${JSON.parse(JSON.stringify(res[0].skin))}`;
      result(null, headsrc);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = Avatar;