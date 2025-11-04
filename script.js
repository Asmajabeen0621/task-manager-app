const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const task = document.getElementById('task-input').value;
  const priority = document.getElementById('priority').value;
  const deadline = document.getElementById('deadline').value;

  const taskItem = {
    task,
    priority,
    deadline,
  };

  saveTask(taskItem);
  displayTasks();
  form.reset();
});

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';
  tasks.forEach((t, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${t.task}</strong> - ${t.priority} - ${t.deadline || 'No deadline'}
      <button onclick="deleteTask(${index})">Delete</button>`;
    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

displayTasks();