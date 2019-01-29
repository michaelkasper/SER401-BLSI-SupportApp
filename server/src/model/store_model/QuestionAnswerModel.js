'use strict';

const AbstractModel = require("./AbstractModel");

class QuestionAnswerModel extends AbstractModel {
    constructor() {
        super();
        // Abstract Model values
        //this.id = null;
        
        this.algorithmParent = null; //identifies the algorithm that it is a part of.
        this.question = null;
        this.optionId = null;
        this.answer = null;
        
    }
}

module.exports = QuestionAnswerModel;