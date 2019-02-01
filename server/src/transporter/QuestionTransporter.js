'use strict';

const Abstract = require("./AbstractTransport");
const Sequelize = require("sequelize");

class QuestionTransporter extends Abstract {
    constructor() {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            algorithmId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            prompt: {
                type: Sequelize.STRING,
                allowNull: false
            },
            typeKey: {
                type: Sequelize.STRING({
                    length: 20
                }),
                allowNull: false
            },
            answer: Sequelize.STRING
        };

        super("questions", fields);
    }

    addQuestionFromData(data) {
        this.questions[this.currentQuestionId] = new Question();
        this.questions[this.currentQuestionId].fromObj(data);
        this.questions[this.currentQuestionId].algorithmParent = this.id;
        this.questions[this.currentQuestionId].id = this.currentQuestionId++; //overwrite id
        return this.currentQuestionId - 1;
    }

    getQuestion(id) {
        let question;
        try {
            question = this.questions[parseInt(id)];
        } catch (e) {
            console.log(e.toString());
            return null;
        }
        return question;
    }

    getAnswer() {
        return this.answer;
    }

    setQuestionAnswer(data) {
        this.answer = new Option();
        this.answer.fromObj(data);
        this.answer.algorithmParent = this.algorithmParent;
        return this.answer;
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

module.exports = QuestionTransporter;