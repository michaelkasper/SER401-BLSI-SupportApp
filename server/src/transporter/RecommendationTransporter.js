'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract  = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class RecommendationTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id               : {
                type         : Sequelize.INTEGER.UNSIGNED,
                primaryKey   : true,
                autoIncrement: true,
                unique       : true
            },
            algorithm_id     : {
                type     : Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            title            : {
                type     : Sequelize.STRING,
                allowNull: false
            },
            description      : Sequelize.STRING,
            short_description: Sequelize.STRING,
        };

        super(database, sequelize, "recommendation", fields);
    }

    async getAllByAlgorithmId(id) {
        return this.sequelize.transaction((transaction) => {
            return this.table.findAll({
                where      : {
                    algorithm_id: id
                },
                transaction: transaction
            });
        }).then(value => {
            console.log(value);
            return value;
        }).catch(err => {
            console.log(err);
        });
    }

    async deleteAll(id) {
        return this.sequelize.transaction((transaction) => {
            return this.table.destroy({
                where      : {
                    algorithm_id: id
                },
                transaction: transaction
            });
        }).then(value => {
            console.log(value);
            return value;
        }).catch(err => {
            console.log(err);
        });
    }
}

module.exports = RecommendationTransporter;