// jshint esversion:6
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCSEiwHD5jBfH3zo5eb91tZSnY3ngdRXnk",
    authDomain: "party-493df.firebaseapp.com",
    databaseURL: "https://party-493df.firebaseio.com",
    projectId: "party-493df",
    storageBucket: "party-493df.appspot.com",
    messagingSenderId: "792926467414",
    appId: "1:792926467414:web:f173aa76e6843ab78c92f7",
    measurementId: "G-E20LGG6G94"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

const addForm = document.querySelector(".add");

const list = document.querySelector(".todos");

const search = document.querySelector(".search input");



// add todos

var hjcordiref= firebase.database().ref("todos");
     hjcordiref.orderByChild("todo").on("child_added", function(data){
          var newVoke= data.val();
         
         var todo1 =newVoke.todo;
         var html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo1}</span>
            <i class="fa fa-trash-alt delete" data-id='${data.key}' onclick='deleteMessage(this);'></i>
        </li>
    `;
         var ele=document.getElementById("elem");
    ele.innerHTML += html;
html="";
         
          });
    




addForm.addEventListener("submit", e => {

    e.preventDefault();
    var joinl = document.querySelector('#add').value;
        var tgref=firebase.database().ref("todos");
    var data={
        todo:joinl
         }
    tgref.push(data);

   console.log(addForm);

});

// delete todos
list.addEventListener("click", e => {

    if(e.target.classList.contains("delete")) {

        e.target.parentElement.remove();

    }

});
function deleteMessage(self){
    
     var todoId = self.getAttribute("data-id");
 
    // delete message
    firebase.database().ref("todos/").child(todoId).remove();
}

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