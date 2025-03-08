let taskCounter = 0;
let completedTaskCount = 0;

function readTextFromInputField() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText) {
    addTaskToColumn('backlogList', taskText);
    taskInput.value = '';
    updateStats();
  }
}

function recordEnterStroke(event) {
  if (event.key === 'Enter') {
    readTextFromInputField();
  }
}

function addTaskToColumn(columnId, taskText) {
  const taskList = document.getElementById(columnId);
  const taskItem = createTaskItem(taskText);
  taskList.appendChild(taskItem);
  updateStats();
}

function createTaskItem(text) {
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  taskItem.draggable = true;
  taskItem.ondragstart = dragStart;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onchange = () => toggleTaskCompletion(taskItem, checkbox);

  const taskText = document.createElement('p');
  taskText.classList.add('task-text');
  taskText.innerText = text;

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('delete-button');
  deleteButton.onclick = () => {
    taskItem.parentElement.remove();
    updateStats();
  };

  taskItem.append(checkbox, taskText, deleteButton);

  const listItem = document.createElement('li');
  listItem.appendChild(taskItem);
  return listItem;
}

function toggleTaskCompletion(taskItem, checkbox) {
  const taskText = taskItem.querySelector('.task-text');
  if (checkbox.checked) {
    taskText.classList.add('completed');
  } else {
    taskText.classList.remove('completed');
  }
  updateStats();
}

// Stats Update
function updateStats() {
  taskCounter = document.querySelectorAll('.task-item').length;
  completedTaskCount = document.querySelectorAll('.task-text.completed').length;

  document.getElementById("totalTasks").innerText = `Total Tasks: ${taskCounter}`;
  document.getElementById("completedTasks").innerText = `Completed: ${completedTaskCount}`;
}

// Drag & Drop Logic
function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.parentElement.outerHTML);
  setTimeout(() => event.target.parentElement.remove(), 0);
  updateStats();
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event, column) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  document.getElementById(column + 'List').insertAdjacentHTML('beforeend', data);
  refreshDraggableItems();
  updateStats();
}

function refreshDraggableItems() {
  document.querySelectorAll('.task-item').forEach(item => {
    item.ondragstart = dragStart;

    const checkbox = item.querySelector('input[type="checkbox"]');
    const taskText = item.querySelector('.task-text');
    checkbox.onchange = () => toggleTaskCompletion(item, checkbox);

    if (taskText.classList.contains('completed')) {
      checkbox.checked = true;
    }
  });
}

document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    this.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });