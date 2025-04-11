 const express = require("express");
 const app = express();
  const session = require("express-session");
 const bodyParser = require("body-parser");
// const path = require("path");
// const authenticateUser = require("./login")(app);
// const config = require("./MSSQLconfig.json");
// const sql = require("tedious").Connection;
// var Request = require("tedious").Request;
// const TYPES = require("tedious").TYPES;
// // Use authentication middleware
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.post("/login", authenticateUser);

//basic login form
app.get("/", function (req, res) {
  //app.use(express.static(path.join(__dirname, "dist")));
  //res.sendFile(path.join(__dirname, "dist", "index.html"));
  res.send("hello world")
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
