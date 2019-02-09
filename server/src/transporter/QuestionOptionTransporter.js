'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class QuestionOptionTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            question_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            label: {
                type: Sequelize.STRING,
                allowNull: false
            },
            min_value: Sequelize.INTEGER,
            max_value: Sequelize.INTEGER,
            is_good: Sequelize.BOOLEAN
        };

        super(database, sequelize, "question_option", fields);
    }

    async getAllByQuestionId(id) {
        return this.sequelize.transaction((transaction) => {
            return this.table.findAll({
                where: {
                    question_id: id
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
}

module.exports = QuestionOptionTransporter;