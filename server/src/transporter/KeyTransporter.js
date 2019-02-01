'use strict';

const Abstract = require("../transporter/AbstractTransport");
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
}

module.exports = KeyTransporter;