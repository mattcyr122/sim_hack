const fs = require("fs").promises;

const eventsPath = "./data/events.json";

// GET all events
function getAllEvents() {
  return async function (req, res) {
    try {
      const data = await fs.readFile(eventsPath, "utf-8");
      const events = JSON.parse(data);
      res.json(events);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to read events data" });
    }
  };
}

// GET event by ID
function getEventById() {
  return async function (req, res) {
    try {
      const data = await fs.readFile(eventsPath, "utf-8");
      const events = JSON.parse(data);
      const event = events.find(e => e.event_id == req.query.eventID);

      if (event) {
        res.json(event);
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to read events data" });
    }
  };
}

// POST to add item to wishlist
function addToWishlist() {
  return async function (req, res) {
    const { item } = req.body;
    const eventID = parseInt(req.query.eventID);

    if (!item) {
      return res.status(400).json({ error: "Missing 'item' in request body." });
    }

    try {
      const data = await fs.readFile(eventsPath, "utf-8");
      const events = JSON.parse(data);

      const event = events.find(e => e.eventID === eventID);
      if (!event) {
        return res.status(404).json({ error: "Event not found." });
      }

      const newItem = {
        id: event.wishlist.length > 0 ? event.wishlist[event.wishlist.length - 1].id + 1 : 1,
        item,
        contributions: []
      };

      event.wishlist.push(newItem);
      await fs.writeFile(eventsPath, JSON.stringify(events, null, 2));

      res.status(201).json({ message: "Item added to wishlist", wishlist: event.wishlist });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add wishlist item." });
    }
  };
}

// Export all route handlers
module.exports = {
  getAllEvents,
  getEventById,
  addToWishlist
};
