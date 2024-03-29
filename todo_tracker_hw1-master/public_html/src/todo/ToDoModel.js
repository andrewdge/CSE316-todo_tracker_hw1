'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import ChangeTaskText_Transaction from './transactions/ChangeTaskText_Transaction.js'
import ChangeDueDate_Transaction from './transactions/ChangeDueDate_Transaction.js'
import ChangeStatus_Transaction from './transactions/ChangeStatus_Transaction.js'
import ShiftItemUp_Transaction from './transactions/ShiftItemUp_Transaction.js'
import ShiftItemDown_Transaction from './transactions/ShiftItemDown_Transaction.js'
import DeleteTask_Transaction from './transactions/DeleteItem_Transaction.js'
import EditListName_Transaction from './transactions/EditListName_Transaction.js'

/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.push(itemToAdd);
    }

    addItemToCurrentListAtPosition(item, index) {
        this.currentList.items.splice(index, 0, item);
        this.view.viewList(this.currentList);
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }

    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.tps.addTransaction(transaction);
    }

    changeTaskTextTransaction(itemId, newText, oldValue) {
        let transaction = new ChangeTaskText_Transaction(this, itemId, newText, oldValue);
        this.tps.addTransaction(transaction);
    }

    changeDueDateTransaction(itemId, newDate, oldValue){
        let transaction = new ChangeDueDate_Transaction(this, itemId, newDate, oldValue);
        this.tps.addTransaction(transaction);
    }

    changeStatusTransaction(itemId, newStatus, oldValue){
        let transaction = new ChangeStatus_Transaction(this, itemId, newStatus, oldValue);
        this.tps.addTransaction(transaction);
    }

    changeListNameTransaction(listId, newListName, oldValue) {
        let transaction = new EditListName_Transaction(this, listId, newListName, oldValue);
        this.tps.addTransaction(transaction);
    }

    shiftItemUpTransaction(itemId){
        let transaction = new ShiftItemUp_Transaction(this, itemId);
        this.tps.addTransaction(transaction);
    }

    shiftItemDownTransaction(itemId){
        let transaction = new ShiftItemDown_Transaction(this, itemId);
        this.tps.addTransaction(transaction);
    }

    deleteItemTransaction(item, index){
        let transaction = new DeleteTask_Transaction(this, item, index);
        this.tps.addTransaction(transaction);
    }


    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList);
        return newItem;
    }

    editListName(listId, newText) {
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++){
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0){
            this.toDoLists[listIndex].setName(newText);
        }
        this.view.refreshLists(this.toDoLists);
    }

    editTask(itemId, newText){
        let itemIndex = -1;
        for (let i = 0; (i < this.currentList.items.length) && (itemIndex < 0); i++){
            if (this.currentList.items[i].id === itemId)
                itemIndex = i;
        }
        if (itemIndex >= 0){
            this.currentList.items[itemIndex].setDescription(newText);
        }
        this.view.viewList(this.currentList);
    }

    editDate(itemId, newDate){
        let itemIndex = -1;
        for (let i = 0; (i < this.currentList.items.length) && (itemIndex < 0); i++){
            if (this.currentList.items[i].id === itemId)
                itemIndex = i;
        }
        if (itemIndex >= 0){
            this.currentList.items[itemIndex].setDueDate(newDate);
        }   
        this.view.viewList(this.currentList);
    }

    editStatus(itemId, newStatus){
        let itemIndex = -1;
        for (let i = 0; (i < this.currentList.items.length) && (itemIndex < 0); i++){
            if (this.currentList.items[i].id === itemId)
                itemIndex = i;
        }
        if (itemIndex >= 0){
            this.currentList.items[itemIndex].setStatus(newStatus);
        }
        this.view.viewList(this.currentList);
    }

    /**
     * Gets the index of list with listID in toDoLists
     */
    getListPosition(listId){
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
    }

    getCurrentList(){
        return this.currentList;
    }

    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }

    /**
     * Load the items for the listId list into the UI.
     */
    loadList(listId) {
        this.tps.clearAllTransactions();
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.currentList = listToLoad;
            this.view.viewList(this.currentList);

            this.moveListIndexToFront(listIndex);
            this.view.refreshLists(this.toDoLists);
        }
    }

    /**
     * Moves list with listIndex to the front of toDoList
     */
    moveListIndexToFront(listIndex) {
        for (let i = listIndex; i > 0; i--) {
            this.toDoLists[i] = this.toDoLists[i-1];
        }
        this.toDoLists[0] = this.currentList;       
    }

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
        }
    }   

    /**
     * Remove the itemToRemove from the current list and refresh.
     */
    removeItem(itemToRemove) {
        this.currentList.removeItem(itemToRemove);
        this.view.viewList(this.currentList);
    }

    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        let indexOfList = -1;
        for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
            if (this.toDoLists[i].id === this.currentList.id) {
                indexOfList = i;
            }
        }
        this.toDoLists.splice(indexOfList, 1);
        this.currentList = null;
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
        console.log("Hi");
    }

    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    shiftItemUp(itemId) {
        let itemIndex = -1;
        for (let i = 0; (i < this.currentList.items.length) && (itemIndex < 0); i++){
            if (this.currentList.items[i].id === itemId)
                itemIndex = i;
        }
        if (itemIndex >= 1) {
            let tmp = this.currentList.items[itemIndex - 1];
            this.currentList.items[itemIndex - 1] = this.currentList.items[itemIndex];
            this.currentList.items[itemIndex] = tmp;
        }
        this.view.refreshLists(this.toDoLists);
        this.view.viewList(this.currentList);
    }

    shiftItemDown(itemId) {
        let itemIndex = -1;
        for (let i = 0; (i < this.currentList.items.length) && (itemIndex < 0); i++){
            if (this.currentList.items[i].id === itemId)
                itemIndex = i;
        }
        if (itemIndex >= 0 && itemIndex < this.currentList.items.length - 1) {
            let tmp = this.currentList.items[itemIndex + 1];
            this.currentList.items[itemIndex + 1] = this.currentList.items[itemIndex];
            this.currentList.items[itemIndex] = tmp;
        }
        this.view.refreshLists(this.toDoLists);
        this.view.viewList(this.currentList);
    }

    // shows confirmation box on list delete
    showConfirmationBox(){
        this.view.generateConfirmationBox();
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
        }
    } 

    /**
     * Removes currently selected list from the view
     */
    unviewListModel(){
        this.currentList = null;
        this.view.viewList(this.currentList);    
    }
}