const fs = require("fs").promises;
const contributionsFilePath = "./data/contributions.json";

// GET all contributions by username (or optionally filter by item_id)
function getContributions() {
  return async function (req, res) {
    try {
      const data = await fs.readFile(contributionsFilePath, "utf-8");
      const contributions = JSON.parse(data);

      const { username, item_id } = req.query;

      let filtered = contributions;
      if (username) {
        filtered = filtered.filter(c => c.username === username);
      }
      if (item_id) {
        filtered = filtered.filter(c => c.item_id == item_id);
      }

      res.json(filtered);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to read contributions data" });
    }
  };
}

// POST a new contribution
function addContribution() {
  return async function (req, res) {
    const { event_id, username, item_id, amount } = req.body;

    if (!event_id || !username || !item_id || !amount) {
      return res.status(400).json({ error: "Missing contribution data in request body." });
    }

    try {
      const data = await fs.readFile(contributionsFilePath, "utf-8");
      const contributions = JSON.parse(data);

      const newContribution = { event_id, username, item_id, amount: parseFloat(amount) };
      contributions.push(newContribution);

      await fs.writeFile(contributionsFilePath, JSON.stringify(contributions, null, 2));
      res.status(201).json({ message: "Contribution added", contribution: newContribution });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add contribution." });
    }
  };
}

module.exports = {
  getContributions,
  addContribution
};
