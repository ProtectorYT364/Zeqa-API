const Avatar = require("../models/avatarModel.js");

exports.findOne = (req, res) => {
  Avatar.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        const defaultdata = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAABf0lEQVRoge3Vv0sCYRgHcMcwShKCkFIHi7gTDLQhwpSTaokGD5cIg4IiUYQjEhLBHw0eweXkdFPjUVOWg5xj/5b9A99nuJfavi+f8e49Hp7n+V4ok1yB9DiWSUSg3c1lKLWxBO3EwpD0XW0LC7GACDsQ5gglucQJplBMNUalF4LKptYgQ4tCBW0dSsdXIek/wwLi7IDGEdK5xDpTqPDnMfpt1yHfsaCfcRfyXyzMeYDeHy+g3HYUYgEOO+BwhHQusc8U8pVj1OvcQpPnBiQ9/9FtQK51Cc1sC3LvzwJhAR12wOYIeVxijyk0U45RKe8XwinnbeirfQdJeS/dsxCO9P9hAXl2IM8RmnCJy0yhsnKMujcn0Gf7Gpr2LahW3AtkPqxDb7VTqGvmIBbQZweGHCGXSzxlCs2VY3RULUHjqyLUMvb/1Wv1COqZBxALMNgBgyM04hK3mEIt5RhtHqehRkmDpIskT+dZaFA5DES6hwWY7ECFI9TkEveYQgPVGP0Fx856wGsMLdcAAAAASUVORK5CYII=";
        const base64Data = defaultdata.replace(/^data:image\/png;base64,/, "");
        const img = Buffer.from(base64Data, "base64");

        res.writeHead(200, {
          "Content-Type": "image/png",
          "Content-Length": img.length
        });
        res.end(img);
        return;
      } else {
        res.status(500).send({
          message: "An error occured."
        });
        return;
      }
    } else {
      const base64Data = data.replace(/^data:image\/png;base64,/, "");
      const img = Buffer.from(base64Data, "base64");

      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": img.length
      });
      res.end(img);
    }
  });
};