const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pendingList = document.querySelector(".js-pendingList");
const finishedList = document.querySelector(".js-finishedList");
const PENDING_LS = "pending";
const FINISHED_LS = "finished";

let pending = [];
let finished = [];

function deletePending(event){
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const cleanList = pending.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    pending = cleanList;
    saveToDos(PENDING_LS, pending);
}

function deleteFinished(event){
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanList = finished.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    finished = cleanList;
    saveToDos(FINISHED_LS, finished);
}

function finishToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.querySelector("span");
    const currentValue = span.innerText;
    paintFinished(currentValue);
    deletePending(event);
}

function backToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.querySelector("span");
    const currentValue = span.innerText;
    paintPending(currentValue);
    deleteFinished(event);
}

function saveToDos(listCode, list){
    localStorage.setItem(listCode, JSON.stringify(list));
}

function paintPending(text){
    const li = document.createElement("li");
    const finishBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    span.innerText = text;
    const newId = pending.length +1;
    finishBtn.innerText = "✅"
    delBtn.innerText = "❌";
    finishBtn.addEventListener("click", finishToDo);
    delBtn.addEventListener("click", deletePending);
    li.appendChild(finishBtn);
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    pendingList.appendChild(li);
    const pendingObj = {
        text: text,
        id: newId
    };
    pending.push(pendingObj);
    saveToDos(PENDING_LS, pending);
}

function paintFinished(text){
    const li = document.createElement("li");
    const backBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    span.innerText = text;
    const newId = finished.length +1;
    backBtn.innerText = "🔙";
    delBtn.innerText = "❌";
    backBtn.addEventListener("click", backToDo);
    delBtn.addEventListener("click", deleteFinished);
    li.appendChild(backBtn);
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    finishedList.appendChild(li);
    const finishedObj = {
        text: text,
        id: newId
    };
    finished.push(finishedObj);
    saveToDos(FINISHED_LS, finished);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintPending(currentValue);
    toDoInput.value = "";
}

function loadList(listCode, paintList){
    const loadedToDos = localStorage.getItem(listCode);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintList(toDo.text);
        });
    }
}

function init(){
    loadList(PENDING_LS, paintPending);
    loadList(FINISHED_LS, paintFinished);
    toDoForm.addEventListener("submit", handleSubmit);
}

init();