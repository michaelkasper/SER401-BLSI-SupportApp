'use strict';

const AbstractModel = require("./AbstractModel");
const Option = require("./QuestionOptionModel");

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
        this.answer = null; //can be an option or a value
    }

    getOption(id) {
        let option;
        try {
            option = this.optionss[parseInt(id)];
        } catch (e) {
            console.log(e.toString());
            return null;
        }
        return option;
    }

    getAnswer() {
        return this.answer;
    }

    setQuestionAnswer(data) {
        this.answer = new Option();
        this.answer.fromObj(data);
        this.answersalgorithmParent = this.algorithmParent;
        return this.answer;
    }

    addQuestionOption(data) {
        this.options[this.currentId] = new Option();
        this.options[this.currentId].fromObj(data);
        this.options[this.currentId].algorithmParent = this.algorithmParent;
        this.options[this.currentId].questionParent = this.id;
        this.options[this.currentId].id = this.currentId++; //overwrite id
        return this.currentId - 1;
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

    minify() {
        return {
            prompt: this.prompt,
            typeKey: this.typeKey,
            answer: this.answer
        }
    }
}

module.exports = QuestionModel;