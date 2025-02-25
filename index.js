let addTaskButtonEle = document.getElementById("addTaskButton");
let todoItemContainerEle = document.getElementById("todoItemContainer");
let saveButtonElement = document.getElementById("saveButton");
function gettodolist(){
    let todolist = localStorage.getItem("todolist");
    let parsetodo = JSON.parse(todolist);
    if(todolist===null){
        return []
    }
    else{
        return parsetodo
    }
}

let todoItems = gettodolist()

function onsaveitems(todolist){
    localStorage.setItem("todolist",JSON.stringify(todolist));
}

saveButtonElement.onclick = function(){
    onsaveitems(todoItems);
}
let todoCount = todoItems.length;
function onaddtodo(){
    todoCount = todoCount+1;
    let todouserInputEle = document.getElementById("todoInputElement");
    let todouserInput = todouserInputEle.value;
    let newtodo = {
        todoId:todoCount,
        todo:todouserInput,
    };
    if(todouserInput===""){
        alert("valid input");
        return [];
    }
    todoItems.push(newtodo);
    createTodoEle(newtodo);
    todouserInputEle.value = "";
}

addTaskButtonEle.onclick = function(){
    onaddtodo();
};

function ondeleteItem(todoIds){
    let todoElement = document.getElementById(todoIds);
    todoItemContainerEle.removeChild(todoElement);
    let deleteElementIndex = todoItems.findIndex(eachEle=>{
        let eachtodoId = "todo"+eachEle.todoId;
        if(eachtodoId===todoIds){
            return true;
        }
        else{
            return false
        }
    })
    todoItems.splice(deleteElementIndex,1);
    console.log(todoItems);
}
function onstatuschange(labelId){
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked")
}
function createTodoEle(arr){
    let todoIds = "todo"+arr.todoId;
    let labelId = "label"+arr.todoId;
    let todoItemContainerEle = document.getElementById("todoItemContainer");
    todoItemContainerEle.classList.add("todo-item-container");

    let todoItemEl = document.createElement("li");
    todoItemEl.classList.add("todo-item");
    todoItemEl.id = todoIds;
    todoItemContainerEle.appendChild(todoItemEl);

    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = "inputEleId";
    inputEl.classList.add("todo-item-checkbox");
    inputEl.onclick = function(){
        onstatuschange(labelId)
    }
    todoItemEl.appendChild(inputEl);

    let labelContainerEle = document.createElement("div");
    labelContainerEle.classList.add("label-container");
    todoItemEl.appendChild(labelContainerEle);

    let labelEle = document.createElement("label");
    labelEle.htmlFor = "inputId";
    labelEle.id = labelId;
    labelEle.classList.add("todo-item-label")
    labelEle.textContent = arr.todo;
    labelContainerEle.appendChild(labelEle);

    let deleteIconEle = document.createElement("i");
    deleteIconEle.classList.add("fa-solid","fa-trash");
    deleteIconEle.classList.add("delete-icon");
    deleteIconEle.onclick = function(){
        ondeleteItem(todoIds);
    }
    labelContainerEle.appendChild(deleteIconEle);


}
for(let arr of todoItems){
    createTodoEle(arr);
}

