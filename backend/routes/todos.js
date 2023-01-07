const express = require("express");
const {
  createTodo,
  getTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth for all workout routes
router.use(requireAuth);
// GET all workouts
router.get("/", getTodos);

//GET a single workout
router.get("/:id", getTodo);

// POST a new workout
router.post("/", createTodo);

// DELETE a workout
router.delete("/:id", deleteTodo);

// UPDATE a workout
router.patch("/:id", updateTodo);

module.exports = router;
