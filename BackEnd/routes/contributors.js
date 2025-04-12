const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const contributorsFilePath = path.join(__dirname, "../data/contributors.json");

// 1. Handle /events/:event_id/contributors
router.get("/:event_id/contributors", (req, res) => {
  const eventId = parseInt(req.params.event_id);

  fs.readFile(contributorsFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Unable to read contributors data" });

    const contributors = JSON.parse(data);
    const filtered = contributors.filter(c => c.event_id === eventId);
    res.json(filtered);
  });
});

// 2. Handle /events/contributors?username=bob456
router.get("/contributors", (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ error: "Missing username query parameter" });
  }

  fs.readFile(contributorsFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Unable to read contributors data" });

    const contributors = JSON.parse(data);
    const filtered = contributors.filter(c => c.username === username);
    res.json(filtered);
  });
});

module.exports = router;
