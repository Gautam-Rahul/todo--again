const inputBox = document.getElementById("inputBox");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

let editTodoo = null;

const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something in your Todo");
    return false;
  }

  if (addButton.value === "Edit") {
    editTodoo.target.previousElementSibling.innerHTML = inputText;
    addButton.value = "Add";
    inputBox.value = "";
  } else {
    // Creating a list item
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // Creating Edit Button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    // Creating Delete Button
    const deletBtn = document.createElement("button");
    deletBtn.innerText = "Remove";
    deletBtn.classList.add("btn", "deletBtn");
    li.appendChild(deletBtn);

    todoList.appendChild(li);
    inputBox.value = "";
    saveLocalTodos(inputText);
  }
};

const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);

    const todos = getLocalTodos();
    const index = Array.from(todoList.children).indexOf(e.target.parentElement);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addButton.value = "Edit";
    editTodoo = e;
  }
};

const saveLocalTodos = (todo) => {
  let todos = getLocalTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

addButton.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
