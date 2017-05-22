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

    //get all completed todos
    this.todos.forEach(todo => {
      if (todo.completed === true)
        completedTodos++;
      }
    );

    this.todos.forEach(todo => {
      if (completedTodos === totalTodos)
        todo.completed = false;
      else
        todo.completed = true;
      }
    );
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

    todoList.todos.forEach(function(todo, position) {
      const todosLi = document.createElement('li');
      let todoTextCompletion = '';

      if (todo.completed === true) {
        todoTextCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextCompletion = '( ) ' + todo.todoText;
      }

      todosLi.id = position;
      todosLi.textContent = todoTextCompletion;
      todosLi.appendChild(this.createDeleteBtn());
      todosUl.appendChild(todosLi);
    }, this);
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
