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
        
        let canUseListControls = false;
        console.log(canUseListControls);

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }

        document.getElementById("todo-lists-list").onmousedown = function(eventData){
            if (eventData.button == 0) {
                canUseListControls = true;
                document.getElementById("close-list-button").style.color = "white";
                document.getElementById("delete-list-button").style.color = "white";
                document.getElementById("add-item-button").style.color = "white";
            }
        }

        document.getElementById("add-item-button").onmousedown = function(eventData) {
            if (canUseListControls){
                if (eventData.button == 0){
                    appModel.addNewItemTransaction();
                }
            }
        }
        document.getElementById("delete-list-button").onmousedown = function(eventData) {
            if (canUseListControls){
                if (eventData.button == 0) {
                    appModel.removeCurrentList();
                }
            }
        }
        document.getElementById("close-list-button").onmousedown = function(eventData) {

            if (eventData.button == 0){
                document.getElementById("close-list-button").style.color = "grey";
                document.getElementById("delete-list-button").style.color = "grey";
                document.getElementById("add-item-button").style.color = "grey";
                canUseListControls = false;
                appModel.unviewListModel();
            }

            
            // if (canUseListControls){
            //     
        }
    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }
}