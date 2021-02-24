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
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
            thisController.canUseListControls = true;
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

            let listControls = element.appendChild(document.createElement("div"));
            listControls.className = "list-controls-col";

            let keyUpArrow = listControls.appendChild(document.createElement("div"));
            keyUpArrow.className = "list-item-control material-icons";
            keyUpArrow.innerText = "keyboard_arrow_up";

            let keyDownArrow = listControls.appendChild(document.createElement("div"));
            keyDownArrow.className = "list-item-control material-icons";
            keyDownArrow.innerText = "keyboard_arrow_down";

            let close = listControls.appendChild(document.createElement("div"));
            close.className = "list-item-control material-icons";
            close.innerText = "close";

            let e1 = listControls.appendChild(document.createElement("div"));
            e1.className = "list-item-control";
            let e2 = listControls.appendChild(document.createElement("div"));
            e2.className = "list-item-control";

            itemsListDiv.appendChild(element);
            
            task.onclick = function() {
                let textInput = document.createElement("input");
                textInput.id = "task-input";
                textInput.size = "30";
                textInput.value = task.innerText;
                task.parentNode.replaceChild(textInput, task);
                textInput.focus();
                textInput.onblur = function() {
                    thisController.handleTaskUpdate(listItem.id, textInput.value);
                }
            }

            dueDate.onclick = function() {
                let dateInput = document.createElement("input");
                dateInput.id = "date-input";
                dateInput.type = "date";
                dateInput.size = "30";
                dateInput.value = dateInput.innerText;
                dueDate.parentElement.replaceChild(dateInput, dueDate);
                dateInput.focus();
                dateInput.onblur = function() {
                    thisController.handleDateUpdate(listItem.id, dateInput.value);
                }
            }

            
        }
    }

    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES 
    setController(initController) {
        this.controller = initController;
    }
}