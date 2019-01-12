'use strict';

const AbstractModel = require("./AbstractModel");

class QuestionModel extends AbstractModel {
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        //this.state = null;
        //this.algorithmParent = null;
        //this.dataType = null;
        
        this.prompt = "";
        this.typeKey = null;
        this.options = [];
        this.answer = null; //when there is need for checking correctness
    }
}

module.exports = QuestionModel;