'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class QuestionTransporter extends Abstract {
    constructor(sequelize) {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            //algorithm_id: { 
            //type: Sequelize.INTEGER.UNSIGNED,
            //allowNull: false
            //},
            prompt: {
                type: Sequelize.STRING,
                allowNull: false
            },
            type_key: Sequelize.INTEGER(2), //Uses ints instead of enums
            answer: Sequelize.STRING
        };

        super(sequelize, "question", fields);
    }

    async get(id) {
        return this.sequelize.transaction((transaction) => {
            return this.table.findOne({
                where: {
                    id: id
                },
                include: ["options"],
                transaction: transaction
            });
        }).then(value => {
            console.log(value);
            return value;
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