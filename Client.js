document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Fetch tasks from server and display them
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => addTaskToList(task));
        })
        .catch(error => console.error('Error fetching tasks:', error));

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTaskToList(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '❌';
        removeBtn.addEventListener('click', function() {
            removeTask(task._id);
            taskList.removeChild(li);
        });
        li.appendChild(removeBtn);

        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            updateTaskCompletion(task._id, !task.completed);
        });

        taskList.appendChild(li);
    }

    function addTask(text) {
        fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        })
        .then(response => response.json())
        .then(task => addTaskToList(task))
        .catch(error => console.error('Error adding task:', error));
    }

    function removeTask(id) {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        })
        .catch(error => console.error('Error removing task:', error));
    }

    function updateTaskCompletion(id, completed) {
        fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed })
        })
        .catch(error => console.error('Error updating task completion:', error));
    }
});
