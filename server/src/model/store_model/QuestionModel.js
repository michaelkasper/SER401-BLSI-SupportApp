'use strict';

const AbstractModel = require("./AbstractModel");
const Option = require("./QuestionOptionModel");
const Answer = require("./QuestionAnswerModel");

class QuestionModel extends AbstractModel {
    constructor() {
        super();
        // Abstract Model values
        //this.id = null;

        this.currentId = 0;
        this.algorithmParent = null; //identifies the algorithm that it is a part of.
        this.prompt = "";
        this.typeKey = null;
        this.options = []; //id points to index
        this.answers = []; 
    }

    getOption(id) {
        return this.options[id];
    }

    getAnswer(id) {
        return this.answers[id];
    }

    addQuestionAnswer() {
        let answer = new Answer();
        answer.id = this.currentId; //Set to current, but increase after
        answer.algorithmParent = this.algorithmParent;
        answer.question = this;

        this.answer[this.currentId++] = answer; //Set to array with current id, but increase after
        return answer.id;
    }

    addQuestionOption() {
        let option = new Option();
        option.id = this.currentId; //Set to current, but increase after
        option.algorithmParent = this.algorithmParent;
        option.question = this;

        this.answer[this.currentId++] = option; //Set to array with current id, but increase after
        return option.id;
    }

    setTypeCheckbox() {
        this.typeKey = 'checkbox';
    }

    setTypeTextField() {
        this.typeKey = 'textfield';
    }

    setTypeButtons() {
        this.typeKey = 'buttons';
    }

    setTypeDropdown() {
        this.typeKey = 'dropdown';
    }
}

module.exports = QuestionModel;