'use strict';

const AbstractModel = require("./AbstractModel");

class StateModel extends AbstractModel {
    constructor() {
        super();
        // Abstract Model values
        //this.id = null;

        this.algorithmParent = null; //identifies the algorithm that it is a part of.
        this.nextIdGood = null;
        this.nextIdBad = null;
        this.questions = null;
        this.recommendations = null;
    }
}

module.exports = StateModel;