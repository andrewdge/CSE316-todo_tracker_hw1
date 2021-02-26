'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;
        let tps = appModel.tps;
        
        let canUseListControls = false;
        let undo = document.getElementById("undo-button");
        let redo = document.getElementById("redo-button");

        document.onclick = function() {
            if (tps.getUndoSize() > 0){
                undo.classList.replace("button-disabled", "button-enabled");
            } else {
                undo.classList.replace("button-enabled", "button-disabled");
            }
            if (tps.getRedoSize() > 0){
                redo.classList.replace("button-disabled", "button-enabled");
            } else {
                redo.classList.replace("button-enabled", "button-enabled");
            }
        }
        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function(eventData) {
            if (eventData.button === 0){
                appModel.addNewList();
            }
        }
        document.getElementById("undo-button").onmousedown = function(eventData) {
            if (eventData.button === 0) {
                if (undo.classList.contains("button-enabled")){
                    appModel.undo();
                }
            }
        }
        document.getElementById("redo-button").onmousedown = function(eventData) {
            if (eventData.button === 0) {
                if (redo.classList.contains("button-enabled")){
                    appModel.redo();
                }
            }
        }
        document.getElementById("todo-lists-list").onmousedown = function(eventData){
            if (eventData.button === 0) {
                canUseListControls = true;
                document.getElementById("close-list-button").style.color = "white";
                document.getElementById("delete-list-button").style.color = "white";
                document.getElementById("add-item-button").style.color = "white";
            }
        }
        document.getElementById("add-item-button").onmousedown = function(eventData) {
            if (canUseListControls){
                if (eventData.button === 0){
                    appModel.addNewItemTransaction();
                }
            }
        }
        document.getElementById("delete-list-button").onmousedown = function(eventData) {
            if (canUseListControls){
                if (eventData.button === 0) {
                    appModel.showConfirmationBox();
                    document.getElementById("yesBtn").onclick = function() {
                        document.getElementsByClassName("modal-overlay")[0].style.display = "none";
                        appModel.removeCurrentList();
                        document.getElementById("grid-container").removeChild(document.getElementsByClassName("modal-overlay")[0]);
                    }
                    noBtn.onclick = function() {
                        document.getElementsByClassName("modal-overlay")[0].style.display = "none";
                        document.getElementById("grid-container").removeChild(document.getElementsByClassName("modal-overlay")[0]);
                    } 
                }
            }
        }
        document.getElementById("close-list-button").onmousedown = function(eventData) {
            if (eventData.button === 0){
                document.getElementById("close-list-button").style.color = "grey";
                document.getElementById("delete-list-button").style.color = "grey";
                document.getElementById("add-item-button").style.color = "grey";
                document.getElementById("todo-lists-list").children[0].style.backgroundColor = "#353a44";
                canUseListControls = false;
                appModel.unviewListModel();
                
                
            }
        }
    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }

    handleTaskUpdate(itemId, newText, oldValue) {
        this.model.changeTaskTextTransaction(itemId, newText, oldValue);
    }

    handleDateUpdate(itemId, newDate, oldValue) {
        this.model.changeDueDateTransaction(itemId, newDate, oldValue);
    }

    handleStatusUpdate(itemId, newChoice, oldValue){
        this.model.changeStatusTransaction(itemId, newChoice, oldValue);
    }

    handleShift(itemId, direction){
        if (direction === "up"){
            this.model.shiftItemUpTransaction(itemId);
        } else {
            this.model.shiftItemDownTransaction(itemId);
        }
    }

    handleClose(item, index){
        this.model.deleteItemTransaction(item, index);
    }
}