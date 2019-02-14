'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract  = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class RecommendationTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id               : {
                type         : Sequelize.INTEGER.UNSIGNED,
                primaryKey   : true,
                autoIncrement: true,
                unique       : true
            },
            algorithm_id     : {
                type     : Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            title            : {
                type     : Sequelize.TEXT,
                allowNull: false
            },
            description      : Sequelize.TEXT,
            short_description: Sequelize.TEXT,
        };

        super(database, sequelize, "recommendation", fields);
    }

    async getAllByAlgorithmId(id) {
        return this.table.findAll({
            where: {
                algorithm_id: id
            }
        });
    }
}

module.exports = RecommendationTransporter;