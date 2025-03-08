let taskCounter = 0;
let completedTaskCount = 0;

function readTextFromInputField() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText) {
    addTaskToColumn('backlogList', taskText);
    taskInput.value = '';
    // updateStats();
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
  // updateStats();
}

function createTaskItem(text) {
  // here I am creating the task item (div) jiske andar 1 task hoga
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  taskItem.draggable = true;
  taskItem.ondragstart = dragStart;

  // created a checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = generateID()
  checkbox.onclick = function() { cutTheJob(this.id) }

  // created p element
  const taskText = document.createElement('p');
  taskText.classList.add('task-text');
  taskText.innerText = text;

  // created my delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.id = generateIDButton();
  deleteButton.classList.add('delete-button');
  deleteButton.onclick = function() { deleteTask(this.id) }

  taskItem.append(checkbox, taskText, deleteButton);

  // appending all of them to my li
  const listItem = document.createElement('li');
  listItem.appendChild(taskItem);

  let totalTask = countTotalTasks(1);
  document.getElementById("totalTasks").innerHTML = `Total Tasks: ${totalTask}`;

  return listItem;
}

function countTotalTasks(action) {
  if (action === 1) {
      // for adding task
      taskCounter += 1;
      return taskCounter;
  
  } else {
      // for deletion of task
      taskCounter -= 1;
      return taskCounter;
  } 
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
  console.log(liToBeDeleted)

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

  // console.log(liToBeDeleted)
}

function cutTheJob(ID) {
  let flag = false;
  const triggeredTask = document.getElementById(ID);
  const parentDiv = triggeredTask.parentElement
      
  if (triggeredTask.checked) {
      completedTaskCount += 1;
      parentDiv.querySelector("p").classList.add("task-textc")
      // If the task is in either doing or progress it should move to done automatically


      
    } else {
      completedTaskCount -= 1;
      if (completedTaskCount < 0) {
        completedTaskCount = 0;
      }
      // then I need to remove it form Done
      
      parentDiv.querySelector("p").classList.remove("task-textc")
    }
  
  const completedTasks = document.getElementById("completedTasks");
  completedTasks.innerHTML = `Completed: ${completedTaskCount}`
}


// Drag & Drop Logic
let dragStartFrom;

function dragStart(event) {
  event.dataTransfer.setData('text', event.target.parentElement.outerHTML); // need to understand

  // console.log(`from dragStart ${event.target.parentElement.outerHTML}`)

  // done to specify data and type
  dragStartFrom = event.target.parentElement;
  // console.log(event.target.parentElement)
  // updateStats();
}

function allowDrop(event) {
  event.preventDefault();
  // abhi nhi pata ki kyu use kiya tha but imp hai iske bina mera element gayab ho ja rha thaa
}


function dropColumn(column) {
  if (column == "backlog" || column == "inProgress" || column == "done") {
    return true;

  } else {
    return false;
  }
}


function drop(event, column) {
  let correctDropLocation = dropColumn(column);

  if (correctDropLocation) {

    // if (column != "done") {
    setTimeout(() => dragStartFrom.remove(), 0);
    const data = event.dataTransfer.getData('text/plain');
    console.log(data)
    document.getElementById(column + 'List').insertAdjacentHTML('afterbegin', data);
    // data will be added on top
    // now till here eak baar drag and drop phir uske baad nhi
    
    refreshDraggableItems();
    
    // }

  }
}

function refreshDraggableItems() {  
  document.querySelectorAll('.task-item').forEach(item => {
    // console.log(item.parentElement)
    item.ondragstart = dragStart;
    // taki phir se drag kar paun

    // const checkbox = item.querySelector('input[type="checkbox"]');
    // const taskText = item.querySelector('.task-text');

    const deleteButton = item.querySelector('button')
    deleteButton.onclick = function() { deleteTask(this.id) }

    const checkbox = item.querySelector('input')
    checkbox.onclick = function() { cutTheJob(this.id) }

    // if (taskText.classList.contains('completed')) {
    //   checkbox.checked = true;
    // }
  });
}

document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    this.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });