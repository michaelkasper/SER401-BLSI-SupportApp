'use strict';

const AbstractModel = require("./AbstractModel");

class QuestionOptionModel extends AbstractModel {
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        //this.state = null;
        this.dataType = "question-option";
        
        this.algorithmParent = null; //identifies the algorithm that it is a part of.
        this.label = "";
        this.minValue = null;
        this.maxValue = null;
        this.isGood = null; //boolean 
    }
}

module.exports = QuestionOptionModel;