'use strict'

import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class ChangeDueDate_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemId, text, oldValue) {
        super();
        this.model = initModel;
        this.itemId = itemId;
        this.text = text;
        this.oldValue = oldValue;
    }

    doTransaction() {
        this.model.editDate(this.itemId, this.text);
    }

    undoTransaction() {
        this.model.editDate(this.itemId, this.oldValue);
    }
}