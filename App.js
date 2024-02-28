import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTask = () => {
    axios.post('/tasks', { title })
      .then(res => {
        setTasks([...tasks, res.data]);
        setTitle('');
      })
      .catch(err => console.error(err));
  };

  const deleteTask = id => {
    axios.delete(`/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="task-form">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter task title" />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id}>
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
