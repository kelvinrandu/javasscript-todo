const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);

function addTodo(e){
    e.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const todoUl = document.createElement('li');
    todoUl.innerText = todoInput.value;
    todoUl.classList.add('todo-item');
    saveToLocal(todoInput.value);
    
    todoDiv.appendChild(todoUl);
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check">complete</i>'
    completeBtn.classList.add('complete-btn');
 
    todoDiv.appendChild(completeBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash">delete</i>'
    trashBtn.classList.add('trash-btn');

    todoDiv.appendChild(trashBtn);
    todoList.appendChild(todoDiv);
    todoInput.value = '';
    

}

function deleteTodo(e){

    const item = e.target;
    if (item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo)
        todo.addEventListener('transitionend' , function(){
        todo.remove();
        })      

    }
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");

    }

}
function filterTodo(e){
    const todos =todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display= 'flex';
                
                break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        todo.style.display= 'flex';
                        
                    } else {
                        todo.style.display= 'none';
                        
                    }
                
                    break;  
                    case "uncompleted":
                        if (!todo.classList.contains('completed')) {
                            todo.style.display= 'flex';
                            
                        } else {
                            todo.style.display= 'none';
                            
                        }
                        
                        break;      
            default:
                break;
        }

    })
    console.log(todos);
}

function saveToLocal(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos =[];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}
function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos =[];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const todoUl = document.createElement('li');
        todoUl.innerText = todo;
        todoUl.classList.add('todo-item'); 
        
        todoDiv.appendChild(todoUl);
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '<i class="fas fa-check">complete</i>'
        completeBtn.classList.add('complete-btn');
     
        todoDiv.appendChild(completeBtn);
    
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash">delete</i>'
        trashBtn.classList.add('trash-btn');
    
        todoDiv.appendChild(trashBtn);
        todoList.appendChild(todoDiv);

    });

}
function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos =[];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}