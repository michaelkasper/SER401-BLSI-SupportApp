'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract  = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class StateQuestionTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            state_id   : {
                type     : Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            question_id: {
                type     : Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
        };

        super(database, sequelize, "state_question", fields);
        this.table.removeAttribute('id');
    }
}

module.exports = StateQuestionTransporter;