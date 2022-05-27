const db = require("./db.js");
const dbSecondary = require("./db_secondary.js");

const Leaderboard = function(leaderboard) {
  this.bedfight = leaderboard.bedfight;
  this.boxing = leaderboard.boxing;
  this.bridge = leaderboard.bridge;
  this.builduhc = leaderboard.builduhc;
  this.combo = leaderboard.combo;
  this.fist = leaderboard.fist;
  this.gapple = leaderboard.gapple;
  this.nodebuff = leaderboard.nodebuff;
  this.soup = leaderboard.soup;
  this.spleef = leaderboard.spleef;
  this.sumo = leaderboard.sumo;
  this.stickfight = leaderboard.stickfight;
  this.battlerush = leaderboard.battlerush;
  this.kills = leaderboard.kills;
  this.deaths = leaderboard.deaths;
  this.coins = leaderboard.coins;
  this.shards = leaderboard.shards;
};

Leaderboard.findByName = (name, result) => {
  let leaderboardType;

  if (name == "stickfight" || name == "battlerush" || name == "bedfight" || name == "boxing" || name == "bridge" || name == "builduhc" || name == "combo" || name == "fist" || name == "gapple" || name == "nodebuff" || name == "soup" || name == "spleef" || name == "sumo") {
    leaderboardType = "elo";
  } else if (name == "kills" || name == "deaths" || name == "coins" || name == "shards") {
    leaderboardType = "stats";
  } else {
    result("Invalid Leaderboard", null);
    return;
  }

  if (leaderboardType == "elo") {
    db.query(`SELECT name, ${name} FROM PlayerElo ORDER BY ${name} DESC LIMIT 10;`, (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }

      if (res.length) {
        const leaderboard = [];

        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[0].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 1 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[1].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 2 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[2].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 3 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[3].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 4 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[4].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 5 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[5].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 6 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[6].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 7 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[7].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 8 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[8].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 9 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[9].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 10 });
          result(null, leaderboard);
        });
        return;
      }
      result({ kind: "not_found" }, null);
    });
  } else {
    db.query(`SELECT name, ${name} FROM PlayerStats ORDER BY ${name} DESC LIMIT 10;`, (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }

      if (res.length) {
        const leaderboard = [];

        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[0].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 1 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[1].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 2 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[2].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 3 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[3].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 4 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[4].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 5 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[5].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 6 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[6].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 7 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[7].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 8 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[8].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 9 });
        });
        dbSecondary.query(`SELECT sensitivename FROM PlayersData WHERE name = '${res[9].name}'`, (err, res0) => {
          leaderboard.push({ name: res0[0].sensitivename, ranking: 10 });
          result(null, leaderboard);
        });
        return;
      }
      result({ kind: "not_found" }, null);
    });
  }
};

module.exports = Leaderboard;