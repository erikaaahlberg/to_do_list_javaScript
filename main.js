// Functions
function getFromLocalStorage(key){
    const fetchedList = JSON.parse(localStorage.getItem(key));
    return fetchedList;
} // getFromLocalStorage collapse

function createTableParagraph(boxId, tableId, listItem){
    const tableRow  = document.createElement("tr");
    const leftCell  = document.createElement("td");
    const middleCell = document.createElement("td");
    const rightCell = document.createElement("td");
    const buttonRemove = document.createElement("BUTTON");
    const nameNode = document.createTextNode(listItem.creator);
    const taskNode = document.createTextNode(listItem.task);
    const table = document.getElementById(tableId);
    const box = document.getElementById(boxId);
    buttonRemove.innerHTML = '<i class="fas fa-trash"></i>';

    if(tableId === "table_to_do_list"){
        const buttonCheck = document.createElement("BUTTON");
        buttonCheck.className = "status_button";
        buttonCheck.setAttribute("id", `button_check_task_${taskId}`);
        buttonCheck.innerHTML = '<i class="fas fa-check"></i>';
        rightCell.appendChild(buttonCheck);
        buttonCheckEventListener(buttonCheck, taskId);
    }
    box.className = "box_list";
    tableRow.setAttribute("id", `task_${taskId}`);
    leftCell.className = "left_column";
    middleCell.className = "middle_column";
    rightCell.className = "right_column";
    buttonRemove.className = "status_button";
    buttonRemove.setAttribute("id", `button_remove_task_${taskId}`);
    leftCell.appendChild(nameNode);
    middleCell.appendChild(taskNode);
    rightCell.appendChild(buttonRemove)
    tableRow.appendChild(leftCell);
    tableRow.appendChild(middleCell);
    tableRow.appendChild(rightCell);
    table.appendChild(tableRow);

    buttonRemoveEventListener(buttonRemove, taskId, tableId, boxId);
} // createTableParagraph collapse

function buttonRemoveEventListener(buttonRemove, taskId, tableId, boxId){
    buttonRemove.addEventListener("click", function(){
        const existingToDo = getFromLocalStorage("toDoList");
        const editedList = removeTask(taskId, existingToDo);
        console.log(editedList);
        saveInLocalStorage("toDoList", editedList);
        //const updatedList = getFromLocalStorage("toDoList");
        //console.log(updatedList);
        removeTableParagraph(tableId, `task_${taskId}`, boxId);
    })    
}

function buttonCheckEventListener(buttonCheck, taskId){
    buttonCheck.addEventListener("click", function(){
        var editedTask = checkTask(taskId);
        removeTableParagraph("table_to_do_list", `task_${taskId}`, "box_to_do_list");
        createTableParagraph("box_completed_list", "table_completed_list", editedTask);
    })
}
function checkTask(taskId){
    var toDoList = getFromLocalStorage("toDoList");
    toDoList[taskId].finished = true;
    saveInLocalStorage("toDoList", toDoList);
    return toDoList[taskId];
}

function removeTableParagraph(tableId, tableRowId, boxId){
    const parentElement = document.getElementById(tableId);
    const childElement = document.getElementById(tableRowId);
    const toDoList = getFromLocalStorage("toDoList");
    console.log(toDoList);
    parentElement.removeChild(childElement);
    for (var i = 0; i < toDoList.length; i++){
            
    }
    /*if(!toDoList.includes(true)){
        const boxToDo = document.getElementById("box_to_do_list");
        boxToDo.className = "hidden";
    }else if(!toDoList.includes(false)){
        const boxCompleted = document.getElementById("box_completed_list");
        boxCompleted.className = "hidden";
    }
    if (!toDoList || toDoList.length < 1){
        const box = document.getElementById(boxId);
        console.log(box);
        box.className = "hidden";
    }*/
} // removeTableParagraph collapse

function printList(box, table, fetchedList){
    for(var i = 0; i < fetchedList.length; i++){
        createTableParagraph(box, table, fetchedList[i]);
    }
} // printList collapse

function saveInLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}
function addListItem(id, listItem, List){
    List[id] = listItem;
    return List;
}// addListItem collapse
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
}


//localStorage.removeItem("toDoList");
// Fetching these elements to give them a new class
const fetchedList = getFromLocalStorage("toDoList");
const wrapperBoxList = document.getElementById("wrapper_box_lists");
var completedToDoList = [];
var toDoList = [];
//var taskId = fetchedToDoList.length;

/*if(taskId > 0){
    wrapperBoxList.className = "wrapper_box_lists";    
}*/



if(fetchedList && fetchedList.length > 0){
    wrapperBoxList.className = "wrapper_box_lists";
    for (var i = 0; i < fetchedList.length; i++){
        if (fetchedList[i].finished){
            createTableParagraph("box_completed_list", "table_completed_list", fetchedList[i]);
            //completedToDoList[i] = fetchedToDoList[i];
        }else{
            createTableParagraph("box_to_do_list", "table_to_do_list", fetchedList[i]);
            //toDoList[i] = fetchedToDoList[i];
        }
    }  
    console.log(completedToDoList);
    //console.log(toDoList);
    /*if(toDoList.length > 0){
        printList("box_to_do_list", "table_to_do_list", toDoList);
    }
    if(completedToDoList.length > 0){
        printList("box_completed_list", "table_completed_list", completedToDoList);
    }*/
}else if(!fetchedList || fetchedList.length === 0){
    wrapperBoxList.className = "hidden";
}

const addButton = document.getElementById("add_button");

addButton.addEventListener("click", function(){
    event.preventDefault();
    wrapperBoxList.className = "wrapper_box_lists";
    var taskId = toDoList.length;
    var creator = document.getElementById("input_creator");
    var task = document.getElementById("input_task");
    var finished = false;
    
    console.log(creator.value);
    if(!creator.value || !task.value){
        console.log("empty");
    }
    else if (creator.value && task.value){
        var newListItem = new ListItem(creator.value, task.value, finished, taskId);
    }
    //Creates a new list item

    creator.value = "";
    task.value = "";
    console.log(newListItem);
    //saveInLocalStorage(`toDo_${taskId}`, newListItem);
    const updatedToDoList = addListItem(taskId, newListItem, toDoList); 
    saveInLocalStorage("toDoList", updatedToDoList);
    //toDoList = getFromLocalStorage("toDoList");
    //const lastAdded = toDoList[taskId];
    //createTableParagraph("table_to_do_list", lastAdded.creator, lastAdded.task, lastAdded.id);
    createTableParagraph("box_to_do_list", "table_to_do_list", newListItem);

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
//toDoList = getFromLocalStorage("toDoList");
/*if(toDoList != null && toDoList.length > 0){
    for(var i = 0; i < toDoList.length; i++){
        var taskToRemoveId = toDoList[i].id;
        console.log(taskToRemoveId);
        var removeButton = document.getElementById(`button_remove_task_${taskToRemoveId}`);
        console.log(removeButton);
        removeButton.addEventListener("click", function(){
            const editedList = removeTask(taskToRemoveId, toDoList);
            console.log(editedList);
            saveInLocalStorage("toDoList", editedList);
            const updatedList = getFromLocalStorage("toDoList");
            console.log(updatedList);
            removeTableParagraph("table_to_do_list", `task_${taskToRemoveId}`, updatedList);
            //printList(tableToDoList, updatedList);
        })
    }
}*/



