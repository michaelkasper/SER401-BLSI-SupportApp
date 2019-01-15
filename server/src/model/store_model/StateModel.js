'use strict';

const AbstractModel = require("./AbstractModel");

class StateModel extends AbstractModel {
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        this.dataType = "state";

        this.algorithmParent = null; //identifies the algorithm that it is a part of.
        this.nextIdGood = null;
        this.nextIdBad = null;
        this.questions = null;
        this.recommendations = null;
    }
}

module.exports = StateModel;