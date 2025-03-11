// const http = require("http");
// http.createServer().listen(8080);
const express = require("express");
const app = express();

// API - GET, POST, PUT, DELETE
// get is a method type
// app.get("/", (req, res) => {
//   console.log(req);
//   res.end("Hello World Shaik");
// });

// app.post("/app", (req, res) => {
//   // Code to insert new records
//   res.end("Hello Post");
// });

// app.delete("/app", (req, res) => {
//   // Code to delete a record
//   res.end("Hello Delete");
// });

// Middleware
function loggerOne(req, res, next) {
  console.log("New request received - 1");  
  next();
  // Always end the middleware with next()
  // You can access the path parameter and query parameters
}
// function loggerTwo(req, res, next) {
//   console.log("New request received - 2");
//   next();
//   // Always end the middleware with next()
//   // You can access the path parameter and query parameters
// }

// Multiple middleware functions can be chained together

// app.use(loggerOne, loggerTwo);

// Creates a new middleware. Whenever a new request is received, First trigger the logger function and then run the GET request.

const users = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Abd", email: "abd@gmail.com" },
];

// Add your middleware specific to the API. Here the loggerOne is the middleware for the GET request for /users
// app.get("/users", loggerOne, (req, res) => {
app.get("/users", (req, res) => {
  // Query parameters
  // SAMPLE - Try creating an API in which the path paramenter has a space
  const comparingName = req.query.name;
  let results = users;
  if (comparingName) {
    results = users.filter((user) => user.name === comparingName);
  }
  return res.send(results);
});

// Route/Path parameters
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filtered = users.filter((user) => user.id === id);
  return res.send(filtered);
});

app.post("/users", (req, res) => {
  const user = req.body;
  if (!user.id) {
    res.status(500).json({ error: "Id not present" });
  } else {
    users.push(user);
    res.status(200).json({ message: "Success!" });
  }
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUser = req.body;
  users = users.map((user) => {
    if (user.id === id) {
      return { ...user, updatedUser };
    }
    return user;
  });
  return res.send(users);
});

app.get("*", (req, res) => res.json({ error: "API not found" }));

app.listen(8080, () => console.log("Started on port 8080"));

// Try creating an API in which the path paramenter has a space

// Middleware can be used to create requests objects universally in the API. And, It can be accessed univerally in the API.