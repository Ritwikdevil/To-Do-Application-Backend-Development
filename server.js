const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const todoRoutes = require('./routes/todo');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
    res.json({
      message: "Hello, this is a test API!",
      success: true,
      timestamp: new Date().toISOString(),
    });
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
