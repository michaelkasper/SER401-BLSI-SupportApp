'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class AlgorithmTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            version_number: Sequelize.FLOAT(8, 2),
            state_id_start: Sequelize.INTEGER.UNSIGNED,
            description: Sequelize.STRING,
            shortDescription: Sequelize.STRING
        };

        super(database, sequelize, "algorithm", fields);
    }

    //Retrieving associations https://stackoverflow.com/questions/13002873/sequelize-fetching-associations-on-find-1-6
    async getWithAssociations(id) {
        return this.sequelize.transaction((transaction) => {
            return this.table.findOne({
                where: {
                    id: id
                },
                include: ["questions", "recommendations", "states"],
                transaction: transaction
            });
        }).then(value => {
            console.log(value);
            return value;
        }).catch(err => {
            console.log(err);
        });
    }

    
    async update(id, data) {
        return this.sequelize.transaction((transaction) => {
            return this.table.findOrCreate({
                where: {
                    id: id
                },
                defaults: data,
                transaction: transaction
            });
        }).spread((result, created) => {
            console.log(created);
            if (!created) { //if exists, update
                data["version_number"] = result.get("version_number") + 0.1;
                Promise.resolve(
                    this.table.update(data, {
                        where: {
                            id: id
                        },
                    }));
            }
            return result;
        }).then((result) => {
            console.log(result);
            return result.dataValues;
        }).catch(err => {
            console.log(err);
        });
    }
}


module.exports = AlgorithmTransporter;