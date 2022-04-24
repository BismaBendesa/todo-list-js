const parentLists = document.querySelector("[data-lists]");
const listForm = document.querySelector("[data-new-list-form]");
const listInput = document.querySelector("[data-new-list-input]");

const LOCAL_STORAGE_LIST_KEY = "task.lists";

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

const createList = (listName) => {
  return { id: Date.now().toString(), taskName: listName, tasks: [] };
};

function saveAndRender() {
  console.log(Date.now());
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

function render() {
  clearElement(parentLists);
  lists.forEach((list) => {
    const li = document.createElement("li");
    li.innerText = list.taskName;
    li.dataset.listId = list.id;
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
