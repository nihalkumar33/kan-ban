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
    // here I am creating the task item (div) jiske andar 1 task hoga
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  taskItem.draggable = true;
  taskItem.ondragstart = dragStart;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = generateID()
  checkbox.onclick = function() { cutTheJob(this.id) }

  checkbox.onchange = (event) => toggleTaskCompletion(event);

  const taskText = document.createElement('p');
  taskText.classList.add('task-text');
  taskText.innerText = text;

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.id = generateIDButton();
  deleteButton.classList.add('delete-button');
  deleteButton.onclick = function() { deleteTask(this.id) }

  taskItem.append(checkbox, taskText, deleteButton);

  const listItem = document.createElement('li');
  listItem.appendChild(taskItem);
  return listItem;
}

// I may need to change this full function because I need to do add ID's dynamically
function generateID() {
  return Math.random().toString()
}
// I may need to change this full function because I need to do add ID's dynamically
function generateIDButton() {
  return Math.random().toString()
}

function deleteTask(ID) {
  const triggeredButton = document.getElementById(ID);
  const liToBeDeleted = triggeredButton.parentElement.parentElement
  liToBeDeleted.parentElement.removeChild(liToBeDeleted)

  // Now to update the Total tasks and completed
  const totalTask = document.getElementById("totalTasks")
  const completedTasks = document.getElementById("completedTasks")

  taskCounter -= 1;

  completedTaskCount -= 1;

  if (completedTaskCount < 0) {
      completedTaskCount = 0;
  }

  totalTask.innerHTML = `Total Tasks: ${taskCounter}`
  completedTasks.innerHTML = `Completed: ${completedTaskCount}`



  console.log(liToBeDeleted)
}

function cutTheJob(ID) {
  let flag = false;
  const triggeredTask = document.getElementById(ID);
  const parentDiv = triggeredTask.parentElement
      
  if (triggeredTask.checked) {
      completedTaskCount += 1;
      parentDiv.querySelector("p").classList.add("task-textc")
      
      
  } else {
      completedTaskCount -= 1;
      if (completedTaskCount < 0) {
          completedTaskCount = 0;
      }
      
      parentDiv.querySelector("p").classList.remove("task-textc")

      // parentDiv.getElementsByClassName("task-text")
  }
  
  console.log(completedTaskCount)
  const completedTasks = document.getElementById("completedTasks");
  completedTasks.innerHTML = `Completed: ${completedTaskCount}`
}


function toggleTaskCompletion(event) {
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
  event.dataTransfer.setData('text', event.target.parentElement.outerHTML); // need to understand
  console.log(event.target.parentElement.outerHTML)
  // done to specify data and type
  setTimeout(() => event.target.parentElement.remove(), 0);
  console.log(event.target.parentElement)
  updateStats();
}

function allowDrop(event) {
  event.preventDefault();
  // abhi nhi pata ki kyu use kiya tha but imp hai iske bina mera element gayab ho ja rha thaa
}

function drop(event, column) {
//   event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  document.getElementById(column + 'List').insertAdjacentHTML('afterbegin', data);
  // data will be added on top 
  // now till here eak baar drag and drop phir uske baad nhi


  refreshDraggableItems();
  updateStats();
}

function refreshDraggableItems() {
  document.querySelectorAll('.task-item').forEach(item => {
    item.ondragstart = dragStart;

    // const checkbox = item.querySelector('input[type="checkbox"]');
    // const taskText = item.querySelector('.task-text');
    // checkbox.onchange = () => toggleTaskCompletion(item, checkbox);

    // if (taskText.classList.contains('completed')) {
    //   checkbox.checked = true;
    // }
  });
}

document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    this.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });