'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class RecommendationTransporter extends Abstract {
    constructor() {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            algorithmId: Sequelize.INTEGER.UNSIGNED,
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: Sequelize.STRING,
            shortDescription: Sequelize.STRING,
            content: Sequelize.STRING
        };

        super("recommendations", fields);
    }
}

module.exports = RecommendationTransporter;