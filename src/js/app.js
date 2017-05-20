//todolist creation methods
const todoList = {
  todos: [],
  addTodo(todoText) {
    todoList.todos.push({todoText, completed: false});
  },
  changeTodo(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted(position) {
    const todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll() {
    const totalTodos = this.todos.length;
    let completedTodos = 0;
    for (let i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    if (completedTodos === totalTodos) {
      for (let j = 0; j < totalTodos; j++) {
        this.todos[j].completed = false;
      }
    } else {
      for (let l = 0; l < totalTodos; l++) {
        this.todos[l].completed = true;
      }
    }
  }
};
//recieve input data and apply creation methods
const handlers = {
  addTodo: () => {
    const inputContent = document.querySelector("#addTodoTextInput");
    todoList.addTodo(inputContent.value);
    inputContent.value = "";
    view.displayTodos();
  },
  changeTodo: () => {
    const changePosition = document.querySelector("#todoPositionInput");
    const newContent = document.querySelector("#changeTodoTextInput");
    todoList.changeTodo(changePosition.valueAsNumber, newContent.value);
    changePosition.value = "";
    newContent.value = "";
    view.displayTodos();
  },
  deleteTodo: (position) => {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleTodo: () => {
    const togglePosition = document.querySelector("#toggleTodoPositionInput");
    todoList.toggleCompleted(togglePosition.valueAsNumber);
    togglePosition.value = "";
    view.displayTodos();
  },
  toggleAll: () => {
    todoList.toggleAll();
    view.displayTodos();
  }
};
//data display methods
const view = {
  displayTodos() {
    const todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (let i = 0; i < todoList.todos.length; i++) {
      const todosLi = document.createElement('li');
      const todo = todoList.todos[i];
      let todoTextCompletion = '';

      if (todo.completed === true) {
        todoTextCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextCompletion = '( ) ' + todo.todoText;
      }

      todosLi.id = i;
      todosLi.textContent = todoTextCompletion;
      todosLi.appendChild(this.createDeleteBtn());
      todosUl.appendChild(todosLi);
    }
  },
  createDeleteBtn: () => {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';
    return deleteBtn;
  },
  setUpEventListeners: () => {
    const todoUl = document.querySelector('ul');

    todoUl.addEventListener('click', (event) => {

      const elementClicked = event.target;

      if (elementClicked.className === 'deleteBtn') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    })
  }
};

view.setUpEventListeners();
