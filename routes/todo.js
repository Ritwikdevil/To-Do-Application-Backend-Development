const express = require('express');
const auth = require('../middleware/auth');
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

const router = express.Router();

// CRUD Operations for To-Do
router.post('/', auth, createTodo); // Create
router.get('/', auth, getTodos); // Read with filters
router.get('/:id', auth, getTodoById); // Read by ID
router.put('/:id', auth, updateTodo); // Update
router.delete('/:id', auth, deleteTodo); // Soft delete

// Additional Features:
router.put('/assign-category/:id', auth, assignCategory); // Assign category
router.get('/due-reminders', auth, fetchDueReminders); // Due date reminders
router.get('/search', auth, searchTodos); // Search functionality


module.exports = router;
