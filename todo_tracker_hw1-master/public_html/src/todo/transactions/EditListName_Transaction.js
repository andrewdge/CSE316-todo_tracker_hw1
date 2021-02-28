'use strict'

import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class EditListName_Transaction extends jsTPS_Transaction {
    constructor(initModel, listId, text, oldValue) {
        super();
        this.model = initModel;
        this.listId = listId;
        this.text = text;
        this.oldValue = oldValue;
    }

    doTransaction() {
        this.model.editListName(this.listId, this.text);
    }

    undoTransaction() {
        this.model.editListName(this.listId, this.oldValue);
    }
}