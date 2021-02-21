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

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onclick = function() {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onclick = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onclick = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onclick = function() {
            appModel.removeCurrentList();
        }
        document.getElementById("add-item-button").onclick = function() {
            appModel.addNewItemTransaction();
        }  
        // document.getElementById("todo-list-items-div").onclick = function() {
        //     //appModel.makeTextEditable(this);
        //     console.log(this.children);
        // }

        var b = document.getElementById("todo-list-items-div");
        

        var c = document.querySelectorAll(".task-col");
        console.log(c);

        for (let i = 0; i < c.length; i++){
            c[i].index = i;

            c[i].onclick = function() {
                console.log(this.index);
            }
        }

        var a = document.getElementsByClassName("task-col");
        for (let i = 0; i < a.length; i++) {
            a[i].onclick = function() {
                console.log(a[i]);
            }
            
        }
    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }
}