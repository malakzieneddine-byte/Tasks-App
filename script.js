const homeButton = document.getElementById('home');
const taskButton = document.getElementById("tasks");
const settingsButton = document.getElementById('settings');

const homeSec = document.querySelector('.home');
const taskSec = document.querySelector('.tasks');
const listSec = document.querySelector('.task-list');
const settingsSec = document.querySelector('.settings');

function hideAll() {
    homeSec.style.display = 'none';
    taskSec.style.display = 'none';
    listSec.style.display = 'none';
    settingsSec.style.display = 'none';
}

homeButton.addEventListener('click', () => {
    hideAll();
    homeSec.style.display = 'block';

})

taskButton.addEventListener('click', () => {
    hideAll();
    taskSec.style.display = 'block';
    listSec.style.display = 'block';

})

settingsButton.addEventListener('click', () => {
    hideAll();
    settingsSec.style.display = 'block';

})

hideAll();
homeSec.style.display = "block"


const startbutton = document.getElementById('startbtn');

startbutton.addEventListener('click', () => {
    hideAll();
    taskSec.style.display = 'block';
    listSec.style.display = 'block';
})


let tasks = [];
let taskId = 1;

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('task');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
})

function addTask(text) {
    const newTask = {
        id: taskId++,
        text: text,
        done: false
    };

    tasks.push(newTask);
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        emptyState.style.display = 'block';
    }
    else {
        emptyState.style.display = 'none';

        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';
            taskCard.id = 'task-${task.id}';

            if (task.done) {
                taskCard.style.backgroundColor = 'green';
            }
            else {
                taskCard.style.backgroundColor = 'red';

            }

            taskCard.innerHTML = `
                <p>${task.text}</p>
                <button onclick="toggleTask(${task.id})">
                    ${task.done ? 'Mark as Undone' : 'Mark as Done'}
                </button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;

            taskList.appendChild(taskCard);
        })
    }
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);

    if (task) {
        task.done = !task.done;

        renderTasks();
        updateCompletedTaskCount();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);

    renderTasks();
    updateCompletedTaskCount();
}

function updateCompletedTaskCount() {
    const completedCount = tasks.filter(t => t.done).length;

    displayTaskCount.textContent = completedCount;
}



const profileForm = document.getElementById('Profile');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

const displayName = document.getElementById('displayName');
const displayEmail = document.getElementById('displayEmail');
const displayTaskCount = document.getElementById('displayTaskCount');

let userName = 'Not set';
let userEmail = 'Not set';


profileForm.addEventListener('submit', (e) => {
    e.preventDefault();


    userName = nameInput.value.trim();
    userEmail = emailInput.value.trim();

    displayName.textContent = userName;
    displayEmail.textContent = userEmail;


});

updateCompletedTaskCount();


console.log('Script fully loaded');
console.log('All elements check:', {
    profileForm: !!document.getElementById('Profile'),
    displayName: !!document.getElementById('displayName'),
    displayEmail: !!document.getElementById('displayEmail'),
    displayTaskCount: !!document.getElementById('displayTaskCount')
});