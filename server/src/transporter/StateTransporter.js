'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class StateTransporter extends Abstract {
    constructor() {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            algorithm_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            
            next_good_id: {
                type: Sequelize.INTEGER.UNSIGNED,
            },
            
            next_bad_id: {
                type: Sequelize.INTEGER.UNSIGNED,
            }
        };

        super("state", fields);
    }
}

module.exports = StateTransporter;