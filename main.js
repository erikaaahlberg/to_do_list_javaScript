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
    for(var i = 0; i < fetchedToDoList.length; i++){
        createTableParagraph(table, fetchedList[i].creator, fetchedList[i].task);
    }
} // printList collapse

function addTask(existingList){
    var toDoList = existingList;
    const creator = document.getElementById("input_creator").value;
    const task = document.getElementById("input_task").value;
    const finished = false;
    const id = toDoList.length;

    function ListItem(creator, task, finished, id){
        this.creator  = creator;
        this.task     = task;
        this.finished = finished;
        this.id       = id;
    }

    var listItem = new ListItem(creator, task, finished);
    toDoList[id] = listItem;
  
    function saveInLocalStorage(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }
    saveInLocalStorage("toDoList", toDoList);
} //addTask collapse
//end of functions

// Fetching these elements to give them a new class
const fetchedToDoList = getFromLocalStorage("toDoList");
const wrapperBoxList = document.getElementById("wrapper_box_lists");
const tableToDoList = document.getElementById("table_to_do_list");

if(fetchedToDoList.length > 0){
    wrapperBoxList.className = "wrapper_box_lists";
    printList(tableToDoList, fetchedToDoList);
}

const addButton = document.getElementById("add_button");
const checkButton = document.get

addButton.addEventListener("click", function(){
    event.preventDefault();
    addTask(fetchedToDoList);
    const toDoList = getFromLocalStorage("toDoList");
    //const lastAdded = toDoList[toDoList.length];

    //createTableParagraph(tableToDoList, lastAdded.creator, lastAdded.task, lastAdded.id);
    //printList(tableToDoList, toDoList);
    for(const key of toDoList){
        console.log(key);
    }
    /*const lastAdded = toDoList[toDoList.length];
    createTableParagraph(tableToDoList, lastAdded.creator, lastAdded.task);*/
})

