'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

class AbstractTransporter {
    constructor(database, sequelize, name, fields) {
        this.table     = sequelize.define(name, fields, {
            freezeTableName: true,
            underscored    : true,
            timestamps     : false
        });
        //this.table.drop(); //used to clear
        this.sequelize = sequelize;
        this.database  = database;
    }

    getTable() {
        return this.table;
    }

    async query(config) {
        return this.table.findAll(config);
    }

    async findOne(config) {
        return this.table.findOne(config);
    }

    async getAll() {
        return this.table.findAll({});
    }

    //Retrieving associations https://stackoverflow.com/questions/13002873/sequelize-fetching-associations-on-find-1-6
    async get(id, config = {}) {
        return this.findOne({
            where: {
                id: id
            },
            ...config
        });
    }

    async create(data, transaction) {
        if (data.id) {
            delete data.id;
        }

        return this.table.create(data, {transaction: transaction});

    }

    async update(id, data, transaction) {
        return this.table.update(data, {
            where      : {id: id},
            transaction: transaction
        }).catch(e => {
            if (e.message === 'Query was empty') {
                return this.get(id);
            }
            throw e;
        });
    }

    async delete(id, transaction) {
        return this.table.destroy({
            where      : {
                id: id
            },
            transaction: transaction
        });
    }

    // async deleteAll(id) {
    //     return this.sequelize.transaction((transaction) => {
    //         return this.table.drop({
    //             transaction: transaction
    //         });
    //     }).then(value => {
    //         console.log(value);
    //         return value;
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

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