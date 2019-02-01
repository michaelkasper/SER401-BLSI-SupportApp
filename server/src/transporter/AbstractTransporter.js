'use strict';

/**
 * Based off same Abstract model used in the app.
 */

 const Sequelize = require("sequelize");

class AbstractTransporter{
    constructor(name, fields) {
        this.sequelize = new Sequelize("blsi", "user", "password", {
            dialect: "mysql",
            host: "localhost",
            port: 3366,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            operatorsAliases: false
        });

        this.table = this.sequelize.define(name, fields);
        this.table.sync(); //Create tables
    }

    getAll() {
        return this.sequelize.sync()
            .then(() => this.table.findAll())
            .then(value => {
                console.log(value);
                return value;
            });
    }

    get(id) {
        return this.sequelize.sync()
            .then(() => this.table.findByPrimary(id))
            .then(value => {
                console.log(value);
                return value;
            });
    }

    create(data) {
        return this.sequelize.sync()
            .then(() => this.table.create(data))
            .then(value => {
                console.log(value);
                return value;
            });
    }

    update(id, data) {
        return this.sequelize.sync()
            .then(() => this.table.update(data))
            .then(value => {
                console.log(value)
                return value;
            });
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