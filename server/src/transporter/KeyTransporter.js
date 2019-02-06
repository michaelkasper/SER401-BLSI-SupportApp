'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("../transporter/AbstractTransporter");
const Sequelize = require("sequelize");

class KeyTransporter extends Abstract{
    constructor() {
        let fields = {
            id: {
                type: Sequelize.SMALLINT,
                primaryKey: true,
                autoIncrement: true
            },
            key: {
                type: Sequelize.UUID,
                allowNull: false
            }
        };

        super("keys", fields);
    }

    exists(data) {
        return this.sequelize.sync()
            .then(() => {
                return this.table.findOne({
                    where: {
                        key: data
                    }
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