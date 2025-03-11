const express = require("express");
const app = express();
// add a middleware to parse the request body into JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

require("./app/routes/student.routes.js")(app);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
