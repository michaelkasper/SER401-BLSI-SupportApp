'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Sequelize = require("sequelize");

class AbstractTransporter {
    constructor(name, fields) {
        this.sequelize = new Sequelize("blsi", "user", "password", {

            host: "localhost",
            port: 3366,
            dialect: "mysql",
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            operatorsAliases: false
        });

        this.table = this.sequelize.define(name, fields);
        //this.table.drop(); //used to clear
        this.table.sync(); //TODO: check authenticate()
    }

    fromObj(json) {
        for (let field in json) {
            if (field in this) {
                this[field] = json[field];
            }
        }
        return this;
    }
}

module.exports = AbstractTransporter;