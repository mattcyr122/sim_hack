const express = require("express");
const router = express.Router({ mergeParams: true });
const fs = require("fs");
const wishlistPath = "./data/wishlist_items.json";

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

// GET all wishlist items for a specific event
router.get("/", (req, res) => {
  const { event_id } = req.params;

  // Load wishlist items
  const wishlistItems = JSON.parse(fs.readFileSync("./data/wishlist_items.json"));

  // Filter items belonging to the specified event
  const eventWishlist = wishlistItems.filter(item => item.event_id == event_id);

  res.json(eventWishlist);
});


// POST a new wishlist item
router.post("/", (req, res) => {
    const { event_id } = req.params;
    const { wishlist_name, wishlist_description, wishlist_image, cost } = req.body;
  
    // Read current wishlist items
    const wishlistItems = JSON.parse(fs.readFileSync(wishlistPath));
  
    const newItem = {
      item_id: Date.now(), // Or use a UUID if needed
      event_id: parseInt(event_id),
      wishlist_name,
      wishlist_description,
      wishlist_image,
      cost: parseFloat(cost)
    };
  
    wishlistItems.push(newItem);
  
    // Save updated list
    fs.writeFile(wishlistPath, JSON.stringify(wishlistItems, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to save wishlist item." });
      }
      res.json({ message: "Wishlist item added", item: newItem });
    });
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

// UPDATE a wishlist item
router.put("/:item_id", (req, res) => {
    const { item_id } = req.params;
    const { wishlist_name, wishlist_description, wishlist_image, cost } = req.body;
  
    let wishlistItems = JSON.parse(fs.readFileSync(wishlistPath));
    const itemIndex = wishlistItems.findIndex(item => item.item_id == item_id);
  
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }
  
    // Update fields (only if provided)
    if (wishlist_name !== undefined) wishlistItems[itemIndex].wishlist_name = wishlist_name;
    if (wishlist_description !== undefined) wishlistItems[itemIndex].wishlist_description = wishlist_description;
    if (wishlist_image !== undefined) wishlistItems[itemIndex].wishlist_image = wishlist_image;
    if (cost !== undefined) wishlistItems[itemIndex].cost = parseFloat(cost);
  
    fs.writeFile(wishlistPath, JSON.stringify(wishlistItems, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update wishlist item." });
      }
      res.json({ message: "Wishlist item updated", item: wishlistItems[itemIndex] });
    });
  });
  

// DELETE a wishlist item
router.delete("/:item_id", (req, res) => {
    const { item_id } = req.params;
  
    let wishlistItems = JSON.parse(fs.readFileSync(wishlistPath));
  
    const originalLength = wishlistItems.length;
    wishlistItems = wishlistItems.filter(item => item.item_id != item_id);
  
    if (wishlistItems.length === originalLength) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }
  
    fs.writeFile(wishlistPath, JSON.stringify(wishlistItems, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete wishlist item." });
      }
      res.json({ message: "Wishlist item deleted" });
    });
  });
  
module.exports = router;
