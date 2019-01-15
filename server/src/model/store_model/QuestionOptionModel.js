'use strict';

const AbstractModel = require("./AbstractModel");

class QuestionOptionModel extends AbstractModel {
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        this.dataType = "question-option"; //used to easily identify the datatype when sent individually

        this.question = null;
        this.algorithmParent = null; //identifies the algorithm that it is a part of.

        this.label = "";
        this.minValue = null;
        this.maxValue = null;
        this.isGood = null; //boolean 
    }


}

module.exports = QuestionOptionModel;