const express = require("express");
const router = express.Router();

router.use(express.json());

router.use(express.static(__dirname + "/api_public/"));

router.use("/db/", require("./database_server/server"));
router.use("/tracks/", require("./track_handler"));
router.use("/external/", require("./external_content"));

router.all("/*", (req, res) => {
  res
    .status(404)
    .json({ error: true, response: "Bad request (URI doesn't exist)" });
});

module.exports = router;
