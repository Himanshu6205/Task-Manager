let currentPage = 1;
let tasks = [];
let editingTask = null;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === '1234') {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        loadTasks();
    } else {
        alert('Invalid credentials');
    }
}

function logout() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}

function openModal(taskIndex = null) {
    editingTask = taskIndex;
    if (taskIndex !== null) {
        document.getElementById('taskName').value = tasks[taskIndex].name;
        document.getElementById('taskDate').value = tasks[taskIndex].date;
        document.getElementById('taskPriority').value = tasks[taskIndex].priority;
    } else {
        document.getElementById('taskName').value = '';
        document.getElementById('taskDate').value = '';
        document.getElementById('taskPriority').value = 'Medium';
    }
    document.getElementById('taskModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
}

function saveTask() {
    const name = document.getElementById('taskName').value;
    const date = document.getElementById('taskDate').value;
    const priority = document.getElementById('taskPriority').value;
    if (editingTask !== null) {
        tasks[editingTask] = { name, date, priority };
    } else {
        tasks.push({ name, date, priority });
    }
    closeModal();
    loadTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    loadTasks();
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const start = (currentPage - 1) * 5;
    const end = start + 5;
    tasks.slice(start, end).forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${task.name} - ${task.date} - ${task.priority} 
            <button onclick="openModal(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
    });
    document.getElementById('pageNumber').innerText = currentPage;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadTasks();
    }
}

function nextPage() {
    if (currentPage * 5 < tasks.length) {
        currentPage++;
        loadTasks();
    }
}

function searchTasks() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    tasks = tasks.filter(task => task.name.toLowerCase().includes(searchTerm));
    loadTasks();
}

function filterTasks() {
    const filter = document.getElementById('filter').value;
    if (filter === 'all') {
        loadTasks();
    } else {
        tasks = tasks.filter(task => task.priority.toLowerCase() === filter);
        loadTasks();
    }
}

function sortTasks() {
    const sortBy = document.getElementById('sort').value;
    if (sortBy === 'date') {
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    loadTasks();
}

setInterval(loadTasks, 5000);
