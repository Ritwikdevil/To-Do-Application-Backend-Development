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


exports.getTodos = async (req, res) => {
  const { status, priority, category, sortBy = 'dueDate', order = 'asc', page = 1, limit = 10 } = req.query;

  const filters = { user: req.user._id, isDeleted: false };
  if (status) filters.status = status;
  if (priority) filters.priority = priority;
  if (category) filters.category = category;

  try {
    const todos = await Todo.find(filters)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalTodos = await Todo.countDocuments(filters);

    res.status(200).json({ todos, total: totalTodos, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTodoById = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({ _id: id, user: req.user._id, isDeleted: false });
    if (!todo) return res.status(404).json({ message: 'To-Do not found' });

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, status, category } = req.body;

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id, isDeleted: false },
      { title, description, dueDate, priority, status, category },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: 'To-Do not found' });

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//soft delete 
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: 'To-Do not found' });

    res.status(200).json({ message: 'To-Do deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

