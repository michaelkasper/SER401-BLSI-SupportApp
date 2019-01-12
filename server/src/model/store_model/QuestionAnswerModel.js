'use strict';

const AbstractModel = require("./AbstractModel");

class QuestionAnswerModel extends AbstractModel {
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        //this.state = null;
        //this.algorithmParent = null;
        //this.dataType = null;
        
        this.question = null;
        this.questionId = null;
        this.optionId = null;
        this.answer = null;
        
    }
}

module.exports = QuestionAnswerModel;