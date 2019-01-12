'use strict';

const AbstractModel = require("./AbstractModel");

class Model extends AbstractModel {
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        //this.state = null;
        //this.algorithmParent = null;
        //this.dataType = null;

        this.nextIdGood = null;
        this.nextIdBad = null;
        this.questions = null;
        this.recommendations = null;
    }
}

module.exports = Model;