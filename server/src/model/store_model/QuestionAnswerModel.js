'use strict';

const AbstractModel = require("./AbstractModel");

class QuestionAnswerModel extends AbstractModel {
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        //this.state = null;
        this.dataType = "question-answer";
        
        this.algorithmParent = null; //identifies the algorithm that it is a part of.
        this.question = null;
        this.questionId = null;
        this.optionId = null;
        this.answer = null;
        
    }
}

module.exports = QuestionAnswerModel;