const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/task_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Task Model
const Task = mongoose.model('Task', { title: String });

// Routes
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) res.status(404).send('Task not found');
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
