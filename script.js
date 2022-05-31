const parentLists = document.querySelector("[data-lists]");
const listForm = document.querySelector("[data-new-list-form]");
const listInput = document.querySelector("[data-new-list-input]");
const deleteListBtn = document.querySelector("[data-delete-list]");
const listTaskContainer = document.querySelector(
  "[data-list-task-display-container]"
);
const listTitle = document.querySelector("[data-list-title]");
const taskCount = document.querySelector("[data-task-count]");
const taskTemplate = document.querySelector("[data-task-template]");
const tasks = document.querySelector("[data-all-tasks]");
const taskForm = document.querySelector("[data-task-form]");
const taskInput = document.querySelector("[data-new-task-input]");
const deleteCompletedTaskBtn = document.querySelector(
  "[data-delete-completed-task]"
);

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";

let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = listInput.value;
  if (listName == null || listName === "" || listName === undefined) {
    return;
  } else {
    const list = createList(listName);
    listInput.value = null;
    lists.push(list);
    saveAndRender();
  }
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskname = taskInput.value;
  const selectedList = lists.find((list) => list.id === selectedListId);
  if (taskname === "" || taskname === null || taskname === undefined) {
    return;
  } else if (selectedList === undefined || selectedList === null) {
    return alert("Please create a list first!");
  } else {
    const task = createTask(taskname);
    taskInput.value = null;
    selectedList.tasks.push(task);
    saveAndRender();
  }
});

function createList(list) {
  return { id: Date.now().toString(), listName: list, tasks: [] };
}

function createTask(task) {
  return { id: Date.now().toString(), taskName: task, complete: false };
}

parentLists.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

tasks.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTask.complete = e.target.checked;
    save();
    renderTaskCount(selectedList);
  }
});

deleteListBtn.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = e.target.dataset.listId;
  saveAndRender();
});

deleteCompletedTaskBtn.addEventListener("click", (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter(
    (task) => task.complete === false
  );
  saveAndRender();
});

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function renderListTask() {
  lists.forEach((list) => {
    const li = document.createElement("li");
    li.innerText = list.listName;
    li.dataset.listId = list.id;
    if (list.id === selectedListId) {
      li.classList.add("active-list");
    }
    li.classList.add("list-name");
    parentLists.append(li);
  });
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(
    (task) => task.complete === false
  ).length;
  const taskString =
    incompleteTaskCount == 0 || incompleteTaskCount == 1 ? "task" : "tasks";
  taskCount.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input[type="checkbox"]');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.taskName);
    tasks.append(taskElement);
  });
}

function render() {
  clearElement(parentLists);
  renderListTask();
  const selectedList = lists.find((list) => list.id === selectedListId);
  if (selectedListId === undefined || selectedListId === undefined) {
    listTaskContainer.style.display = "none";
    console.log("masuk sini ndak?");
  } else {
    listTaskContainer.style.display = "";
    listTitle.innerText = selectedList.listName;
    renderTaskCount(selectedList);
    clearElement(tasks);
    renderTasks(selectedList);
  }
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
