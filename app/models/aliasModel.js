const dbSecondary = require("./db_secondary.js");
const PhpSerialize = require("php-serialize");

const Alias = function(alias) {
  this.name = alias.name;
  this.sensitivename = alias.sensitivename;
  this.data = alias.data;
  this.alts = alias.alts;
};

Alias.findByName = (name, result) => {
  let unserializedAlias;

  dbSecondary.query(`SELECT alias FROM PlayersData WHERE name = '${name}' OR sensitivename = '${name}'`, (err, res1) => {
    if (Array.isArray(res1) && res1.length && res1[0].alias !== undefined) {
      unserializedAlias = PhpSerialize.unserialize(res1[0].alias);
      let newQuery = "SELECT sensitivename FROM PlayersData WHERE ";
            
      for (let i = 0; i < unserializedAlias.ClientRandomId.length; i++) {
        if (unserializedAlias.ClientRandomId[i] === "9223372036854775807") {
          continue;
        }
        newQuery += `alias LIKE '%${unserializedAlias.ClientRandomId[i]}%' OR `;
      }
      for (let i = 0; i < unserializedAlias.DeviceId.length; i++) {
        newQuery += `alias LIKE '%${unserializedAlias.DeviceId[i]}%' OR `;
      }
      for (let i = 0; i < unserializedAlias.SelfSignedId.length; i++) {
        newQuery += `alias LIKE '%${unserializedAlias.SelfSignedId[i]}%' OR `;
      }
      for (let i = 0; i < unserializedAlias.Xuid.length; i++) {
        newQuery += `alias LIKE '%${unserializedAlias.Xuid[i]}%' OR `;
      }
            
      newQuery = newQuery.substring(0, newQuery.length - 4);
            
      dbSecondary.query(newQuery, (err, res) => {
        if (err) {
          console.log(err);
          result(null, "An error occurred");
          return;
        }

        if (res.length) {
          const altsArr = [];
          const alts = JSON.parse(JSON.stringify(res));
          for (const [i, alt] of alts.entries()) { // eslint-disable-line no-unused-vars
            altsArr.push(alt.sensitivename);
          }
          result(null, `{"alts":"${altsArr}"},{"data":"${res1[0].alias}"}`);
          return;
        }

        result({ kind: "not_found" }, null);
      });
    } else {
      result(null, `{"alts":"${name}"},{"data":""}`);
      return;
    }
  });
};

module.exports = Alias;