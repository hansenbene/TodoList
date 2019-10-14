// make list class
class ListObject {
    constructor (myname, tasks) {
        this.tasks = tasks; //should be an array
        this.myname = myname;
    }
}

class TaskObject {
    constructor (list, myNum) {
        //myNum is the number(order) of the task within its own list
        this.list = list;
        this.myNum = myNum;
    }

}

let lists = [];
let curList = "";


function createList (name) { //this will be called after a function that prompts the user to name the list
    let newList = new ListObject(name);
    let newTask = new TaskObject(newList.name, 0);
}

function nameList() {
    //prompt window for a name
    let newName = "";
    createList(newName);
}