'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class QuestionTransporter extends Abstract {
    constructor(sequelize) {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            algorithm_id: Sequelize.INTEGER.UNSIGNED,
            prompt: {
                type: Sequelize.STRING,
                allowNull: false
            },
            type_key: Sequelize.INTEGER(2), //Uses ints instead of enums
            answer: Sequelize.STRING
        };

        super(sequelize, "question", fields);
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

module.exports = QuestionTransporter;