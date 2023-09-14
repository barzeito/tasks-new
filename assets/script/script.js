let taskList = [];

let onLoad = () => {
  taskList = loadData();
  createTask();
};

//Create the task with all the data from the form
function submitForm() {
  let taskTitle = document.getElementById("taskTitle").value;
  let taskContent = document.getElementById("taskContent").value;
  let taskTime = document.getElementById("taskTime").value;
  let taskDate = document.getElementById("taskDate").value;

  let data = new Object();
  data.taskTitle = taskTitle;
  data.taskContent = taskContent;
  data.taskTime = taskTime;
  data.taskDate = taskDate;

  taskList.push(data);
  saveData();
  closePopup();
  createTask();

  //reset the form after note is added
  document.getElementById("taskForm").reset();

  //add fadeIN to the added note
  const wrapperFadeIn = document.querySelector(".task:last-child");
  wrapperFadeIn.classList.toggle("fadeIn-task");

  //make sure that the fadeIN remove from the last added note
  setTimeout(function () {
    wrapperFadeIn.classList.remove("fadeIn-task");
  }, 2000);
}

//Clear the Form
function clearFrom(event) {
  event.preventDefault();
  document.getElementById("taskForm").reset();
}

//Build the task body
let createTask = () => {
  let taskNote = document.getElementById("wrapper");
  let task = "";
  for (let i = 0; i < taskList.length; i++) {
    task += `
    <li class="task">
        <div class="header">
          <p>${taskList[i].taskTitle}</p>
        <div class="icon">
          <button onclick="removeTask(${i})" class="btn"><i class="bi bi-x"></i></button>
          </div>
        </div>
        <div class="task-content">
          <span>${taskList[i].taskContent}</span>
          <div>${taskList[i].taskDate}</div>
          <div>${taskList[i].taskTime}</div>
        </div>
      </li>
    `;
  }
  taskNote.innerHTML = task;
  saveData();
};

//Remove a specific task
let removeTask = (index) => {
  let removeConfirm = confirm("Are you sure you want to delete this tasks?");
  if (!removeConfirm) return;
  taskList.splice(index, 1);
  saveData();
  createTask();
};

//Remove all the tasks
let clearTasks = () => {
  let clearConfirm = confirm("Are you sure you want to delete all tasks?");
  if (!clearConfirm) return;
  document.getElementById("wrapper").innerHTML = "";
  taskList = [];
  saveData();
};

// Save and Load the tasks data
const saveData = () => {
  localStorage.setItem("tasksData", JSON.stringify(taskList));
};

const loadData = () => {
  const tasks = localStorage.getItem("tasksData");
  if (tasks) {
    return JSON.parse(tasks);
  }
  return [];
};

//Open and close the form with popup
let openPopup = () => {
  const popupBox = document.querySelector(".popup-box");
  popupBox.classList.add("show");
};

let closePopup = () => {
  const popupBox = document.querySelector(".popup-box");
  popupBox.classList.remove("show");
};
