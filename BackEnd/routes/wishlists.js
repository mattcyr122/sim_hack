const express = require("express");
const router = express.Router({ mergeParams: true });
const fs = require("fs");

// Load event data
const events = JSON.parse(fs.readFileSync("./data/events.json"));

// Helper: write to file
function saveEvents(res, successMessage) {
  fs.writeFile("./data/events.json", JSON.stringify(events, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error saving data" });
    }
    res.json({ message: successMessage });
  });
}

// GET all wishlist items for an event
router.get("/", (req, res) => {
  const { event_id } = req.params;
  const event = events.find(e => e.event_id == event_id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  res.json(event.wishlist || []);
});

// ADD a new item to wishlist
router.post("/", (req, res) => {
  const { event_id } = req.params;
  const { name, description, price } = req.body;

  const event = events.find(e => e.event_id == event_id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const newItem = {
    item_id: Date.now().toString(),
    name,
    description,
    price
  };

  if (!event.wishlist) event.wishlist = [];
  event.wishlist.push(newItem);

  saveEvents(res, "Wishlist item added");
});

// UPDATE a wishlist item
router.put("/:item_id", (req, res) => {
  const { event_id, item_id } = req.params;
  const { name, description, price } = req.body;

  const event = events.find(e => e.event_id == event_id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const item = event.wishlist?.find(i => i.item_id == item_id);
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.name = name ?? item.name;
  item.description = description ?? item.description;
  item.price = price ?? item.price;

  saveEvents(res, "Wishlist item updated");
});

// DELETE a wishlist item
router.delete("/:item_id", (req, res) => {
  const { event_id, item_id } = req.params;

  const event = events.find(e => e.event_id == event_id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const index = event.wishlist?.findIndex(i => i.item_id == item_id);
  if (index === -1 || index === undefined) return res.status(404).json({ message: "Item not found" });

  const deleted = event.wishlist.splice(index, 1);
  saveEvents(res, `Wishlist item deleted`);
});

module.exports = router;
