const fetchedList = getFromLocalStorage("toDoList");
// Fetching this element to eventually give it a new class
const wrapperBoxList = document.getElementById("wrapper_box_lists");
// This variabel is separate from fetchedList in case of fetchedList turns out to be null. It's empty until new to do's are added
var toDoList = [];

// If anything is saved in local storage the list should be printed when the page is loading
if(fetchedList && fetchedList.length > 0){
    wrapperBoxList.className = "wrapper_box_lists";
    // Saving the values from fetchedList into toDoList since there are to do's in local storage
    toDoList = fetchedList;
    printList(toDoList);
    }else if(!fetchedList || fetchedList.length === 0){
        wrapperBoxList.className = "hidden";
    }  

const addButton = document.getElementById("add_button");
addButton.addEventListener("click", function(){
    event.preventDefault();
    wrapperBoxList.className = "wrapper_box_lists";
    const taskId = toDoList.length;
    const creatorInput = document.getElementById("input_creator");
    const taskInput = document.getElementById("input_task");
    const finished = false;
    const isCreatorInputValid = checkValue(creatorInput.value);
    const isTaskInputValid = checkValue(taskInput.value);
    const isDuplicate = checkIfDuplicate(taskInput.value);
    var errorMessage = "";

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
    }else{
        var newListItem = new ListItem(creatorInput.value, taskInput.value, finished, taskId);
        const updatedToDoList = addListItem(taskId, newListItem, toDoList); 
        saveInLocalStorage("toDoList", updatedToDoList);
        createTableParagraph("box_to_do_list", "table_to_do_list", newListItem);
        creatorInput.value = "";
        taskInput.value = "";
    }
})

// Functions
function checkValue(value){
    if(value){
        return true;
    }else{
        return false;
    }
} // checkValue collapse

function checkIfDuplicate(task){
    const list = getFromLocalStorage("toDoList");
    for(var i = 0; i < toDoList.length; i++){
        if(toDoList[i].task === task){
            return true;
        }else{
            return false;
        }
    }
}// checkIfDuplicate collapse

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

    // There's gonna be only a remove button for the tasks on the completed list
    if(tableId === "table_to_do_list"){
        const buttonCheck = document.createElement("BUTTON");
        buttonCheck.className = "status_button";
        buttonCheck.setAttribute("id", `button_check_task_${taskId}`);
        buttonCheck.innerHTML = '<i class="fas fa-check"></i>';
        rightCell.appendChild(buttonCheck);
        buttonCheckEventListener(buttonCheck, taskId);
    }
    // Change the class of one certain box to only display box/es with content
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
        saveInLocalStorage("toDoList", editedList);
        removeTableParagraph(tableId, `task_${taskId}`, boxId);
    })    
} // buttonRemoveEventListener collapse

function buttonCheckEventListener(buttonCheck, taskId){
    buttonCheck.addEventListener("click", function(){
        var editedTask = checkTask(taskId);
        removeTableParagraph("table_to_do_list", `task_${taskId}`, "box_to_do_list");
        createTableParagraph("box_completed_list", "table_completed_list", editedTask);
    })
} // buttonCheckEventListener collapse

function checkTask(taskId){
    var toDoList = getFromLocalStorage("toDoList");
    toDoList[taskId].finished = true;
    saveInLocalStorage("toDoList", toDoList);
    return toDoList[taskId];
} // checkTask collapse

function removeTableParagraph(tableId, tableRowId, boxId){
    const parentElement = document.getElementById(tableId);
    const childElement = document.getElementById(tableRowId);
    parentElement.removeChild(childElement);
    checkLengthOfLists();
} // removeTableParagraph collapse

// Checks the lenght of the lists to keep box/es without content hidden
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
} // checkLengthOfLists collapse

function printList(fetchedList){
    for(var i = 0; i < fetchedList.length; i++){
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