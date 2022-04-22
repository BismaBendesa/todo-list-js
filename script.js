const parentLists = document.querySelector("[data-lists]");

let lists = [
  { id: 1, taskName: "Shitting" },
  { id: 2, taskName: "Twerking" },
];

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
