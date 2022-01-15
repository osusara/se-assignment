const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const Todo = require("../models/todo");
const auth = require("../middleware/auth");

// @route   POST api/todos
// @desc    create a todo
// @access  Private
router.post(
  "/",
  auth,
  body("text", "Text cannot be empty").notEmpty(),
  body("status", "Status is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newTodo = new Todo({
        text: req.body.text,
        status: req.body.status,
        user: req.user.id,
      });

      const todo = await newTodo.save();
      res.json(todo);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/todos
// @desc    get all todos
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ date: -1 });
    res.json(todos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/todos/:id
// @desc    delete a todo
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await todo.remove();
    res.json({ msg: "Todo removed" });
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Todo not found" });
    res.status(500).send("Server error");
  }
});

// @route   PUT api/todos/:id
// @desc    change todo status
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    todo.status = req.body.status;
    todo.text = req.body.text;

    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
