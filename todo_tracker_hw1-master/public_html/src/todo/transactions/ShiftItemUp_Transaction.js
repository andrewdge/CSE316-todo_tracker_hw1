'use strict'

import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class ShiftItemUp_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemId, text) {
        super();
        this.model = initModel;
        this.itemId = itemId;
        this.text = text;
    }

    doTransaction() {
        this.model.shiftItemUp(this.itemId);
    }

    undoTransaction() {
        this.model.shiftItemDown(this.itemId);
    }
}