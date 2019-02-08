'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class AlgorithmTransporter extends Abstract {
    constructor(sequelize) {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            version_number: Sequelize.INTEGER(11),
            //state_id_start: Sequelize.INTEGER.UNSIGNED,
            description: Sequelize.STRING,
            shortDescription: Sequelize.STRING
        };

        super(sequelize, "algorithm", fields);
    }
}

module.exports = AlgorithmTransporter;