'use strict';

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class AlgorithmTransporter extends Abstract {
    constructor() {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING({
                    length: 20
                }),
                allowNull: false
            },
            startId: Sequelize.INTEGER.UNSIGNED,
            startType: Sequelize.CHAR,
            description: Sequelize.STRING,
            shortDescription: Sequelize.STRING
        };

        super("algorithms", fields);

    }
}

module.exports = AlgorithmTransporter;