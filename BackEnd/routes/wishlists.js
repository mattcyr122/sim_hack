const fs = require("fs").promises;

const wishlistPath = "./data/wishlist_items.json";

// GET all wishlist items for a specific event
function getAllWishlistItems() {
  return async function (req, res) {
    try {
      const { eventID } = req.query;
      const data = await fs.readFile(wishlistPath, "utf-8");
      const wishlistItems = JSON.parse(data);
      const eventWishlist = wishlistItems.filter(item => item.event_id == eventID);
      res.json(eventWishlist);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to read wishlist data" });
    }
  };
}

// GET a specific wishlist item by ID
function getWishlistItemById() {
  return async function (req, res) {
    try {
      const { itemID } = req.query;
      const data = await fs.readFile(wishlistPath, "utf-8");
      const wishlistItems = JSON.parse(data);
      const item = wishlistItems.find(item => item.item_id == itemID);

      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Wishlist item not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to read wishlist data" });
    }
  };
}

// POST a new wishlist item
function addWishlistItem() {
  return async function (req, res) {
    const { eventID } = req.query;
    const { wishlist_name, wishlist_description, wishlist_image, cost } = req.body;

    if (!wishlist_name || !cost) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const data = await fs.readFile(wishlistPath, "utf-8");
      const wishlistItems = JSON.parse(data);

      const newItem = {
        item_id: Date.now(),
        event_id: parseInt(eventID),
        wishlist_name,
        wishlist_description,
        wishlist_image,
        cost: parseFloat(cost)
      };

      wishlistItems.push(newItem);

      await fs.writeFile(wishlistPath, JSON.stringify(wishlistItems, null, 2));
      res.status(201).json({ message: "Wishlist item added", item: newItem });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add wishlist item" });
    }
  };
}

// DELETE a wishlist item
function deleteWishlistItem() {
  return async function (req, res) {
    const { eventID, itemID } = req.query;

    try {
      const data = await fs.readFile(wishlistPath, "utf-8");
      const wishlistItems = JSON.parse(data);

      const newList = wishlistItems.filter(
        item => !(item.item_id == itemID && item.event_id == eventID)
      );

      if (newList.length === wishlistItems.length) {
        return res.status(404).json({ message: "Wishlist item not found" });
      }

      await fs.writeFile(wishlistPath, JSON.stringify(newList, null, 2));
      res.json({ message: "Wishlist item deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete wishlist item" });
    }
  };
}

module.exports = {
  getAllWishlistItems,
  getWishlistItemById,
  addWishlistItem,
  deleteWishlistItem
};
