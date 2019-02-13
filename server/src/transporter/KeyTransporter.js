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
        return this.sequelize.transaction((transaction) => {
            return this.table.findOne({
                where      : {
                    key: data
                },
                transaction: transaction
            });
        }).then(value => {
            console.log(value);
            return value;
        }).catch(err => {
            console.log(err.toString());
        });
    }
}

module.exports = KeyTransporter;