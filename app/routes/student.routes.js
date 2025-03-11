module.exports = app => {
  const students = require("../controllers/student.controller.js");

  const router = require("express").Router();

  // Create a new student
  router.post("/", students.create);
  // Retrieve all students
  router.get("/", students.findAll);
  // Retrieve a single student with id
  router.get("/:id", students.findOne)
  // Update a student with id
  router.put("/:id", students.update);
  // Delete a student with id
  router.delete("/:id", students.delete);
  // Delete all students
  router.delete("/:id", students.deleteAll);

  // Prefix routes with /api
  app.use('/api/students', router);
}