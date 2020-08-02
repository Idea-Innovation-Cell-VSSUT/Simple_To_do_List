// jshint esversion:6

const addForm = document.querySelector(".add");

const list = document.querySelector(".todos");

const search = document.querySelector(".search input");



// add todos
const generateTemplate = todo => {

    var html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    list.innerHTML += html;

};

addForm.addEventListener("submit", e => {

    e.preventDefault();

    var todos = addForm.add.value.trim();
    if(todos.length) {
        generateTemplate(todos);
        addForm.reset();
    }

});

// delete todos
list.addEventListener("click", e => {

    if(e.target.classList.contains("delete")) {

        e.target.parentElement.remove();

    }

});

// search todos
const fiterTodo = term => {

    Array.from(list.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => {
            todo.classList.add("filtered");
        });

    Array.from(list.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => {
            todo.classList.remove("filtered");
        });

};

search.addEventListener("keyup", () => {

    let term = search.value.trim().toLowerCase();
    fiterTodo(term);

});