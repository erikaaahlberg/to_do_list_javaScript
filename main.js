const addButton = document.getElementById("add_button");

addButton.addEventListener('click', function(){
    for(var i = 1; i <= toDoList; i++){
        var taskId = i;
    }
    const creator = document.getElementById("input_creator").value;

    const task = document.getElementById("input_creator").value;

    const finished = false;

    function List(creator, task, id, finished){
        this.creator  = creator;
        this.task     = task;
        this.id       = id;
        this.finished = finished;
    }

    const toDoList = List(creator, task, taskId, finished);

    
console.log(toDoList);
})

