const parentLists = document.querySelector("[data-lists]");
const listForm = document.querySelector("[data-new-list-form]");
const listInput = document.querySelector("[data-new-list-input]");

let lists = [
  { id: 1, taskName: "Shitting", tasks: [] },
  { id: 2, taskName: "Twerking", tasks: [] },
];

const createList = (listName) => {
  return { id: Date.now().toString(), taskName: listName, tasks: [] };
};

listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = listInput.value;
  if (listName == null || listName === "" || listName === undefined) {
    return;
  } else {
    const list = createList(listName);
    listInput.value = null;
    lists.push(list);
    render();
  }
});

function render() {
  clearElement(parentLists);
  lists.forEach((list) => {
    const li = document.createElement("li");
    li.innerText = list.taskName;
    li.dataset.listId = list.id;
    console.log(list.taskName);
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
