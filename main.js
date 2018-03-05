//localStorage.removeItem("toDoList");
// Fetching these elements to give them a new class
const fetchedList = getFromLocalStorage("toDoList");
const wrapperBoxList = document.getElementById("wrapper_box_lists");
var toDoList = [];
//var taskId = fetchedToDoList.length;

/*if(taskId > 0){
    wrapperBoxList.className = "wrapper_box_lists";    
}*/



if(fetchedList && fetchedList.length > 0){
    wrapperBoxList.className = "wrapper_box_lists";
    console.log(fetchedList);
    toDoList = fetchedList;
    printList(fetchedList);
    /*for (var i = 0; i < fetchedList.length; i++){
        console.log(fetchedList[i]);
        if (fetchedList[i].finished){
            createTableParagraph("box_completed_list", "table_completed_list", fetchedList[i]);
            //completedToDoList[i] = fetchedToDoList[i];
        }else{
            createTableParagraph("box_to_do_list", "table_to_do_list", fetchedList[i]);
            //toDoList[i] = fetchedToDoList[i];
        }*/
    }else if(!fetchedList || fetchedList.length === 0){
        wrapperBoxList.className = "hidden";
    }  
    //console.log(toDoList);
    /*if(toDoList.length > 0){
        printList("box_to_do_list", "table_to_do_list", toDoList);
    }
    if(completedToDoList.length > 0){
        printList("box_completed_list", "table_completed_list", completedToDoList);
    }*/


const addButton = document.getElementById("add_button");

addButton.addEventListener("click", function(){
    event.preventDefault();
    wrapperBoxList.className = "wrapper_box_lists";
    var taskId = toDoList.length;
    var creatorInput = document.getElementById("input_creator");
    var taskInput = document.getElementById("input_task");
    var finished = false;
    
    const isCreatorInputValid = checkValue(creatorInput.value);
    const isTaskInputValid = checkValue(taskInput.value);
    const isDuplicate = checkIfDuplicate(taskInput.value);
    var errorMessage = "";
    var index = 0;

    if(!isCreatorInputValid){
        errorMessage = "Please enter a name";
        index++; 
    }else if(!isTaskInputValid){
        errorMessage = "Are you really not gonna do anything?";
        index++;
    }else if(isDuplicate){
        errorMessage = "Do you really have to remind yourself twice?";
    }
    if(errorMessage != ""){
        alert(errorMessage);
    }
    else{
        var newListItem = new ListItem(creatorInput.value, taskInput.value, finished, taskId);
        console.log(newListItem);
        const updatedToDoList = addListItem(taskId, newListItem, toDoList); 
        saveInLocalStorage("toDoList", updatedToDoList);
        createTableParagraph("box_to_do_list", "table_to_do_list", newListItem);
        creatorInput.value = "";
        taskInput.value = "";
    }
    //Creates a new list item

    console.log(newListItem);
    //saveInLocalStorage(`toDo_${taskId}`, newListItem);
    //toDoList = getFromLocalStorage("toDoList");
    //const lastAdded = toDoList[taskId];
    //createTableParagraph("table_to_do_list", lastAdded.creator, lastAdded.task, lastAdded.id);

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
// Functions
function alertErrorMessages(errorMessages){
    const box = document.getElementById("box_add_to_do");
    setTimeout(function(){
        for(var i = 0; i < errorMessages.length; i++){
            const errorMessageParagraph = document.createElement("p");
            const errorMessage = document.createTextNode(errorMessages[i]);
            errorMessageParagraph.appendChild(errorMessage);
            box.appendChild(errorMessageParagraph);
        }
    });
}
function checkValue(value){
    if(value){
        return true;
    }else{
        return false;
    }
}
function checkIfDuplicate(task){
    const list = getFromLocalStorage("toDoList");
    for(var i = 0; i < toDoList.length; i++){
        if(toDoList[i].task === task){
            return true;
        }else{
            return false;
        }
    }
}
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
    const taskId = listItem.id;
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
    parentElement.removeChild(childElement);
    checkLengthOfLists();
    console.log(toDoList);
} // removeTableParagraph collapse

function checkLengthOfLists(){
    const toDoList = getFromLocalStorage("toDoList");
    const boxToDo = document.getElementById("box_to_do_list");
    const boxCompleted = document.getElementById("box_completed_list");
    var finished = 0;
    var unfinished = 0;

    if(toDoList){
        for (var i = 0; i < toDoList.length; i++){
            if(toDoList[i].finished){
                finished ++;
            }else{
                unfinished++;
            }    
        }
    }
    if(finished < 1 || !toDoList){
        boxCompleted.className = "hidden";
    }
    if(unfinished < 1 || !toDoList){
        boxToDo.className = "hidden";
    }
}
function printList(fetchedList){
    for(var i = 0; i < fetchedList.length; i++){
        //console.log(fetchedList[i].finished);
        if(fetchedList[i].finished){
            createTableParagraph("box_completed_list", "table_completed_list", fetchedList[i]);
        }else{
            createTableParagraph("box_to_do_list", "table_to_do_list", fetchedList[i]);
        }
    }
} // printList collapse

function saveInLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
} // saveInLocalStorage collapse
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
    list.splice(indexToRemove, 1);
    return list;
} // removeTask collapse