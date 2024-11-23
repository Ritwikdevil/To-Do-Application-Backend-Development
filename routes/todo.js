const express = require('express');
const auth = require('../middleware/auth');
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  assignCategory,
  fetchDueReminders,
  searchTodos
} = require('../controllers/todoController');

const router = express.Router();


// Additional Features:
router.get('/due-reminders', auth, fetchDueReminders); // Due date reminders
router.get('/search', auth, searchTodos); // Search functionality
router.put('/assign-category/:id', auth, assignCategory); // Assign category

// CRUD Operations for To-Do
router.post('/', auth, createTodo); // Create
router.get('/', auth, getTodos); // Read with filters
router.get('/:id', auth, getTodoById); // Read by ID
router.put('/:id', auth, updateTodo); // Update
router.delete('/:id', auth, deleteTodo); // Soft delete




module.exports = router;
