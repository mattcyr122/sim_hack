// const sql = require("tedious").Connection;
// var Request = require("tedious").Request;
// const TYPES = require("tedious").TYPES;
// // const config = require("./MSSQLconfig.json");

// Handle the login form submission
function authenticateUser(app) {
  return function (req, res) {
    const { username, password } = req.body;
    const connection = new sql(config);
    res.send("success");
    // connection.connect();

    // connection.on("connect", function (err) {
    //   if (err) {
    //     console.error(err);
    //     res.status(500).send("Failed to connect to the database");
    //     return;
    //   }

    //   var request = new Request(
    //     "SELECT access from users where username = @username and password = @password;",
    //     function (err, rowCount, rows) {
    //       if (err) {
    //         console.error(err);
    //         res.status(500).send("Failed to query the database");
    //         return;
    //       }

    //       if (rowCount > 0) {
    //         const access = rows[0][0].value;

    //         // Authentication succeeded, return the access level
    //         res.json({ access: access, success: true });
    //       } else {
    //         // Authentication failed, show an error message
    //         res.status(401).send("Invalid username or password");
    //       }
    //       connection.close();
    //     }
    //   );

    //   request.addParameter("username", TYPES.VarChar, username);
    //   request.addParameter("password", TYPES.VarChar, password);
    //   connection.execSql(request);
    // });
  };
}

module.exports = {authenticateUser}
