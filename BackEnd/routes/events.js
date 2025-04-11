const express = require("express");
const router = express.Router();
const fs = require("fs");

// Load dummy event data
const events = JSON.parse(fs.readFileSync("./data/events.json"));

// GET all events
router.get("/", (req, res) => {
  res.json(events);
});

// GET event by ID
router.get("/:event_id", (req, res) => {
  const event = events.find(e => e.event_id == req.params.event_id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

module.exports = router;
