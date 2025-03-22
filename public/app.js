document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const todoList = document.getElementById('todo-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');

    // Load tasks when page loads
    fetchTasks();

    // Add task event listener
    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Fetch all tasks from the server
    async function fetchTasks() {
        try {
            const response = await fetch('/api/tasks');
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    // Render tasks in the DOM
    function renderTasks(tasks) {
        todoList.innerHTML = '';
        tasks.forEach(task => {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            todoItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="todo-text ${task.completed ? 'completed' : ''}">${task.title}</span>
                <button class="delete-btn">Delete</button>
            `;

            // Add event listener for checkbox
            const checkbox = todoItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => {
                updateTask(task._id, task.title, checkbox.checked);
            });

            // Add event listener for delete button
            const deleteBtn = todoItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                deleteTask(task._id);
            });

            todoList.appendChild(todoItem);
        });
    }

    // Add a new task
    async function addTask() {
        const title = newTaskInput.value.trim();
        if (!title) return;

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            });
            const newTask = await response.json();
            newTaskInput.value = '';
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    // Update a task
    async function updateTask(id, title, completed) {
        try {
            await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, completed })
            });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    // Delete a task
    async function deleteTask(id) {
        try {
            await fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }
}); 