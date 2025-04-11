const express = require("express");
const router = express.Router({ mergeParams: true }); // to access event_id
const fs = require("fs");

// Load data
let events = JSON.parse(fs.readFileSync("./data/events.json"));

// POST a new contribution to an event
router.post("/", (req, res) => {
  const { event_id } = req.params;
  const { contributor_id, item_name, amount, message } = req.body;

  const eventIndex = events.findIndex(e => e.event_id == event_id);
  if (eventIndex === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const newContribution = {
    contribution_id: Date.now(), // simple unique ID
    contributor_id,
    item_name,
    amount,
    message
  };

  if (!events[eventIndex].contributions) {
    events[eventIndex].contributions = [];
  }

  events[eventIndex].contributions.push(newContribution);

  fs.writeFile("./data/events.json", JSON.stringify(events, null, 2), (err) => {
    if (err) {
      console.error("Failed to save contribution:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(201).json({ message: "Contribution added", contribution: newContribution });
  });
});

module.exports = router;
