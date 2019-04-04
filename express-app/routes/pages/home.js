const express = require("express");
const members = require("../../models/Member");

// Initialize express router
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Member app",
    members
  });
});

module.exports = router;
