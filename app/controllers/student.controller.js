const Student = require('../models/student.model.js');

// Create and Save a new Student
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Student
  const { name, age, grade } = req.body;
  const student = new Student({
    name,
    age,
    grade
  });

  // Save Student in the database
  Student.create(student, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Student."
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single Student with a studentId
exports.findOne = (req, res) => {
  Student.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.studentId}.`
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Retrieve all students from the db
exports.findAll = (req, res) => {
  const title = req.query.title;
  Student.getAll(title, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving students."
      });
    } else {
      res.send(data);
    }
  });
};

// Update a Student identified by the studentId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Student.updateById(req.params.studentId, new Student(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.studentId}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Student with id " + req.params.studentId
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete a Student with the specified studentId in the request
exports.delete = (req, res) => {
  Student.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.studentId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Student with id " + req.params.studentId
        });
      }
    } else {
      res.send({ message: `Student was deleted successfully!` });
    }
  });
};

// Delete all Students from the db
exports.deleteAll = (req, res) => {
  Student.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all students."
      });
    } else {
      res.send({ message: `All Students were deleted successfully!` });
    }
  });
};