// Functions
function getFromLocalStorage(key){
    const fetchedList = JSON.parse(localStorage.getItem(key));
    return fetchedList;
} // getFromLocalStorage collapse

function createTableParagraph(table, name, task, id){
    const tableRow  = document.createElement("tr");
    const leftCell  = document.createElement("td");
    const middleCell = document.createElement("td");
    const rightCell = document.createElement("td");
    const buttonRemove = document.createElement("BUTTON");
    const nameNode = document.createTextNode(name);
    const taskNode = document.createTextNode(task);
    const tableId = table.getAttribute("id");
    buttonRemove.innerHTML = '<i class="fas fa-trash"></i>';

    if(tableId === "table_to_do_list"){
        const buttonCheck = document.createElement("BUTTON");
        buttonCheck.className = "status_button";
        buttonCheck.setAttribute("id", `button_check_task_${id}`);
        buttonCheck.innerHTML = '<i class="fas fa-check"></i>';
        rightCell.appendChild(buttonCheck);
    }

    leftCell.className = "left_column";
    middleCell.className = "middle_column";
    rightCell.className = "right_column";
    buttonRemove.className = "status_button";
    buttonRemove.setAttribute("id", `button_remove_task_${id}`);
    leftCell.appendChild(nameNode);
    middleCell.appendChild(taskNode);
    rightCell.appendChild(buttonRemove)
    tableRow.appendChild(leftCell);
    tableRow.appendChild(middleCell);
    tableRow.appendChild(rightCell);
    table.appendChild(tableRow);
} // createTableParagraph collapse

function printList(table, fetchedList){
    for(var i = 0; i < fetchedList.length; i++){
        createTableParagraph(table, fetchedList[i].creator, fetchedList[i].task, fetchedList[i].id);
    }
} // printList collapse

function saveInLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}
function addListItem(id, listItem, List){
    List[id] = listItem;
    /*if(List === null){
        updatedList[id] = listItem;
    }else{
        updatedList = List;
        updatedList[id] = listItem;
    }*/
    return List;
}
function addTask(id){
    const creator = document.getElementById("input_creator").value;
    const task = document.getElementById("input_task").value;
    const finished = false;

    function ListItem(creator, task, finished, id){
        this.creator  = creator;
        this.task     = task;
        this.finished = finished;
        this.id       = id;
    }

    var listItem = new ListItem(creator, task, finished, id);
    return listItem;

} //addTask collapse
//end of functions

//localStorage.removeItem("toDoList");
// Fetching these elements to give them a new class
var fetchedToDoList = getFromLocalStorage("toDoList");
const wrapperBoxList = document.getElementById("wrapper_box_lists");
const tableToDoList = document.getElementById("table_to_do_list");
var toDoList = [];

if(fetchedToDoList != null){
    wrapperBoxList.className = "wrapper_box_lists";
    var taskId = fetchedToDoList.length;
    toDoList = fetchedToDoList;
    printList(tableToDoList, fetchedToDoList);
}else{
    var taskId = 0;
}
//fetchedToDoList.length > 0
const addButton = document.getElementById("add_button");

addButton.addEventListener("click", function(){
    event.preventDefault();
    wrapperBoxList.className = "wrapper_box_lists";

    //Creates a new list item
    const newListItem = addTask(taskId);
    console.log(newListItem);
    console.log(taskId);
    console.log(toDoList);
    const updatedToDoList = addListItem(taskId, newListItem, toDoList); 
    saveInLocalStorage("toDoList", updatedToDoList);
    fetchedToDoList = getFromLocalStorage("toDoList");
    createTableParagraph(tableToDoList, fetchedToDoList[taskId].name, fetchedToDoList[taskId].task, taskId);
    //const toDoList = getFromLocalStorage("toDoList");
    //const lastAdded = toDoList[toDoList.length];

    //createTableParagraph(tableToDoList, lastAdded.creator, lastAdded.task, lastAdded.id);
    //printList(tableToDoList, toDoList);
    for(const key of toDoList){
        console.log(key);
    }
    /*const lastAdded = toDoList[toDoList.length];
    createTableParagraph(tableToDoList, lastAdded.creator, lastAdded.task);*/
})