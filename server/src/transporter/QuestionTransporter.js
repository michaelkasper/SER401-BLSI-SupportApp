'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class QuestionTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            algorithm_id: { 
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            prompt: {
                type: Sequelize.STRING,
                allowNull: false
            },
            type_key: Sequelize.INTEGER(2), //Uses ints instead of enums
            answer: Sequelize.STRING
        };

        super(database, sequelize, "question", fields);
    }

    async getAll() {
        return this.sequelize.transaction((transaction) => {
            return this.table.findAll({
                include: ["question_options"],
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

    async get(id) {
        return this.sequelize.transaction((transaction) => {
            return this.table.findOne({
                where: {
                    id: id
                },
                include: ["question_options"],
                transaction: transaction
            });
        }).then(value => {
            console.log(value);
            return value;
        }).catch(err => {
            console.log(err);
        });
    }

    async getAllByAlgorithmId(id) {
        return this.sequelize.transaction((transaction) => {
            return this.table.findAll({
                where: {
                    algorithm_id: id
                },
                include: ["question_options"],
                transaction: transaction
            });
        }).then(value => {
            console.log(value);
            return value;
        }).catch(err => {
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
            console.log(err);
        });
    }

    setTypeCheckbox() {
        this.typeKey = 'checkbox';
    }

    setTypeTextField() {
        this.typeKey = 'textfield';
    }

    setTypeButtons() {
        this.typeKey = 'buttons';
    }

    setTypeDropdown() {
        this.typeKey = 'dropdown';
    }

}

module.exports = QuestionTransporter;