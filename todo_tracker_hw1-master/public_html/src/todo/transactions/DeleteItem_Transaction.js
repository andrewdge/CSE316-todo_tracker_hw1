'use strict'

import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class DeleteTask_Transaction extends jsTPS_Transaction {
    constructor(initModel, item, index) {
        super();
        this.model = initModel;
        this.item = item;
        this.index = index;
        this.itemRemoved = item;
    }

    doTransaction() {
        this.model.removeItem(this.item);
    }

    undoTransaction() {
        this.model.addItemToCurrentListAtPosition(this.itemRemoved, this.index);
    }
}