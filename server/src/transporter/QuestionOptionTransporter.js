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
            questionId: Sequelize.INTEGER.UNSIGNED,
            algorithmId: Sequelize.INTEGER.UNSIGNED,
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
}

module.exports = QuestionOptionTransporter;