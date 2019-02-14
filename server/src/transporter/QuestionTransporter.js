'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract  = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class QuestionTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id          : {
                type         : Sequelize.INTEGER.UNSIGNED,
                primaryKey   : true,
                autoIncrement: true,
                unique       : true
            },
            algorithm_id: {
                type     : Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            question    : {
                type     : Sequelize.TEXT,
                allowNull: false
            },
            prompt      : {
                type     : Sequelize.TEXT,
                allowNull: false
            },
            type_key    : Sequelize.STRING,
        };

        super(database, sequelize, "question", fields);
    }

    async getAll() {
        return this.table.findAll({
            include: ["question_options"],
        });

    }

    async get(id) {
        return super.get(id, {
            include: ["question_options"],
        });
    }

    async getAllByAlgorithmId(id) {
        return this.query({
            where  : {
                algorithm_id: id
            },
            include: ["question_options"]
        });
    }


    // async deleteAll(id) {
    //     return this.sequelize.transaction((transaction) => {
    //         return this.table.destroy({
    //             where      : {
    //                 algorithm_id: id
    //             },
    //             transaction: transaction
    //         });
    //     }).then(value => {
    //         console.log(value);
    //         return value;
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

    // setTypeCheckbox() {
    //     this.typeKey = 'checkbox';
    // }
    //
    // setTypeTextField() {
    //     this.typeKey = 'textfield';
    // }
    //
    // setTypeButtons() {
    //     this.typeKey = 'buttons';
    // }
    //
    // setTypeDropdown() {
    //     this.typeKey = 'dropdown';
    // }

}

module.exports = QuestionTransporter;