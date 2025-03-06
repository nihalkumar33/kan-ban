let assignedTask;
let taskCounter = 0;
let completedTaskCount = 0;

function readTextFromInputField(key) {
    assignedTask = document.getElementById("taskInput").value;
    
    if (key === '1') {
        addTaskInList();
    }
}

function recordEnterStroke(e) {
    if (e.key === "Enter") {
        readTextFromInputField('0');
        addTaskInList();
    }
}

function addTaskInList() {
    let unorderedListOfTasks = document.getElementById("taskList")
    unorderedListOfTasks.classList.add("task-list")

    
    const taskItemDiv = document.createElement("div")
    const itemCheckbox = document.createElement("input");
    const itemP = document.createElement("p");
    const deleteItemButton = document.createElement("button");
    
    taskItemDiv.classList.add("task-item")
    
    itemCheckbox.type = "checkbox";
    itemCheckbox.id = generateID();
    itemCheckbox.onclick = function() { cutTheJob(this.id) }
    itemCheckbox.classList.add("complete-checkbox")
    
    itemP.classList.add("task-text")
    itemP.innerHTML = assignedTask
    
    deleteItemButton.appendChild(document.createTextNode("Delete"))
    deleteItemButton.classList.add("delete-button")
    deleteItemButton.id = generateIDButton()
    deleteItemButton.onclick = function() { deleteTask(this.id) }
    
    const li = document.createElement("li");
    li.classList.add("empty-list")
    
    li.appendChild(taskItemDiv);
    taskItemDiv.appendChild(itemCheckbox);
    taskItemDiv.appendChild(itemP);
    taskItemDiv.appendChild(deleteItemButton);

    // Now my DOM is ready to be appended to LI
    document.getElementById("taskList").appendChild(li);
    // Till here adding task in list is completed
    
    let totalTask = countTotalTasks(1);
    document.getElementById("totalTasks").innerHTML = `Total Tasks: ${taskCounter}`;
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

// Now I just need to work on Delete button 
// So on triggering delete button 1. Get ID of button, 2. remove it's parent, 3. decrease counters

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