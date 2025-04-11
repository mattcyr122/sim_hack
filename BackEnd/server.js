const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;


// Load dummy data
const users = JSON.parse(fs.readFileSync('./data/users.json'));
const events = JSON.parse(fs.readFileSync('./data/events.json'));
const wishlistItems = JSON.parse(fs.readFileSync('./data/wishlist_items.json'));
const contributors = JSON.parse(fs.readFileSync('./data/contributors.json'));
const contributions = JSON.parse(fs.readFileSync('./data/contributions.json'));



// Example routes
app.get('/', (req, res) => {
  res.send('SmartGifter API is running 🚀');
});

app.get('/api/users', (req, res) => {
  res.json(users);
});


app.get('/api/events', (req, res) => {
  res.json(events);
});

app.get('/api/wishlist', (req, res) => {
    res.json(wishlistItems);
  });

app.get('/api/contributors', (req, res) => {
  res.json(contributors);
});


app.get('/api/contributions', (req, res) => {
  res.json(contributions);
});


// LOGIN ROUTE
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(
    (user) => user.username === username && user.password === password
  );

  if (userExists) {
    res.json({ authentication: true,
      message: 'Login successful!',
      user: {
        username: userExists.username,
        email: userExists.email
      },
     }); // Or you could return user info here
  } else {
    res.json({ authentication: false });
  }
});




app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
