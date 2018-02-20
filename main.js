const addButton = document.getElementById("add_button");

addButton.addEventListener("click", function(){
    event.preventDefault();

    //Fetch parent-div
    const wrapperBoxList = document.getElementById("wrapper_box_lists");
    
    wrapperBoxList.className = "wrapper_box_lists";
    
    const creator = document.getElementById("input_creator").value;
    const task = document.getElementById("input_task").value;
    const finished = false;

    function List(creator, task, finished){
        this.creator  = creator;
        this.task     = task;
        this.finished = finished;
    }
    var toDoList = new List(creator, task, finished);

    saveInLocalStorage("toDoList", toDoList);

    function saveInLocalStorage(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }
    function getFromLocalStorage(key){
        var fetchedList = JSON.parse(localStorage.getItem(key));
        return fetchedList;
    }
    storedToDoList = getFromLocalStorage("toDoList");
    console.log(storedToDoList);
})
