const parentLists = document.querySelector("[data-lists]");
const listForm = document.querySelector("[data-new-list-form]");
const listInput = document.querySelector("[data-new-list-input]");
const deleteListBtn = document.querySelector("[data-delete-list]");

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

parentLists.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

deleteListBtn.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  saveAndRender();
});

const createList = (listName) => {
  return { id: Date.now().toString(), taskName: listName, tasks: [] };
};

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render() {
  clearElement(parentLists);
  lists.forEach((list) => {
    const li = document.createElement("li");
    li.innerText = list.taskName;
    li.dataset.listId = list.id;
    if (list.id === selectedListId) {
      li.classList.add("active-list");
    }
    li.classList.add("list-name");
    parentLists.append(li);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
