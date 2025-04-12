const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
// const path = require("path");;
const { authenticateUser } = require("./routes/authentication.js");
// const { getSimilarProducts } = require("./routes/getSimilarity.js");

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

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", authenticateUser());
// app.post("/search", getSimilarProducts());

//basic login form
app.get("/", function (req, res) {
  //app.use(express.static(path.join(__dirname, "dist")));
  //res.sendFile(path.join(__dirname, "dist", "index.html"));
  res.send("hello world");
});

const eventRoutes = require("./routes/events");
const contributorRoutes = require("./routes/contributors");
const contributionRoutes = require("./routes/contributions");
const wishlistRoutes = require("./routes/wishlists");


app.use("/events", contributorRoutes);
// app.use("/events/:event_id/contributors", contributorRoutes);
app.use("/events/:event_id/contributions", contributionRoutes);
app.use("/events/:event_id/wishlists", wishlistRoutes); 

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
