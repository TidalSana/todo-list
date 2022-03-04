// styles
import '../styles/main.css';

// js sheets
import { inboxButtons, projectButtonsContainer } from './content';
import { inboxStorage, projectSBStorage, projectSBStorageContent, getProjectSB, projectTaskStorage } from './storage';


// function we export for use in UI load
let loadInbox = function() {
    // selecting the main div in the inbox section
    const contentInbox = document.getElementById('main-container');
    // clearing when we click different tabs
    contentInbox.innerHTML = '';
    
    contentInbox.classList.add('inbox-container');
    contentInbox.classList.remove('project-container')
    
    // adding title to inbox container
    const subHeading = document.createElement('h2');
    subHeading.id = 'inbox';
    subHeading.textContent = 'Inbox';

    // create div for tasks to be added 
    const taskList = document.createElement('div');
    taskList.id = 'task-list';
    taskList.classList.add('task-list-holder');

    contentInbox.appendChild(subHeading);
    contentInbox.appendChild(taskList);
    
    // adding all the buttons for the Inbox section
    const inboxInputs = inboxButtons();
    contentInbox.appendChild(inboxInputs);
 
    // calling LS and loading the page for inbox
    inboxStorage();

    return contentInbox;
};
// main projects container
let loadProjPage = function(identifier) {
    const contentProjects = document.getElementById("main-container");

    contentProjects.innerHTML ='';
    contentProjects.classList.add('project-container');

    // adding title to inbox container
    const subHeading = document.createElement('h2');
    subHeading.id = identifier;
    subHeading.classList.add('task-list'); 
    subHeading.classList.add('project-sub-head');
    subHeading.textContent = identifier;

    // create div for tasks to be added 
    const taskList = document.createElement('div');
    taskList.id = `${identifier}-task-list`;
    taskList.classList.add('task-list-holder');

    contentProjects.appendChild(subHeading);
    contentProjects.appendChild(taskList);
    
    // adding all the buttons for the Inbox section
    const projectInputs = projectButtonsContainer(identifier);
    contentProjects.appendChild(projectInputs);

    // checks to ssee if there is an item that matches the id 
    // in LS, just like the function above (loadInbox)
    projectTaskStorage(identifier);

    return contentProjects;
};
let loadSideBar = function() {
    
};
// hides the buttons for the 'Add Project'
// and loads the hidden div for 
// name or canceling action
let projectButtons = function() {
    let projectName;

    // div that appears after button clicked
    const addContainer = document.querySelector('.project-add-div');
    // the button initiates the process
    const addProjects = document.querySelector('.project-button');
    // the list that holds the projects list
    const projectList = document.querySelector('.projects-list');

    addProjects.classList.add('close');
    addContainer.classList.remove('close');
    addContainer.innerHTML ='';

    // text section for the hidden div
    const textSection = document.createElement('input');
    textSection.id = 'project-add-task';
    textSection.placeholder = 'Project name...';
    textSection.addEventListener('input', function(e) {
        projectName = this.value;
    }); 
    addContainer.appendChild(textSection);

    // buttons to add or cancel projects
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('project-button-container');
    addContainer.appendChild(buttonContainer);

    const addButton = document.createElement('button');
    addButton.classList.add('project-button-bar');
    addButton.id = 'add-task-bar';
    addButton.textContent = 'Add';
    addButton.addEventListener('click', function() {
        addContainer.classList.add('close');
        addProjects.classList.remove('close');
        const projBtn = `
        <div class='project-items' id='${projectName}'>
            <i class="fa-solid fa-angle-right"></i>
                ${projectName}
            <div class='proj-del-button' id='${projectName}-del' onclick='
            this.parentNode.parentNode.removeChild(this.parentNode); 
            localStorage.setItem("projList", document.querySelector(".projects-list").innerHTML);
            localStorage.getItem("projList");
            localStorage.removeItem("${projectName}");
            '><i class='fa-solid fa-trash'></i>
            </div>
        </div>`
        const myFragment = document.createRange().createContextualFragment(projBtn);

        projectList.appendChild(myFragment);

        // grabs current side bar projects list
        getProjectSB();
        // this runs and updates the project list if 
        // it meets a conditional 
        projectSBStorage();
        
        return projBtn;
    });
    textSection.addEventListener('keydown', (event)=>{
        if(event.key === 'Enter') {
            addContainer.classList.add('close');
            addProjects.classList.remove('close');
            const projBtn = `
            <div class='project-items' id='${projectName}'>
                <i class="fa-solid fa-angle-right"></i>
                    ${projectName}
                <div class='proj-del-button' id='${projectName}-del' onclick='
                this.parentNode.parentNode.removeChild(this.parentNode); 
                localStorage.setItem("projList", document.querySelector(".projects-list").innerHTML);
                localStorage.getItem("projList");
                localStorage.removeItem("${projectName}");
                '><i class='fa-solid fa-trash'></i>
                </div>
            </div>`
            const myFragment = document.createRange().createContextualFragment(projBtn);

            projectList.appendChild(myFragment);

            // grabs current side bar projects list
            getProjectSB();
            // this runs and updates the project list if 
            // it meets a conditional 
            projectSBStorage();
            
            return projBtn;
        }
    });

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('project-button-bar');
    cancelButton.id = 'cancel-task-bar';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', function() {
        addContainer.classList.add('close');
        addProjects.classList.remove('close');
    });

    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(cancelButton);

    // if there is an item in the project list
    // it will update and add the item to the 
    // project list
    projectSBStorage();
    // loads the content based on the project list names 
    // and which one gets clicked
    projectSBStorageContent();

    return addContainer;
};

// listens for the sidebars
let watchButtons = function() {
    // listens for inbox click
    const inbox = document.getElementById('default-inbox');
    inbox.addEventListener('click', loadInbox);

    // listens for the 'Add Project' button in the side bar
    const addProjects = document.querySelector('.project-button');
    addProjects.addEventListener('click', projectButtons);
};

export { watchButtons, loadInbox, loadProjPage };