// make list class
class ListObject {
    constructor (myname, tasks, index) {
        this.tasks = tasks; //should be an array containing (task) TaskObjects
        this.myname = myname;
        this.index = index;
        // this.Initialtask = new TaskObject(index, 0); //list comes with an empty task, maybe with a placeholder text

    }

    // AddNewTask() {
    //     let taskname = "hello there";
    //     let newTask = new TaskObject(this.index, this.tasks.length, taskname);
    //     // this.tasks.push(newTask);
    //     updateTasks();
    // }
}

class TaskObject {
    constructor (listid, myNum, myname) {
        //myNum is the number(order) of the task within its own list
        //list will be a number representing the index of the list in the lists array

        //I plan to have the add task button located by the list name, and the edit task button by each individual task

        this.listid = listid;
        this.myNum = myNum;
        this.myname = myname;
        this.complete = false;
        // this.template = `<li class="task" onclick="editTask();">${this.myname}</li>`;
    }

}

let lists = [];
let curList;

function addListKeyUp(event) {
    switch(event.which) {
        case 13:
            addList();
            break;
    }
}

function addTaskKeyUp(event) {
    switch(event.which) {
        case 13:
            createTask();
            break;
    }
}

function addList() {
    let name = $("#listInput").val();
    console.log(name);
    let checkName = /\S/;
    if(checkName.test(name)) {
        let list = new ListObject(name, [], lists.length);
        lists.push(list);
        $("#listInput").val("");
        selectList(list.index);
        displayTasks();
        updateLists();
    }
}


function createTask() { //create a task manually since I can't get functions within classes to work
    let taskname = $("#taskInput").val();
    let checkName = /\S/;
    if(checkName.test(taskname)) {
        let newTask = new TaskObject(curList.index, curList.tasks.length, taskname);
        curList.tasks.push(newTask);
        $("#taskInput").val("");
        updateTasks();
    }

}

function displayTasks() { //so that we don't see the input for tasks if there is no list selected

    let taskbox = document.getElementById("taskBox");
    let toolbox = document.getElementById("listOptions");

    if(curList) {
        taskbox.style.visibility = "visible";
        toolbox.style.visibility = "visible";
    }
    else {
        taskbox.style.visibility = "hidden";
        toolbox.style.visibility = "hidden";
    }
}

// function addTask(taskname) { //function will just initiate the function inside the list object
//     // let name; //the list item will hold an empty text field upon initialization for the user to input the task
//     curList.AddNewTask(); //call the selected list to create a new task
//
// } //this hasn't been working because of an error that says the function AddNewTask() doesn't exist

function editTask(index, currentListIndex) {
    let selectedTask = document.getElementById(`task${currentListIndex} ${index}`);
    selectedTask.contentEditable = "true";
    // console.log("list " + curList.index + "task " + index);

    selectedTask.addEventListener('keypress', (e) => {
        if (e.which === 13) e.preventDefault();
    });

    selectedTask.onkeyup = function(event, ind) {
        ind = index;
        switch(event.which){
            case 13:
                curList.tasks[ind].myname = selectedTask.innerText;
                updateTasks();
                break;
        }
    }
}

function editList() {
    let list = document.getElementById("listTitle");
    list.contentEditable = "true";

    list.addEventListener('keypress', (e) => {
        if (e.which === 13) e.preventDefault();
    });

    list.onkeyup = function(event) {
        switch(event.which){
            case 13:
                // event.preventDefault();
                // list.innerHTML.replace(/\n/g,' ');
                console.log(list.innerText);
                curList.myname = list.innerText;
                updateTasks();
                updateLists();
                break;
        }
    }
}

function removeList (index) {
    if(lists[index] == curList) {
        curList = null;
        $("#listTitle").html("");
        displayTasks();
    }
    lists.splice(index, 1);
    for(let i = 0; i < lists.length - index; i++) { //reassign indexes for the lists to match lists.length
        lists[index + i].index -= 1;
    }
    updateLists();
}

function removeTask (index) {
    curList.tasks.splice(index, 1);
    for(let i = 0; i < curList.tasks.length - index; i++) { //reassign indexes for the lists to match length
        curList.tasks[index + i].index -= 1;
    }
    updateLists();
}

function updateLists() {
    console.log(lists);
    let listItems = $("#listNames");
    listItems.empty();
    for(let i = 0; i < lists.length; i++) {
        let list = `<li class="listlist"><div class="label" onclick="selectList(${i})">${lists[i].myname}</div><div class="controls"><button onclick="removeList(${i})"><i class="fas fa-trash"></i></button></div></li>`;
        listItems.append(list);
    }
    updateTasks();
    saveData();
}

function updateTasks() {
    let listItems = $("#listItems");
    listItems.empty();
    if (curList) {
    for (let i = 0; i < curList.tasks.length; i++) {
        let task = `<li class="task"><div id="task${curList.index} ${i}" onclick="editTask(${i}, ${curList.index});" contenteditable="true">${curList.tasks[i].myname}</div><div class="controls"><button onclick="completeTask(${i})">Done</button><button class="deleteTask" onclick="removeTask(${i})"><i class="fas fa-trash"></i></button></div></li>`;
        console.log(curList.tasks[i]);
        if(curList.tasks[i].complete == true) {
            let task = `<li class="task"><div id="task${curList.index} ${i}" onclick="editTask(${i}, ${curList.index});" contenteditable="true" style="color: green">${curList.tasks[i].myname}</div><div class="controls"><button onclick="completeTask(${i})" style="background-color: green">Done</button><button class="deleteTask" onclick="removeTask(${i})"><i class="fas fa-trash"></i></button></div></li>`;
            listItems.append(task);
        }
        else {
            let task = `<li class="task"><div id="task${curList.index} ${i}" onclick="editTask(${i}, ${curList.index});" contenteditable="true">${curList.tasks[i].myname}</div><div class="controls"><button onclick="completeTask(${i})">Done</button><button class="deleteTask" onclick="removeTask(${i})"><i class="fas fa-trash"></i></button></div></li>`;
            listItems.append(task);
        }
    }
    }
    saveData();
}

function completeTask(taskIndex) {
    curList.tasks[taskIndex].complete = true;
    // console.log(document.getElementById(`task ${curList.index} ${taskIndex}`));
    // document.getElementById(`task ${curList.index} ${taskIndex}`).style.backgroundColor = "green";
    updateTasks();
}

function selectList(listid) { // select list to show in the list display on the right
    let listtitle = $("#listTitle");
    // console.log(listid);
    listtitle.html(`${lists[listid].myname}`);
    curList = lists[listid];
    displayTasks();
    updateTasks();
}



function saveData() {
    localStorage.setItem("listData", JSON.stringify(lists));
}



function getData() {
    let temp = localStorage.getItem("listData");
    console.log(temp);
    if(temp){
        temp = JSON.parse(temp);
        console.log(temp);
        lists = temp;
        console.log("updated lists");
    }
}

