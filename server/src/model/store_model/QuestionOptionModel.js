'use strict';

const AbstractModel = require("./AbstractModel");

class QuestionOptionModel extends AbstractModel {
    constructor() {
        super();
        // Abstract Model values
        //this.id = null;
        this.question = null;
        this.algorithmParent = null; //identifies the algorithm that it is a part of.

        this.label = "";
        this.minValue = null;
        this.maxValue = null;
        this.isGood = null; //boolean 
    }


}

module.exports = QuestionOptionModel;