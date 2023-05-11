import './style.css';
import Icon from './option.png';
import { msg } from './func.js';

let tasks = [];
const main = document.querySelector('.container');

const showTask = (i) => {
  const li = document.createElement('li');
  const inputCheckbox = document.createElement('input');
  inputCheckbox.setAttribute('type', 'checkbox');
  if (tasks[i].completed === false) {
    inputCheckbox.removeAttribute('checked');
  } else {
    inputCheckbox.setAttribute('checked', 'checked');
  }
  const paragraph = document.createElement('p');
  paragraph.textContent = tasks[i].description;
  li.appendChild(inputCheckbox);
  li.appendChild(paragraph);
  const myIcon = new Image();
  myIcon.src = Icon;
  myIcon.setAttribute('alt', ' ');
  myIcon.classList.add('delete');
  myIcon.addEventListener('click', (index) => {
    removeTask(index);
  });
  li.appendChild(myIcon);
  return li;
};

const removeTask=(i)=>{
  console.log(i);
}

function component() {
  const h1 = document.createElement('h1');
  h1.textContent = 'To-do list';
  main.appendChild(h1);

  const form = document.createElement('form');
  form.setAttribute('action', '#');
  form.setAttribute('id', 'taskForm');
  parent.addEventListener('submit', validateForm);

  const inputText = document.createElement('input');
  inputText.setAttribute('type', 'text');
  inputText.setAttribute('placeholder', 'Add to your list...');
  inputText.setAttribute('value', 'new task');
  inputText.setAttribute('id', 'newTask');

  const inputSubmit = document.createElement('input');
  inputSubmit.setAttribute('type', 'submit');
  inputSubmit.setAttribute('value', '>');

  form.appendChild(inputText);
  form.appendChild(inputSubmit);

  main.appendChild(form);

  tasks.forEach((tsk, i) => {
    if (i >= 0) showTask(i);
  });

  const ul = document.createElement('ul');
  tasks.forEach((tsk, i) => {
    if (i >= 0) { ul.appendChild(showTask(i)); }
  });

  main.appendChild(ul);

  const inputButton = document.createElement('input');
  inputButton.setAttribute('type', 'button');
  inputButton.setAttribute('value', 'Clear all completd');

  main.appendChild(inputButton);

  return main;
}

window.addEventListener('DOMContentLoaded', () => {
  tasks = JSON.parse(localStorage.getItem('datas')) ?? [];
  document.body.appendChild(component());
});

const validateForm = (event) => {
  event.preventDefault();
  const task = document.getElementById('newTask');
  if (task && task.value !== '') {
    const newTask = {
      description: task && task.value,
      completed: false,
      index: tasks.length,
    };
    task.value = '';

    tasks.push(newTask);
    localStorage.setItem('datas', JSON.stringify(tasks));
    main.innerHTML = '';
    document.body.appendChild(component());
    return false;
  }
  return true;
};

