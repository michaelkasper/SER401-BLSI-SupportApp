'use strict';

const Abstract = require("./AbstractTransport");
const Sequelize = require("sequelize");

class RecommendationTransporter extends Abstract {
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
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: Sequelize.STRING,
            shortDescription: Sequelize.STRING,
            content: Sequelize.STRING
        };

        super("recommendations", fields);
    }

    addContentContinued(information) {
        this.contentContinued.push(information);
    }

    minify() {
        return {
            title: this.title,
            description: this.description,
            contentContinued: this.contentContinued
        }
    }
}

module.exports = RecommendationTransporter;