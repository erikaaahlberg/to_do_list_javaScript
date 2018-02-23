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

    tableRow.setAttribute("id", `task_${id}`);
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
function removeTableParagraph(tableId, tableRowId, list){
    var element = document.getElementById(tableRowId);
    element.remove();
    const table = document.getElementById(tableId);
    table.className = "hidden";
    if(list === null || list.length < 1){
    }
}
function printList(table, fetchedList){
    for(var i = 0; i < fetchedList.length; i++){
        createTableParagraph(table, fetchedList[i].creator, fetchedList[i].task, fetchedList[i].id);
    }
} // printList collapse
function removeFromLocalStorage(){
}
function saveInLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}
function addListItem(id, listItem, List){
    List[id] = listItem;
    return List;
}
function ListItem(creator, task, finished, id){
    this.creator  = creator;
    this.task     = task;
    this.finished = finished;
    this.id       = id;
}// ListItem collapse
function removeTask(id, list){
    const indexToRemove = list.map(function(item){
        return item.id; 
    }).indexOf(id);
    //console.log(indexToRemove); 
    list.splice(indexToRemove, 1);
    return list;
};
function updateList(list){

}

//localStorage.removeItem("toDoList");
// Fetching these elements to give them a new class
var fetchedToDoList = getFromLocalStorage("toDoList");
const wrapperBoxList = document.getElementById("wrapper_box_lists");
const tableToDoList = document.getElementById("table_to_do_list");
var toDoList = [];
//var taskId = fetchedToDoList.length;

/*if(taskId > 0){
    wrapperBoxList.className = "wrapper_box_lists";    
}*/
console.log(toDoList);
if(fetchedToDoList != null && fetchedToDoList.length > 0){
    wrapperBoxList.className = "wrapper_box_lists";
    var taskId = fetchedToDoList.length;
    toDoList = fetchedToDoList;
    printList(tableToDoList, toDoList);
    /*for(var i = 0; i < toDoList.length; i++){
        const taskToRemoveId = toDoList[i].id;
        const checkButton = document.getElementById(`button_remove_task_${id}`);
        checkButton.addEventListener("click", function(){
            event.preventDefault();
            const editedList = removeTask(taskToRemoveId, toDoList);
            saveInLocalStorage("toDoList", editedList);
            toDoList = getFromLocalStorage("toDoList");
        })
    }*/
}else if(fetchedToDoList === null || fetchedToDoList.length === 0){
    var taskId = 0;
    wrapperBoxList.className = "hidden";
}

const addButton = document.getElementById("add_button");

addButton.addEventListener("click", function(){
    event.preventDefault();
    wrapperBoxList.className = "wrapper_box_lists";
    var creator = document.getElementById("input_creator").value;
    var task = document.getElementById("input_task").value;
    var finished = false;
    
    console.log(taskId);
    if(creator != "" && task != ""){
        
    }
    const newListItem = new ListItem(creator, task, finished, taskId);
    //Creates a new list item

    creator.value = "";
    task.value = "";
    console.log(newListItem);
    //saveInLocalStorage(`toDo_${taskId}`, newListItem);
    const updatedToDoList = addListItem(taskId, newListItem, toDoList); 
    saveInLocalStorage("toDoList", updatedToDoList);
    toDoList = getFromLocalStorage("toDoList");
    const lastAdded = toDoList[taskId];
    createTableParagraph(tableToDoList, lastAdded.creator, lastAdded.task, lastAdded.id);

    //printList(tableToDoList, toDoList);
    for(const key of toDoList){
        console.log(key);
    }
    /*const lastAdded = toDoList[toDoList.length];
    createTableParagraph(tableToDoList, lastAdded.creator, lastAdded.task);*/
})
/*for(var i = 0; i < fetchedToDoList.length; i++){
    console.log(fetchedToDoList[i].id);
}*/
//var fetchedToDoList = getFromLocalStorage("toDoList");
//if(toDoList != null && toDoList.length > 0){
toDoList = getFromLocalStorage("toDoList");
    for(var i = 0; i < toDoList.length; i++){
        var taskToRemoveId = toDoList[i].id;
        var removeButton = document.getElementById(`button_remove_task_${taskToRemoveId}`);
        removeButton.addEventListener("click", function(){
            const editedList = removeTask(taskToRemoveId, toDoList);
            saveInLocalStorage("toDoList", editedList);
            const updatedList = getFromLocalStorage("toDoList");
            removeTableParagraph("table_to_do_list", `task_${taskToRemoveId}`, updatedList);
            //printList(tableToDoList, updatedList);
        })
    }
//}


