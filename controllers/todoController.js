const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  const { title, description, dueDate, priority, category } = req.body;

  try {
    // Check for required fields
    if (!title && !dueDate) {
      return res.status(400).json({ message: 'Title and due date are required' });
    }

    // Create a new todo
    const todo = new Todo({
      title,
      description,
      dueDate,
      priority,
      category,
      user: req.user._id,
    });

    // Save the todo to the database
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

exports.assignCategory = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id, isDeleted: false },
      { category },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: 'To-Do not found' });

    res.status(200).json({ message: 'Category assigned successfully', todo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchDueReminders = async (req, res) => {
  const currentDate = new Date();
  const dueDateThreshold = new Date();
  dueDateThreshold.setDate(currentDate.getDate() + 3); // Next 3 days

  try {
    const todos = await Todo.find({
      user: req.user._id,
      isDeleted: false,
      dueDate: { $gte: currentDate, $lte: dueDateThreshold },
    }).sort('dueDate');

    res.status(200).json({ message: 'Upcoming due tasks', todos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchTodos = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: 'Keyword is required for search' });
  }

  try {
    const todos = await Todo.find({
      user: req.user._id,
      isDeleted: false,
      $or: [
        { title: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in title
        { description: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in description
      ],
    });

    res.status(200).json({ message: 'Search results', todos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
