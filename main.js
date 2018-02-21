var toDoList = getFromLocalStorage("toDoList");
const wrapperBoxList = document.getElementById("wrapper_box_lists");
const tableToDoList = document.getElementById("table_to_do_list");

if(toDoList.length > 0){
    wrapperBoxList.className = "wrapper_box_lists";
    for(var i = 0; i < toDoList.length; i++){
        createTableParagraph("table_to_do_list", toDoList.name[i], toDoList.task[i]);
    }
}
function createTableParagraph(table_id, name, task){
    const tableId = table_id;
    const tableRow = document.createElement("tr");
    const leftCell = document.createElement("td");
    const rightCell = document.createElement("td");
    const name = document.createTextNode(name);
    const task = document.createTextNode(task);
    leftCell.className = "left_column";
    rightCell.className = "right_column";
    leftCell.appendChild(name);
    rightCell.appendChild(task);
    tableRow.appendChild(letfCell);
    tableRow.appendChild(rightCell);
    tableId.appendChild(tableRow);
}
const addButton = document.getElementById("add_button");

addButton.addEventListener("click", function(){
    event.preventDefault();
    wrapperBoxList.className = "wrapper_box_lists";
    
    const creator = document.getElementById("input_creator").value;
    const task = document.getElementById("input_task").value;
    const finished = false;

    function ListItem(creator, task, finished){
        this.creator  = creator;
        this.task     = task;
        this.finished = finished;
    }
    toDoList += [
        new ListItem(creator, task, finished)
    ];


    /*storedToDoList = getFromLocalStorage("toDoList");
    for(const task of storedToDoList){
        console.log(task);}*/
        
    function saveInLocalStorage(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }
    saveInLocalStorage("toDoList", toDoList);
})

function getFromLocalStorage(key){
    var fetchedList = JSON.parse(localStorage.getItem(key));
    return fetchedList;
}