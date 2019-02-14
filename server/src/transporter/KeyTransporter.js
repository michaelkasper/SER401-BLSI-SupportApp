'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract  = require("../transporter/AbstractTransporter");
const Sequelize = require("sequelize");

class KeyTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id : {
                type         : Sequelize.SMALLINT,
                primaryKey   : true,
                autoIncrement: true,
                unique       : true
            },
            key: {
                type     : Sequelize.UUID,
                allowNull: false
            }
        };

        super(database, sequelize, "key", fields);
    }

    exists(data) {
        return this.table.findOne({
            where: {
                key: data
            }
        });
    }
}

module.exports = KeyTransporter;