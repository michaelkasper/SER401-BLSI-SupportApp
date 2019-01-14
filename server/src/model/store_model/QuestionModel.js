'use strict';

const AbstractModel = require("./AbstractModel");

class QuestionModel extends AbstractModel {
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        //this.state = null;
        this.dataType = "question";
        
        this.algorithmParent = null; //identifies the algorithm that it is a part of.
        this.prompt = "";
        this.typeKey = null;
        this.options = [];
        this.answer = null; //when there is need for checking correctness
    }
}

module.exports = QuestionModel;