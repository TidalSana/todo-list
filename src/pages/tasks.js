import { getTasks, inboxStorage, getProjectsTask, projectTaskStorage} from './storage';

export default class Task {
    constructor(name, date) {
        this.name = name;
        this.name = date;
    }
    
    // makes button of task, adds datepicker and delete
    static addToDom(taskName, date) {
        // here we select the list where tasks go
        let taskDiv = document.getElementById('task-list');

        const taskItems = document.createElement('li');
        taskItems.classList.add('task-items');
        const span = document.createElement('span');
        span.innerText = taskName;
        
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date-picker-div');


        const paragraph = document.createElement('p');
        paragraph.id = 'due';
        paragraph.textContent = date;

        let delBtn = `<div class='delete-button' onclick='this.parentNode.parentNode.removeChild(this.parentNode); 
        localStorage.setItem("list", document.getElementById("task-list").innerHTML);
        localStorage.getItem("list");
        '><i class='fa-solid fa-trash'></i></div>`;

        const myFragment = document.createRange().createContextualFragment(delBtn);

        dateDiv.appendChild(paragraph);

        taskItems.appendChild(span);
        taskItems.appendChild(dateDiv);
        taskItems.appendChild(myFragment);
        
        taskDiv.appendChild(taskItems);
        
        // grabs current items displayed on screen
        // then displays the items from LS
        getTasks();
        inboxStorage();

        return taskItems;
    }
    static addProjectDom(taskName, date, id) {
        // here we select the list where tasks go
        let taskDiv = document.getElementById(`${id}-task-list`);

        const taskItems = document.createElement('li');
        taskItems.classList.add('task-items');
        const span = document.createElement('span');
        span.innerText = taskName;
        
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date-picker-div');


        const paragraph = document.createElement('p');
        paragraph.id = 'due';
        paragraph.textContent = date;

        let delBtn = `<div class='delete-button' onclick='this.parentNode.parentNode.removeChild(this.parentNode); 
        localStorage.setItem("${id}", document.getElementById("${id}-task-list").innerHTML);
        localStorage.getItem("${id}");
        '><i class='fa-solid fa-trash'></i></div>`;

        const customProject = document.createRange().createContextualFragment(delBtn);

        dateDiv.appendChild(paragraph);

        taskItems.appendChild(span);
        taskItems.appendChild(dateDiv);
        taskItems.appendChild(customProject);
        
        taskDiv.appendChild(taskItems);
        
        // grabs current items displayed on screen
        // then displays the items from LS
        getProjectsTask(id);
        projectTaskStorage(id);

        return taskItems;
    }

    // function ran when button is clicked to add the task
    addTask(task, date) {
        if(task.length > 20) { 
            alert('Too big');
        } else if (task.length < 3) {
            alert('Too short');
        } else if(task.length == 0) {
            alert('Please enter a task');
        } else {
            // we set the constructor value for the instance to name
            this.name = task;
            this.date = date;
            // we then run this function for deleting the specific item 
            // we clicked on
            Task.addToDom(task, date);
        }
        
    }
    addProjectTask(task, date, id) {
        if(task.length > 20) { 
            alert('Too big');
        } else if (task.length < 3) {
            alert('Too short');
        } else if(task.length == 0) {
            alert('Please enter a task');
        } else {
            // we set the constructor value for the instance to name
            this.name = task;
            this.date = date;
            // we then run this function for deleting the specific item 
            // we clicked on
            Task.addProjectDom(task, date, id);
        }
    }
}
