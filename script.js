const inputBox = document.getElementById("inputBox");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

let editTodoo = null;

const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something in your Todo ");
    return false;
  }

  if (addButton.value === "Edit") {
    editTodoo.target.previousElementSibling.innerHTML = inputText;
    addButton.value = "Add";
    inputBox.value = "";
  } else {
    //creating paragraph

    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    //creating Edit Button

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    //creating Delete Button

    const deletBtn = document.createElement("button");
    deletBtn.innerText = "Remove";
    deletBtn.classList.add("btn", "deletBtn");
    li.appendChild(deletBtn);

    todoList.appendChild(li);
    inputBox.value = "";
  }
};

const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addButton.value = "Edit";
    editTodoo = e;
  }
};

addButton.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
