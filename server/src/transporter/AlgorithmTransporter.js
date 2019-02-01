'use strict';

const Abstract = require("./AbstractTransport");
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
            startId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            startType: Sequelize.CHAR,
            description: Sequelize.STRING,
            shortDescription: Sequelize.STRING
        };

        super("algorithms", fields);
    }

    minify() {
        return {
            name: this.name,
            startId: this.startId,
            description: this.description,
            shortDescription: this.shortDescription
        }
    }
}

module.exports = AlgorithmTransporter;