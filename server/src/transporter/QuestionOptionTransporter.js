'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract  = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class QuestionOptionTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id         : {
                type         : Sequelize.INTEGER.UNSIGNED,
                primaryKey   : true,
                autoIncrement: true,
                unique       : true
            },
            question_id: {
                type     : Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            label      : {
                type: Sequelize.STRING
            },
            min_value  : Sequelize.INTEGER,
            max_value  : Sequelize.INTEGER,
            is_good    : Sequelize.BOOLEAN
        };

        super(database, sequelize, "question_option", fields);
    }
}

module.exports = QuestionOptionTransporter;