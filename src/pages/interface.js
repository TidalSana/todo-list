// import styles
import '../styles/style.css';
import '../styles/reset.css';
// js sheets
import { watchButtons, loadInbox } from './tabs';
import { projectSBStorage, projectSBStorageContent} from './storage';


let createHeader = function() {
    const header = document.createElement('header');
    header.classList.add('header');
    
    const title = document.createElement('h1');
    title.textContent = '*To-Do List';
    header.appendChild(title);

    return header;
};
// inbox, today and this weeks sections 
let createButtons = function(identifier, name) {
    const listBtns = document.createElement('button');
    listBtns.classList.add('default-buttons');
    listBtns.id = identifier;
    listBtns.innerHTML = '<i class="fa-solid fa-house"></i>' + name; 

    return listBtns;
};

// section to separate todo list from projects
let createDefault = function() {
    const defaultList = document.createElement('div');
    defaultList.classList.add('default-section');
    
    const inbox = createButtons('default-inbox', 'inbox');
    const title = document.createElement('p');
    title.classList.add('default-title');
    title.innerText = 'Tasks';
    defaultList.appendChild(title);

    // add buttons to this section
    defaultList.appendChild(inbox);

    return defaultList; 
};
// project section in side bar
let createProjects = function() {
    const projectsList = document.createElement('div');
    projectsList.classList.add('projects-section');

    // make projects section title
    const title = document.createElement('p');
    title.classList.add('projects-title');
    title.innerText = 'Projects';
    projectsList.appendChild(title);

    // placeholder for divs to be added
    const additions = document.createElement('div');
    additions.classList.add('projects-list');
    projectsList.appendChild(additions);

    // button after the area of lists
    const addProjects = document.createElement('button');
    addProjects.classList.add('project-button');
    addProjects.innerHTML += '<i class="fa-solid fa-plus"></i>';
    addProjects.innerHTML += ' Add Project';
    projectsList.appendChild(addProjects);

    // display that shows after 'Add projects' clicked
    const addContainer = document.createElement('div');
    addContainer.classList.add('project-add-div');
    addContainer.classList.add('close');
    projectsList.appendChild(addContainer);
    
    return projectsList;
};

// this function adds all of the sections and
// divs within to the side bar
let createBar = function() {
    const nav = document.createElement('nav');
    nav.classList.add('side-bar');

    const sectionOne = createDefault();
    nav.appendChild(sectionOne);

    const sectionTwo = createProjects();
    nav.appendChild(sectionTwo);

    return nav;
};
let createBody = function() {
    const main = document.createElement('div');
    main.id = 'main-container';

    return main;
};


// loads all of the components
let createPage = function() {
    const content = document.getElementById('content');

    // add header to page 
    const header = createHeader();
    content.appendChild(header);

    // add sideNav to page
    const sideBar = createBar(); 
    content.appendChild(sideBar);

    // add main-content to page
    const contentArea = createBody();
    content.appendChild(contentArea);
    
    loadInbox();
    projectSBStorage();
    projectSBStorageContent();
    watchButtons();
};

export default createPage;