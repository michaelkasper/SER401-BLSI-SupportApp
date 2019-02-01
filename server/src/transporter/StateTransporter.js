'use strict';

const Abstract = require("./AbstractTransport");
const Sequelize = require("sequelize");

class StateTransporter extends Abstract {
    constructor() {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            algorithmId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            questionID: Sequelize.INTEGER.UNSIGNED,
            recommendationID: Sequelize.INTEGER.UNSIGNED,
            nextGoodId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            nextGoodType: {
                type: Sequelize.CHAR,
                allowNull: false
            },
            nextBadId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            nextBadType: {
                type: Sequelize.CHAR,
                allowNull: false
            },
            startType: Sequelize.CHAR,
            description: Sequelize.STRING,
            shortDescription: Sequelize.STRING
        };

        super("states", fields);
    }

    getState(id) {
        let state;
        try {
            state = this.states[parseInt(id)];
        } catch (e) {
            console.log(e.toString());
            return null;
        }
        return state;
    }
}

module.exports = StateTransporter;