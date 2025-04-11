// Handles LOGIN and SIGNUP requests

// const sql = require("tedious").Connection;
// var Request = require("tedious").Request;
// const TYPES = require("tedious").TYPES;
// // const config = require("./MSSQLconfig.json");
const fs = require('fs');



// Load dummy data
const users = JSON.parse(fs.readFileSync('./data/users.json'));

// Handle the login form submission
function authenticateUser(app) {
  
  return function (req, res) {
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
  };
}

module.exports = {authenticateUser}
