'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class QuestionOptionTransporter extends Abstract {
    constructor() {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            question_id: Sequelize.INTEGER.UNSIGNED,
            label: {
                type: Sequelize.STRING,
                allowNull: false
            },
            min_value: Sequelize.INTEGER,
            max_value: Sequelize.INTEGER,
            is_good: Sequelize.BOOLEAN
        };

        super("question_option", fields);
    }
}

module.exports = QuestionOptionTransporter;