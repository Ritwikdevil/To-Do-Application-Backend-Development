const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  const { title, description, dueDate, priority, category } = req.body;
  try {
    const todo = new Todo({
      title,
      description,
      dueDate,
      priority,
      category,
      user: req.user._id,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Additional CRUD methods here
