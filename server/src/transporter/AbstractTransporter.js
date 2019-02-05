'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

 const Sequelize = require("sequelize");

class AbstractTransporter{
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
        this.name = name;
        this.fields = fields;
        this.table = this.sequelize.define(name, fields);
        //this.table.drop(); //used to clear
        this.table.sync();

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
			.then(() =>{
				return this.table.findByPrimary(id);
			}).then(value => {
                console.log(value);
                return value;
            }).catch(err => {
                console.log(err.toString());
            });
    }

    async create(data) {
        return this.sequelize.sync()
            .then(() => this.table.create(data))
            .then(value => {
                console.log(value);
                return value;
            }).catch(err => {
                console.log(err.toString());
            });
    }

    async update(id, data) {
        return this.sequelize.sync()
            .then(() => {
                return this.table.update(data, {where: {id: id}})
            }).then(value => {
                console.log(value)
                return value;
            }).catch(err => {
                console.log(err.toString());
            });
    }

    async delete(id) {
        return this.sequelize.sync()
            .then(() => this.table.destroy({where: {id: id}}))
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
            .then((value) => {
                console.log(value);
                this.table.sync();
            }).then(value => {
                console.log(value);
                return value;
            }).catch(err => {
                console.log(err.toString());
                return err;
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