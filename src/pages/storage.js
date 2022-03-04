import { loadInbox, loadProjPage } from './tabs';
// inbox related storage

// this will grab the current list 
// and copy the tasklist div content
let getTasks = function() {
    const tasks = document.getElementById('task-list');
    
    // sets the list as the new item in localStorage
    localStorage.setItem('list', tasks.innerHTML);
};
// grabs the LS item and sets the innerHTML
let populateTasks = function() {
    const tasks = document.getElementById('task-list');
    
    const savedList = localStorage.getItem('list');
    
    // we then take the item saved in localStorage 
    // and set the html of the list to it
    tasks.innerHTML = savedList;
};
// whenever we run this, it will 
// pull from localStorage and update the div
let inboxStorage = function() {
    // if no name exists 
    if (!localStorage.getItem('list')) {
        console.log('Nothing in Inbox');
        return;
    } else {
        console.log('Loading Inbox');
        populateTasks();
    }
};


// project related storage

// grabs the projectlist in the side bar
let getProjectSB = function() {
    const projList = document.querySelector('.projects-list');

    localStorage.setItem('projList', projList.innerHTML);
};
// grabs the project list from LC
// sets the innerHTML of side bar projects list
let populateProjects = function() {
    const projList = document.querySelector('.projects-list');

    const savedProjList = localStorage.getItem('projList');
    projList.innerHTML = savedProjList;
};
// whenever we run this, it will
// pull from the localStorage and update the div
let projectSBStorage = function() {
    // if no name exists 
    if (!localStorage.getItem('projList')) {
        console.log('Nothing in Projects');
        return;
    } else {
        console.log('Loading Projects');
        populateProjects();
    }
};


// this function runs to load appropriate page 
// in the main content area based on the project's
// name 
let projectSBStorageContent = function() {
    // siderbar selector for projects sidebar list
    const projList = document.querySelector('.projects-list');

    // listens for a new project page item 
    projList.addEventListener('click', function(e) {
        // if an item is loaded and matches the conditional 
        // if the parent container clicked has an element that 
        // has 'project-items''
        if (e.target.classList.contains('project-items')) {
            // set the targets style id to the name
            let currentItem = this.lastElementChild;
            let delBtn = currentItem.lastElementChild;
        
            const identifier = e.target.id;
            console.log(`The target is ${identifier}`);
            loadProjPage(identifier); 
            
            delBtn.onclick = function() {
                console.log('Del working')
                loadInbox();
                this.parentNode.parentNode.removeChild(this.parentNode);
                getProjectSB();
                projectSBStorage();
                localStorage.removeItem(identifier);
            }
        }
        
    });
};


// grab the projects todo list in main container
let getProjectsTask = function(id) {
    const projTaskList = document.getElementById(`${id}-task-list`);

    localStorage.setItem(id, projTaskList.innerHTML);
};
// change the list so the stored item in LS is displayed
let populateProjectTasks = function(id) {
    const projTaskList = document.getElementById(`${id}-task-list`);

    const savedProjTaskList = localStorage.getItem(id);
    projTaskList.innerHTML = savedProjTaskList;
};
// checks to see if there even is item storage for it
let projectTaskStorage = function(id) {
    if (!localStorage.getItem(id)) {
        console.log(`Project ${id} empty`);
        return;
    } else {
        console.log(`Loading Project ${id}`);
        populateProjectTasks(id);
    }
};


export { inboxStorage, projectSBStorage, projectSBStorageContent, 
    getTasks, getProjectSB, getProjectsTask, projectTaskStorage };
