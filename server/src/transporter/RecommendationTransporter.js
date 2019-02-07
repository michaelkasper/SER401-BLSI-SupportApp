'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class RecommendationTransporter extends Abstract{
    constructor() {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            algorithm_id: Sequelize.INTEGER.UNSIGNED,
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: Sequelize.STRING,
            short_description: Sequelize.STRING,
        };

        super("recommendation", fields);
    }
}

module.exports = RecommendationTransporter;