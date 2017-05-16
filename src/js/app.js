
const todoList = {
  todos: [],
  addTodo(todoText) {
    todoList.todos.push({
      todoText,
      completed: false
    });
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
    for(let i = 0; i < totalTodos; i++){
      if (this.todos[i].completed === true){
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

const handlers = {
  addTodo: ()=>{
    const inputContent = document.querySelector("#addTodoTextInput");
    todoList.addTodo(inputContent.value);
    inputContent.value= "";
    view.displayTodos();
  },
  changeTodo: ()=>{
    const changePosition = document.querySelector("#todoPositionInput");
    const newContent = document.querySelector("#changeTodoTextInput");
    todoList.changeTodo(changePosition.valueAsNumber, newContent.value);
    changePosition.value= "";
    newContent.value = "";
    view.displayTodos();
  },
  deleteTodo: ()=>{
    const deletePosition = document.querySelector("#deleteTodoPositionInput");
    todoList.deleteTodo(deletePosition.valueAsNumber);
    deletePosition.value = "";
    view.displayTodos();
  },
  toggleTodo: ()=>{
    const togglePosition = document.querySelector("#toggleTodoPositionInput");
    todoList.toggleCompleted(togglePosition.valueAsNumber);
    togglePosition.value = "";
    view.displayTodos();
  },
  toggleAll: ()=>{
    todoList.toggleAll();
    view.displayTodos();
  }
};

const view = {
  displayTodos: ()=>{
    const todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++){
      const todosLi = document.createElement('li');
      const todo = todoList.todos[i];
      let todoTextCompletion = '';

      if (todo.completed === true) {
        todoTextCompletion = '(x) ' + todo.todoText;
      }
      else {
        todoTextCompletion = '( ) ' + todo.todoText;
      }

      todosLi.textContent = todoTextCompletion;
      todosUl.appendChild(todosLi);
    }
  }
};
