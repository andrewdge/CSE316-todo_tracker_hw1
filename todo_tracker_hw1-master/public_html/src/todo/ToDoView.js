'use strict'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.style.display = "flex"
        listElement.style.alignItems = "center";
        listElement.style.justifyContent = "center";    
        listElement.style.minHeight = "50px";
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;

        listElement.addEventListener("click", clicks);
        var count = 0;
        var timeout = 200;
        function clicks() {
            count++;
            if (count == 1){
                setTimeout(function(){
                    if (count === 1){
                        thisController.handleLoadList(newList.id);
                        thisController.canUseListControls = true;
                        listsElement.children[0].classList.add("highlight");
                    } else {
                        let oldValue = listElement.innerText;
                        let textInput = document.createElement("input");
                        textInput.id = "task-input";
                        textInput.size = "30";
                        textInput.value = listElement.innerText;
                        textInput.style.display = "flex";
                        textInput.style.alignItems = "center";
                        textInput.style.justifyContent = "center";
                        textInput.style.minHeight = "50px";
                        listElement.parentNode.replaceChild(textInput, listElement);
                        textInput.focus();
                        textInput.onblur = function() {
                            thisController.handleListRenameUpdate(newList.id, textInput.value, oldValue);
                        }
                    }
                    count = 0;
                }, timeout || 100);
            }
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    generateConfirmationBox(){
        let modalOverlay = document.getElementById("grid-container").appendChild(document.createElement("div"));
        modalOverlay.setAttribute("class", "modal-overlay");
        modalOverlay.style.display = "block";

        let modal = modalOverlay.appendChild(document.createElement("div"));
        modal.setAttribute("class", "modal");
       
        let modalHeader = modal.appendChild(document.createElement("div"));
        modalHeader.setAttribute("class", "modal-header");
        modalHeader.style.display = "flex";
        modalHeader.style.alignContent = "center";
        modalHeader.style.justifyContent = "center";
        let modalText = modalHeader.appendChild(document.createElement("p"))
        modalText.textContent = "Delete List?";

        let header2 = modal.appendChild(document.createElement("div"));
        header2.setAttribute("class", "modal-header");

        let yesBtn = header2.appendChild(document.createElement("button"));
        yesBtn.textContent = "Yes";
        yesBtn.id = "yesBtn";
        yesBtn.setAttribute("class", "modal-button");

        let noBtn = header2.appendChild(document.createElement("button"));
        noBtn.textContent = "No";
        noBtn.id = "noBtn";
        noBtn.setAttribute("class", "modal-button");
    }


    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        let thisController = this.controller;

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();

        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];

            let element = document.createElement("div");
            element.id = "todo-list-item-" + listItem.id;
            element.className = "list-item-card";

            let task = element.appendChild(document.createElement("div"));
            task.className = "task-col";
            task.innerText = listItem.description;

            let dueDate = element.appendChild(document.createElement("div"));
            dueDate.className = "due-date-col";
            dueDate.innerText = listItem.dueDate;

            let statusCol = element.appendChild(document.createElement("div"));
            statusCol.className = "status-col";
            statusCol.innerText = listItem.status;
            if (listItem.status === "complete"){
                statusCol.className += " complete-status"
            } else {
                statusCol.className += " incomplete-status";
            }

            let listControls = element.appendChild(document.createElement("div"));
            listControls.className = "list-controls-col";

            let keyUpArrow = listControls.appendChild(document.createElement("div"));
            keyUpArrow.className = "list-item-control material-icons";
            keyUpArrow.innerText = "keyboard_arrow_up";
            if (i === 0){
                keyUpArrow.id = "arrow-disabled";
            } else {
                keyUpArrow.id = "arrow-enabled";
            }

            let keyDownArrow = listControls.appendChild(document.createElement("div"));
            keyDownArrow.className = "list-item-control material-icons";
            keyDownArrow.innerText = "keyboard_arrow_down";
            if (i === list.items.length-1){
                keyDownArrow.id = "arrow-disabled";
            } else {
                keyDownArrow.id = "arrow-enabled";
            }

            let close = listControls.appendChild(document.createElement("div"));
            close.className = "list-item-control material-icons";
            close.innerText = "close";
            close.id = "close";

            let e1 = listControls.appendChild(document.createElement("div"));
            e1.className = "list-item-control";
            let e2 = listControls.appendChild(document.createElement("div"));
            e2.className = "list-item-control";

            itemsListDiv.appendChild(element);
            
            task.onclick = function() {
                let oldValue = task.innerText;
                let textInput = document.createElement("input");
                textInput.id = "task-input";
                textInput.size = "30";
                textInput.value = task.innerText;
                task.parentNode.replaceChild(textInput, task);
                textInput.focus();
                textInput.onblur = function() {
                    thisController.handleTaskUpdate(listItem.id, textInput.value, oldValue);
                }
            }
            dueDate.onclick = function() {
                let oldValue = dueDate.innerText;
                let dateInput = document.createElement("input");
                dateInput.id = "date-input";
                dateInput.type = "date";
                dateInput.size = "30";
                dateInput.value = dueDate.innerText;
                dueDate.parentElement.replaceChild(dateInput, dueDate);
                dateInput.focus();
                dateInput.onblur = function() {
                    thisController.handleDateUpdate(listItem.id, dateInput.value, oldValue);
                }
            }
            statusCol.onclick = function() {
                let oldValue = statusCol.innerText;
                let statusInput = document.createElement("select");
                statusInput.id = "status-input";
                let op1 = statusInput.appendChild(document.createElement("option"));
                op1.value = "complete";
                op1.innerText = "complete";
                let op2 = statusInput.appendChild(document.createElement("option"));
                op2.value = "incomplete";
                op2.innerText = "incomplete";
                statusInput.value = statusCol.innerText;
                statusCol.parentNode.replaceChild(statusInput, statusCol);
                statusInput.focus();
                statusInput.onblur = function() {
                    thisController.handleStatusUpdate(listItem.id, statusInput.value, oldValue);
                }
            }
            keyUpArrow.onclick = function() {
                if (keyUpArrow.id !== "arrow-disabled"){
                    thisController.handleShift(listItem.id, "up");
                }
            }
            keyDownArrow.onclick = function() {
                if (keyDownArrow.id !== "arrow-disabled"){
                    thisController.handleShift(listItem.id, "down");
                }
            }
            close.onclick = function() {
                thisController.handleClose(listItem, i);
            }
        }
    }

    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES 
    setController(initController) {
        this.controller = initController;
    }
}