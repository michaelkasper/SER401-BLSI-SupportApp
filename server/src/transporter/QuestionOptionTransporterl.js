'use strict';

const Abstract = require("./AbstractTransport");
const Sequelize = require("sequelize");

class QuestionOptionModel extends Abstract {
    constructor() {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            questionId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            algorithmId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            label: {
                type: Sequelize.STRING,
                allowNull: false
            },
            minValue: Sequelize.INTEGER,
            maxValue: Sequelize.INTEGER,
            isGood: Sequelize.BOOLEAN
        };

        super("questionOptions", fields);
    }

    getOption(id) {
        let option;
        try {
            option = this.options[parseInt(id)];
        } catch (e) {
            console.log(e.toString());
            return null;
        }
        return option;
    }

    addQuestionOption(data) {
        this.options[this.currentId] = new Option();
        this.options[this.currentId].fromObj(data);
        this.options[this.currentId].algorithmParent = this.algorithmParent;
        this.options[this.currentId].questionParent = this.id;
        this.options[this.currentId].id = this.currentId++; //overwrite id
        return this.currentId - 1;
    }

    minify() {
        return {
            label : this.label,
            minValue : this.minValue,
            maxValue : this.maxValue,
            isGood : this.isGood
        }
    }
}

module.exports = QuestionOptionModel;