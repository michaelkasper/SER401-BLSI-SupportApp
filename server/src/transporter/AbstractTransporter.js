'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

class AbstractTransporter {
    constructor(sequelize, name, fields) {

        this.table = sequelize.define(name, fields);
        //this.table.drop(); //used to clear
        this.table.sync(); //TODO: check authenticate()
    }

    async getAll() {
        return this.sequelize.sync()
            .then(() => this.table.findAll())
            .then(value => {
                console.log(value);
                return value;
            }).catch(err => {
                console.log(err.toString());
            });
    }

    async get(id) {
        return this.sequelize.sync()
            .then(() => {
                return this.table.findByPrimary(id);
            }).then(value => {
                console.log(value);
                return value;
            }).catch(err => {
                console.log(err.toString());
            });
    }

    async create(data) {
        return this.table.create(data)
            .then(value => {
                console.log(value);
                return value;
            }).catch(err => {
                console.log(err.toString());
            });
    }

    async update(id, data) {

        return this.table.findOrCreate({
            where: {
                id: id
            },
            defaults: data
        }).spread((result, created) => {
            console.log(created);
            if (!created) { //if exists, update
                Promise.resolve(
                    this.table.update(data, {
                        where: {
                            id: id
                        }
                    }));
            }
            return result;
        }).then((result) => {
            console.log(result);
            return result.dataValues;
        }).catch(err => {
            console.log(err.toString());
        });
    }

    async delete(id) {
        return this.sequelize.sync()
            .then(() => this.table.destroy({
                where: {
                    id: id
                }
            }))
            .then(value => {
                console.log(value);
                return value;
            }).catch(err => {
                console.log(err.toString());
            });
    }

    async deleteAll() {
        return this.sequelize.sync()
            .then(() => this.table.drop())
            .then(value => {
                console.log(value);
                return value;
            }).catch(err => {
                console.log(err.toString());
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