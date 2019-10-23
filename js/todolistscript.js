// make list class
class ListObject {
    constructor (myname, tasks, index) {
        this.tasks = tasks; //should be an array
        this.myname = myname;
        this.index = index;
    }
}

class TaskObject {
    constructor (list, myNum) {
        //myNum is the number(order) of the task within its own list
        this.list = list;
        this.myNum = myNum;
        this.complete = false;
    }

}

let lists = [];
let curList;


// function createList (name) { //this will be called after a function that prompts the user to name the list
//     let newList = new ListObject(name);
//     let newTask = new TaskObject(newList.name, 0);
// }

function addListKeyUp(event) {
    switch(event.which) {
        case 13:
            addList();
            break;
    }
}

function addList() {
    //prompt window for a name
    let name = $("#listInput").val();
    console.log(name);
    if(name !== "") {
        let list = new ListObject(name, [], lists.length);
        lists.push(list);
        $("#listInput").val("");
        updateLists();
    }
    // let newName = "";
    // createList(newName);
}

function updateLists() {
    console.log(lists);
    let listItems = $("#listNames");
    listItems.empty();
    for(let i = 0; i < lists.length; i++) {
        let list = `<li>${lists[i].myname}</li>`;
        listItems.append(list);
    }
    saveData();
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

