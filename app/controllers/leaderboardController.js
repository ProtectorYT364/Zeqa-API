const Leaderboard = require("../models/leaderboardModel.js");

exports.findOne = (req, res) => {
  const authHeader = req.get("Authorization");

  if (authHeader !== "Bearer 3hcQsB8PeByYHQB2wNSxyAnCt9LGGKsrjdGh9Vb9Nx63vEzBqYkspfMSmMxPsBgCC3UwTUU4fckgYYsp2tBGSfhaThmcQek7aYDe") {
    res.status(401).send({
      message: "Access denied"
    });
    return;
  }

  Leaderboard.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Leaderboard (${req.params.name}) does not exist.`
        });
      } else {
        res.status(500).send({
          message: "An error occurred."
        });
      }
    } else res.send(data);
  });
};