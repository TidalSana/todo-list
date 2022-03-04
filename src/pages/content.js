import { format, addDays } from 'date-fns';
import Task from './tasks';

let inboxButtons = function() {
    const contentInbox = document.getElementById('main-container');
    
    // placeholder to catch input text
    let taskName;
    let taskDate;

    // we put placeholder data in the list
    let element = new Task();

    // hidden div to take input for adding tasks 
    const addContainer = document.createElement('div');
    addContainer.classList.add('add-container-div');
    addContainer.classList.add('close')

    // input section for task names
    const textSection = document.createElement('input');
    textSection.id = 'input-add-task';
    textSection.placeholder = 'Task name...';
    textSection.addEventListener('input', function(e) {
        taskName = this.value;
    }); 

    addContainer.appendChild(textSection);

    // section for date picker 
    const datePicker = document.createElement('input');
    datePicker.type = 'date';
    datePicker.id = 'date-picker';
    datePicker.addEventListener('change', function() {
        let date = new Date(datePicker.valueAsDate);
        console.log(date);
        let currentDate = addDays(date, 1);
        let formattedDate = format(currentDate, 'MM/dd/yyyy');
        taskDate = formattedDate;

        console.log(formattedDate)
    });

    addContainer.appendChild(datePicker);

    // button that says 'add tasks'
    const tasksButton = document.createElement('button');
    const plusPanel = document.createElement('div');
    plusPanel.classList.add('left-panel');
    plusPanel.innerHTML = '<i class="fa-solid fa-plus"></i>';
    
    tasksButton.classList.add('task-add');
    tasksButton.textContent = 'Add task';
    // listens for when the button is clicked
    // which then removes it from the screen and 
    // displays the other div
    tasksButton.addEventListener('click', () => {
        addContainer.classList.remove('close');
        tasksButton.classList.add('close');
    });

    // div that shows up after "add tasks is clicked"
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container-tasks');

    addContainer.appendChild(buttonContainer);

    // for adding tasks
    const addButton = document.createElement('button');
    addButton.classList.add('buttons-tasks-add');
    addButton.id = 'add-task';
    addButton.textContent = 'Add';
    // pushes the values entered in the text box into an 
    // array or something
    addButton.addEventListener('click', () => {
        if (datePicker.valueAsDate === null) {
            taskDate = 'No due date';
        }
        element.addTask(taskName, taskDate);
        addContainer.classList.add('close');
        tasksButton.classList.remove('close');
        
    });
    textSection.addEventListener('keydown', (event) => {
        if (datePicker.valueAsDate === null) {
            taskDate = 'No due date';
        }
        if(event.key === 'Enter') {
            element.addTask(taskName, taskDate);
            addContainer.classList.add('close');
            tasksButton.classList.remove('close');
        }
    });

    // for canceling task additions
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('buttons-tasks-add');
    cancelButton.id = 'cancel-task';
    cancelButton.textContent = 'Cancel';
    // listens for click to show previous div (task button)
    cancelButton.addEventListener('click', function() {
        addContainer.classList.add('close');
        tasksButton.classList.remove('close');
        console.log('clicked');
    });

    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(cancelButton);
    contentInbox.appendChild(tasksButton);
    tasksButton.appendChild( plusPanel);
    
    return addContainer;
};
let projectButtonsContainer = function(identifier){ 
    const contentInbox = document.getElementById('main-container');
    
    // placeholder to catch input text
    let taskName;
    let taskDate;

    // we put placeholder data in the list
    let project = new Task();

    // hidden div to take input for adding tasks 
    const addContainer = document.createElement('div');
    addContainer.classList.add('add-container-div');
    addContainer.classList.add('close')

    // input section for task names
    const textSection = document.createElement('input');
    textSection.id = 'input-add-task';
    textSection.placeholder = 'Task name...';
    textSection.addEventListener('input', function(e) {
        taskName = this.value;
    }); 

    addContainer.appendChild(textSection);

    // section for date picker 
    const datePicker = document.createElement('input');
    datePicker.type = 'date';
    datePicker.id = 'date-picker';
    datePicker.addEventListener('change', function() {
        let date = new Date(datePicker.valueAsDate);
        console.log(date);
        let currentDate = addDays(date, 1);
        let formattedDate = format(currentDate, 'MM/dd/yyyy');
        taskDate = formattedDate;

        console.log(formattedDate)
    });

    addContainer.appendChild(datePicker);

    // button that says 'add tasks'
    const tasksButton = document.createElement('button');
    const plusPanel = document.createElement('div');
    plusPanel.classList.add('left-panel');
    plusPanel.innerHTML = '<i class="fa-solid fa-plus"></i>';
    
    tasksButton.classList.add('task-add');
    tasksButton.textContent = 'Add task';
    // listens for when the button is clicked
    // which then removes it from the screen and 
    // displays the other div
    tasksButton.addEventListener('click', () => {
        addContainer.classList.remove('close');
        tasksButton.classList.add('close');
    });

    // div that shows up after "add tasks is clicked"
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container-tasks');

    addContainer.appendChild(buttonContainer);

    // for adding tasks
    const addButton = document.createElement('button');
    addButton.classList.add('buttons-tasks-add');
    addButton.id = 'add-task';
    addButton.textContent = 'Add';
    // pushes the values entered in the text box into an 
    // array or something
    addButton.addEventListener('click', () => {
        if (datePicker.valueAsDate === null) {
            taskDate = 'No due date';
        }
        project.addProjectTask(taskName, taskDate, identifier);
        addContainer.classList.add('close');
        tasksButton.classList.remove('close');
        
    });
    textSection.addEventListener('keydown', (event) => {
        if (datePicker.valueAsDate === null) {
            taskDate = 'No due date';
        }
        if(event.key === 'Enter') {
            project.addProjectTask(taskName, taskDate, identifier);
            addContainer.classList.add('close');
            tasksButton.classList.remove('close');
        }
    });

    // for canceling task additions
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('buttons-tasks-add');
    cancelButton.id = 'cancel-task';
    cancelButton.textContent = 'Cancel';
    // listens for click to show previous div (task button)
    cancelButton.addEventListener('click', function() {
        addContainer.classList.add('close');
        tasksButton.classList.remove('close');
        console.log('clicked');
    });

    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(cancelButton);
    contentInbox.appendChild(tasksButton);
    tasksButton.appendChild( plusPanel);
    
    return addContainer;
};


export { inboxButtons, projectButtonsContainer}