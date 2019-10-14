// make list class
class ListObject {
    constructor (taskAmount) {
        //taskAmount is the amount of tasks in the list, for organization with multiple lists
        this.taskAmount = taskAmount;
    }


    initList () {

    }
}

class TaskObject extends ListObject {
    constructor (taskAmount, myNum) {
        //myNum is the number(order) of the task within its own list
        super(taskAmount);
        this.myNum = myNum;
    }

    createTask (imp) { //an added imp(important) variable to pin/prioritize a task if it returns true

    }
}