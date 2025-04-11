const express = require("express");
const router = express.Router();
const fs = require("fs");

// GET /api/events
router.get("/api/events", (req, res) => {
  const events = JSON.parse(fs.readFileSync("./data/events.json"));
  res.json(events);
});

module.exports = router;
