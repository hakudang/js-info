const taskInput = document.querySelector('.task-input input');
const filters = document.querySelectorAll('.filters span');
const clearAll = document.querySelector('.clear-btn');
const taskBox = document.querySelector('.task-box');

let isEditTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('span.active').classList.remove('active');
        btn.classList.add('active');
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTag = '';
    if (todos) {
        todos.forEach((todo, id) => {
            let checked = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == 'all' || !filter) {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${checked}>
                                <p class="${checked}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
}

showTodo('all');

taskInput.addEventListener('keyup', e => {
    let input = taskInput.value.trim();
    if (e.key == 'Enter' && input) {
        if (!isEditTask) {
            // nếu todos chưa có thì gán mảng rỗng
            todos = !todos ? [] : todos;
            let taskInfo = { name: input, status: "pending" };
            todos.push(taskInfo);
        }
        taskInput.value = "";
        // lưu vào localStorage
        localStorage.setItem('todo-list', JSON.stringify(todos));
        showTodo(document.querySelector('span.active').id);
        // reload console log
        console.log('Added: ');
        console.log(todos);
    }

})

clearAll.addEventListener('click', () => {
    todos.splice(0, todos.length);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo();
    // reload console log
    console.log('Cleared');
    console.log(todos);
})


function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add('checked');
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove('checked');
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem('todo-list', JSON.stringify(todos));
    // reload console log 
    console.log('Updated status: ');
    console.log(todos);
}