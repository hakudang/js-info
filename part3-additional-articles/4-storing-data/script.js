const taskInput = document.querySelector('.task-input input');
const filters = document.querySelectorAll('.filters span');
const clearAll = document.querySelector('.clear-btn');
const taskBox = document.querySelector('.task-box');

let isEditTask = false;
let editId;
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
    
    // active/deactive clear-btn và xử lý overflow
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
    
    // cập nhật bộ đếm
    updateCounters();
}

showTodo('all');

function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add('show');
    document.addEventListener('click', e => {
        if (e.target != selectedTask) {
            menuDiv.classList.remove('show');
        }
    });
}
taskInput.addEventListener('keyup', e => {
    let input = taskInput.value.trim();
    let logName;
    if (e.key == 'Enter' && input) {
        if (!isEditTask) {
            // nếu todos chưa có thì gán mảng rỗng
            todos = !todos ? [] : todos;
            let taskInfo = { name: input, status: "pending" };
            todos.push(taskInfo);
            logName = 'Added: ';
        } else {
            isEditTask = false;
            todos[editId].name = input;
            logName = 'Edited: ';
        }

        taskInput.value = "";
        // lưu vào localStorage
        localStorage.setItem('todo-list', JSON.stringify(todos));
        showTodo(document.querySelector('span.active').id);
        // reload console log
        console.log(logName);
        console.log(todos);
    }

})

clearAll.addEventListener('click', () => {
    isEditTask = false;
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
    
    updateCounters();

    localStorage.setItem('todo-list', JSON.stringify(todos));
    // reload console log 
    console.log('Updated status: ');
    console.log(todos);
}

function editTask(id, name) {
    editId = id;
    isEditTask = true;
    taskInput.value = name;
    taskInput.focus();
    taskInput.classList.add('active');
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo(filter);
    // reload console log
    console.log('Deleted: ');
    console.log(todos);
}

function updateCounters() {
    const totalCounter = todos ? todos.length : 0;
    const completedCounter = todos ? todos.filter(todo => todo.status === 'completed').length : 0;
    const pendingCounter = todos ? todos.filter(todo => todo.status === 'pending').length : 0;
    document.getElementById('total-count').innerText = totalCounter;
    document.getElementById('completed-count').innerText = completedCounter;
    document.getElementById('pending-count').innerText = pendingCounter;
}