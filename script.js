let todos = JSON.parse(localStorage.getItem("todos")) || [];

function searchTodos() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  let filterTodos = todos.filter((todo) =>
    todo.todo.toLowerCase().includes(searchInput)
  );
  displayTodos(filterTodos);
}

function addTodo(e) {
  e.preventDefault();
  const todoInput = document.getElementById("todo-input");
  const todoText = todoInput.value;

  if (todoText === "") {
    alert("Todo cannot be empty!");
    return;
  }

  let todo = {
    id: Date.now(),
    todo: todoText,
    completed: false,
  };

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));

  todoInput.value = "";
  displayTodos();
}

function displayTodos(filterTodos = todos) {
  const todoList = document.getElementById("todo-item");
  todoList.innerHTML = "";

  filterTodos.map((todo) => {
    const todoItem = document.createElement("div");

    todoItem.className =
      "flex justify-between items-center p-4 rounded-lg shadow-lg mb-2 mx-auto max-w-xl";

    const div1 = document.createElement("div");
    div1.className = "flex gap-5";
    const div2 = document.createElement("div");
    div2.className = "flex gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className = "checkbox checkbox-primary";
    checkbox.onclick = () => toggleTodo(todo.id);

    const todoTextContainer = document.createElement("div");
    todoTextContainer.className = "flex-grow";

    const todoText = document.createElement("span");
    todoText.textContent = todo.todo;
    todoText.className = `cursor-pointer ${
      todo.completed ? "line-through text-gray-400" : ""
    }`;

    const todoInput = document.createElement("input");
    todoInput.type = "text";
    todoInput.value = todo.todo;
    todoInput.className = "w-full border-none outline-none hidden";

    const saveButton = document.createElement("button");
    saveButton.textContent = "📁";
    saveButton.className =
      "btn btn-sm btn-outline btn-success hover:bg-success-focus ml-2 hidden";

    saveButton.onclick = () => {
      saveTodoText(todo.id, todoInput.value);
      toggleEditMode(false, todoInput, todoText, saveButton, editButton);
    };

    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.className =
      "btn btn-sm btn-outline btn-info hover:bg-info-focus";
    editButton.disabled = todo.completed;
    editButton.onclick = () => {
      const isEditing = todoInput.classList.contains("hidden");
      toggleEditMode(isEditing, todoInput, todoText, saveButton, editButton);
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✖️";
    deleteButton.className =
      "btn btn-sm btn-outline btn-error hover:bg-error-focus";
    deleteButton.onclick = () => deleteTodo(todo.id);

    todoTextContainer.appendChild(todoText);
    todoTextContainer.appendChild(todoInput);
    div1.appendChild(checkbox);
    div1.appendChild(todoTextContainer);
    div2.appendChild(editButton);
    div2.appendChild(saveButton);
    div2.appendChild(deleteButton);

    todoItem.appendChild(div1);

    todoItem.appendChild(div2);

    todoList.appendChild(todoItem);
  });
}

function toggleTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodos();
}

function saveTodoText(id, newText) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      todo.todo = newText;
    }
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodos();
}

function toggleEditMode(
  isEditing,
  todoInput,
  todoText,
  saveButton,
  editButton
) {
  todoText.classList.toggle("hidden", isEditing);
  todoInput.classList.toggle("hidden", !isEditing);
  saveButton.classList.toggle("hidden", !isEditing);
  editButton.classList.toggle("hidden", isEditing);

  if (isEditing) {
    todoInput.focus();
  }
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodos();
}

displayTodos();
