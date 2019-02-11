'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

class AbstractTransporter {
    constructor(database, sequelize, name, fields) {
        this.table = sequelize.define(name, fields, {
            underscored: true,
            timestamps: false
        });
        //this.table.drop(); //used to clear
        this.sequelize = sequelize;
        this.table.sync(); //TODO: check authenticate()

        this.database = database;
    }

    async getAll() {
        return this.sequelize.transaction((transaction) => {
            return this.table.findAll({
                transaction: transaction
            });
        }).then(value => {
            //transaction committed
            console.log(value);
            return value;
        }).catch(err => {
            //transaction rolledback
            console.log(err);
        });
    }

    //Retrieving associations https://stackoverflow.com/questions/13002873/sequelize-fetching-associations-on-find-1-6
    async get(id) {
        return this.sequelize.transaction((transaction) => {
            return this.table.findOne({
                where: {
                    id: id
                },
                transaction: transaction
            });
        }).then(value => {
            //transaction committed
            console.log(value);
            return value;
        }).catch(err => {
            //transaction rolledback
            console.log(err);
        });
    }

    async create(data) {
        return this.sequelize.transaction((transaction) => {
            return this.table.create(data, {
                transaction: transaction
            });
        }).then(value => {
            //transaction committed
            console.log(value);
            return value;
        }).catch(err => {
            //transaction rolledback
            console.log(err);
        });
    }

    async update(id, data) {
        return this.sequelize.transaction((transaction) => {
            return this.table.upsert(data, {
                where: {
                    id: id
                },
                transaction: transaction
            });
        }).then((result) => {
            console.log(result);
            return result.dataValues;
        }).catch(err => {
            console.log(err);
        });
    }

    async delete(id) {
        return this.sequelize.transaction((transaction) => {
            return this.table.destroy({
                where: {
                    id: id
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

    async deleteAll() {
        return this.sequelize.transaction((transaction) => {
            return this.table.drop({
                transaction: transaction
            });
        }).then(value => {
            console.log(value);
            return value;
        }).catch(err => {
            console.log(err);
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