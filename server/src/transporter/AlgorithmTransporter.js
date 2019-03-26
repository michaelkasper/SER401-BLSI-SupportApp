'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract  = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class AlgorithmTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id               : {
                type         : Sequelize.INTEGER.UNSIGNED,
                primaryKey   : true,
                autoIncrement: true,
                unique       : true
            },
            name             : {
                type     : Sequelize.TEXT,
                allowNull: false
            },
            version_number   : Sequelize.FLOAT(8, 2),
            description      : Sequelize.TEXT,
            short_description: Sequelize.TEXT,
            date_modified: Sequelize.TEXT,
            date_created: Sequelize.TEXT
        };

        super(database, sequelize, "algorithm", fields);
    }

    // //Retrieving associations https://stackoverflow.com/questions/13002873/sequelize-fetching-associations-on-find-1-6
    // async getWithAssociations(id) {
    //     return this.sequelize.transaction((transaction) => {
    //         return this.table.findOne({
    //             where      : {
    //                 id: id
    //             },
    //             include    : ["questions", "recommendations", "states"],
    //             transaction: transaction
    //         });
    //     }).then(value => {
    //         console.log(value);
    //         return value;
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

    async updateDateModified(id) {
        return this.database.algorithm.get(id)
        .then((algo) => {
            algo["version_number"] += 0.1;
            algo.date_modified = new Date().toDateString();
            return this.database.algorithm.update(id, algo);
        })
        .catch(err => {
            console.log(err);
        });
    }

    async update(id, data, transaction) {
        
        return super.update(id, data, transaction);
    }

    async create(id, data, transaction) {
        return super.create(id, data, transaction);
    }
}

module.exports = AlgorithmTransporter;