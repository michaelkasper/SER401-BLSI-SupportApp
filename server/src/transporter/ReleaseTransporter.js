'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class ReleaseTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            name: {
                type: Sequelize.TEXT
            },
            algorithm_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            version_number: {
                type: Sequelize.FLOAT(8, 2),
                primaryKey: true,
            },
            algorithm_json: {
                type: Sequelize.TEXT
            }
        };

        super(database, sequelize, "release", fields);
    }
}


module.exports = ReleaseTransporter;