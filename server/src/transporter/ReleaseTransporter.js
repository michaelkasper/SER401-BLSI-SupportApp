'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract  = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class ReleaseTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id            : {
                type         : Sequelize.INTEGER.UNSIGNED,
                primaryKey   : true,
                autoIncrement: true,
                unique       : true
            },
            name          : {
                type: Sequelize.TEXT
            },
            algorithm_id  : {
                type     : Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            version_number: {
                type      : Sequelize.FLOAT(8, 2),
                primaryKey: true,
            },
            algorithm_json: { //stores algorithm
                type: Sequelize.TEXT
            },
            attribute_json: { //Stores question, reccomendation, and states
                type: Sequelize.TEXT
            }
        };

        super(database, sequelize, "release", fields);
    }

    async get(id, config = {}) {
        return this.table.findAll({
            where: {
                algorithm_id: id
            },
            ...config
        }).then(res => {
            let latest = res[0];
            res.forEach(element => {
                if(element.version_number > latest.version_number) {
                    latest = element;
                }
            });
            return latest
        });
    }

    async getAll() {
        return this.table.findAll({})
            .then((results) => {
                return Promise.all(results.map(({dataValues: result}) => delete result.attribute_json))
                    .then(() => {
                        return results;
                    });
            });
    }
}


module.exports = ReleaseTransporter;