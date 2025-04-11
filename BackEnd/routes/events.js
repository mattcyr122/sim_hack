const express = require("express");
const fs = require("fs");
const router = express.Router();

// 🔄 Helper functions
const readEvents = () => JSON.parse(fs.readFileSync("./data/events.json"));
const writeEvents = (events) => fs.writeFileSync("./data/events.json", JSON.stringify(events, null, 2));

// GET all events
router.get("/", (req, res) => {
  const events = readEvents();
  res.json(events);
});

// GET event by ID
router.get("/:event_id", (req, res) => {
  const events = readEvents();
  const event = events.find(e => e.event_id == req.params.event_id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

// POST to add item to wishlist
router.post("/:event_id/wishlist", (req, res) => {
  const { item } = req.body;
  const event_id = parseInt(req.params.event_id);

  if (!item) {
    return res.status(400).json({ error: "Missing 'item' in request body." });
  }

  const events = readEvents();
  const event = events.find((e) => e.event_id === event_id);

  if (!event) {
    return res.status(404).json({ error: "Event not found." });
  }

  const newItem = {
    id: event.wishlist.length > 0 ? event.wishlist[event.wishlist.length - 1].id + 1 : 1,
    item,
    contributions: []
  };

  event.wishlist.push(newItem);
  writeEvents(events);

  res.status(201).json({ message: "Item added to wishlist", wishlist: event.wishlist });
});

module.exports = router;
