'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract  = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class StateRecommendationTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            state_id   : {
                type     : Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            recommendation_id: {
                type     : Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
        };

        super(database, sequelize, "state_recommendation", fields);
        this.table.removeAttribute('id');
    }
}

module.exports = StateRecommendationTransporter;