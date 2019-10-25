const express = require("express");
const router = express.Router();
const path = require("path");

router.get("*", async(req, res, next) => {
  res.sendFile(path.join(__dirname, "../static/index.html"));
});

module.exports = router;