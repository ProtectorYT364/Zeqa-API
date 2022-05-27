/* eslint no-unused-vars: 0 */
const db = require("./db.js");
const dbSecondary = require("./db_secondary.js");

const Stats = function(stats) {
  this.name = stats.name;
  this.kills = stats.kills;
  this.deaths = stats.deaths;
  this.rank1 = stats.rank1;
  this.bedfight = stats.bedfight;
  this.boxing = stats.boxing;
  this.bridge = stats.bridge;
  this.builduhc = stats.builduhc;
  this.combo = stats.combo;
  this.fist = stats.fist;
  this.gapple = stats.gapple;
  this.nodebuff = stats.nodebuff;
  this.soup = stats.soup;
  this.spleef = stats.spleef;
  this.sumo = stats.sumo;
  this.battlerush = stats.battlerush;
  this.stickfight = stats.stickfight;
  this.coins = stats.coins;
  this.shards = stats.shards;
  this.bp = stats.bp;
  this.totalonline = stats.totalonline;
  this.lastplayed = stats.lastplayed;
  this.bedfightrank = stats.bedfightrank;
  this.boxingrank = stats.boxingrank;
  this.bridgerank = stats.bridgerank;
  this.builduhcrank = stats.builduhcrank;
  this.comborank = stats.comborank;
  this.fistrank = stats.fistrank;
  this.gapplerank = stats.gapplerank;
  this.nodebuffrank = stats.nodebuffrank;
  this.souprank = stats.souprank;
  this.spleefrank = stats.spleefrank;
  this.sumorank = stats.sumorank;
  this.battlerushrank = stats.battlerushrank;
  this.stickfightrank = stats.stickfightrank;
  this.coinsrank = stats.coinsrank;
  this.shardsrank = stats.shardsrank;
  this.bprank = stats.bprank;
  this.killsrank = stats.killsrank;
  this.deathsrank = stats.deathsrank;
};

Stats.findByName = (name, result) => {
  db.query(`SELECT a.name, a.kills, a.deaths, a.coins, a.shards, a.bp, b.bedfight, b.boxing, b.bridge, b.builduhc, b.combo, b.fist, b.gapple, b.nodebuff, b.soup, b.spleef, b.sumo, b.battlerush, b.stickfight, c.rank1, d.lastplayed, d.totalonline FROM PlayerStats AS a INNER JOIN PlayerElo AS b ON a.name = b.name INNER JOIN PlayerRanks AS c ON a.name = c.name INNER JOIN PlayerDuration as d ON a.name = d.name WHERE a.name = '${name}';`, (err, res) => {
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
          db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.bedfight > b.bedfight ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res3) => {
            res[0].bedfightrank = res3[0].rank;

            db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.boxing > b.boxing ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res4) => {
              res[0].boxingrank = res4[0].rank;

              db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.bridge > b.bridge ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res5) => {
                res[0].bridgerank = res5[0].rank;

                db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.builduhc > b.builduhc ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res6) => {
                  res[0].builduhcrank = res6[0].rank;

                  db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.combo > b.combo ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res7) => {
                    res[0].comborank = res7[0].rank;

                    db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.fist > b.fist ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res8) => {
                      res[0].fistrank = res8[0].rank;

                      db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.nodebuff > b.nodebuff ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res9) => {
                        res[0].nodebuffrank = res9[0].rank;

                        db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.soup > b.soup ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res10) => {
                          res[0].souprank = res10[0].rank;

                          db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.spleef > b.spleef ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res11) => {
                            res[0].spleefrank = res11[0].rank;

                            db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.sumo > b.sumo ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res12) => {
                              res[0].sumorank = res12[0].rank;

                              db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.gapple > b.gapple ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res13) => {
                                res[0].gapplerank = res13[0].rank;

                                db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.battlerush > b.battlerush ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res14) => {
                                  res[0].battlerushrank = res14[0].rank;

                                  db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerElo a WHERE a.stickfight > b.stickfight ) AS rank FROM PlayerElo b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res15) => {
                                    res[0].stickfightrank = res15[0].rank;

                                    db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerStats a WHERE a.kills > b.kills ) AS rank FROM PlayerStats b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res16) => {
                                      res[0].killsrank = res16[0].rank;
    
                                      db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerStats a WHERE a.deaths > b.deaths ) AS rank FROM PlayerStats b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res17) => {
                                        res[0].deathsrank = res17[0].rank;
        
                                        db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerStats a WHERE a.coins > b.coins ) AS rank FROM PlayerStats b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res18) => {
                                          res[0].coinsrank = res18[0].rank;
            
                                          db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerStats a WHERE a.shards > b.shards ) AS rank FROM PlayerStats b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res19) => {
                                            res[0].shardsrank = res19[0].rank;
                
                                            db.query(`SELECT 1 + (SELECT count( * ) FROM PlayerStats a WHERE a.bp > b.bp ) AS rank FROM PlayerStats b WHERE name = '${name}' ORDER BY rank LIMIT 1;`, (err, res20) => {
                                              res[0].bprank = res20[0].rank;
                                              res[0].sensitivename = res2[0].sensitivename;
                                              result(null, res[0]);
                                              return;
                                            }); 
                                          }); 
                                        }); 
                                      }); 
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        }
      });
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

module.exports = Stats;