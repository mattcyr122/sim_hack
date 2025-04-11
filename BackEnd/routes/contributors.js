const express = require("express");
const router = express.Router({ mergeParams: true }); // to access :event_id from parent
const fs = require("fs");

// Load and parse event data
let events = JSON.parse(fs.readFileSync("./data/events.json"));

// When we need to get the contributors of an event 
router.get("/", (req, res) => {
    const { event_id } = req.params;
    const event = events.find(e => e.event_id == event_id);
    if (!event) return res.status(404).json({ message: "Event not found" });
  
    res.json(event.contributors || []);
  });
  

// Add a new contributor to an event
router.post("/", (req, res) => {
  const { event_id } = req.params;
  const { contributor_id, name, email } = req.body;

  const eventIndex = events.findIndex(e => e.event_id == event_id);
  if (eventIndex === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const newContributor = { contributor_id, name, email };
  if (!events[eventIndex].contributors) {
    events[eventIndex].contributors = [];
  }

  events[eventIndex].contributors.push(newContributor);

  fs.writeFile("./data/events.json", JSON.stringify(events, null, 2), (err) => {
    if (err) {
      console.error("Error saving events:", err);
      return res.status(500).json({ message: "Failed to save contributor" });
    }

    res.status(201).json({ message: "Contributor added", contributor: newContributor });
  });
});




module.exports = router;
