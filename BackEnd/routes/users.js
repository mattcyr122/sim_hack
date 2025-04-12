const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const usersFilePath = path.join(__dirname, "../data/users.json");

// Helper: Read users
function readUsersFile() {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
}

// Helper: Write users
function writeUsersFile(data) {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
}

// ✅ GET /users?username=alice123
router.get("/", (req, res) => {
  const { username } = req.query;
  const users = readUsersFile();

  const safeUsers = users.map(({ username, email }) => ({ username, email }));

  if (username) {
    const filtered = safeUsers.filter((u) => u.username === username);
    return res.json(filtered);
  }

  res.json(safeUsers);
});

// ✅ POST /addUser
router.post("/addUser", (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "Missing username, password, or email." });
  }

  const users = readUsersFile();

  if (users.some((u) => u.username === username)) {
    return res.status(400).json({ error: "Username already exists." });
  }

  const newUser = { username, password, email };
  users.push(newUser);
  writeUsersFile(users);

  res.status(201).json({
    message: "User created.",
    user: {
      username: newUser.username,
      email: newUser.email,
    },
  });
});

module.exports = router;
