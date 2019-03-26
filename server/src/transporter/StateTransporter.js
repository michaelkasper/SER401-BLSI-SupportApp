'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract  = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class StateTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id                : {
                type         : Sequelize.INTEGER.UNSIGNED,
                primaryKey   : true,
                autoIncrement: true,
                unique       : true
            },
            algorithm_id      : {
                type     : Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            is_initial        : Sequelize.BOOLEAN,
            state_id_next_good: {
                type: Sequelize.INTEGER.UNSIGNED,
            },
            state_id_next_bad : {
                type: Sequelize.INTEGER.UNSIGNED,
            }
        };

        super(database, sequelize, "state", fields);
    }

    processResult(obj) {
        return Promise.all([
            this.database.state_question.query({
                where     : {state_id: obj.id},
                attributes: ["question_id"]
            }),
            this.database.state_recommendation.query({
                where     : {state_id: obj.id},
                attributes: ["recommendation_id"]
            })
        ])
            .then(([question_ids, recommendation_ids]) => {
                obj.question_ids       = question_ids.map(({dataValues: item}) => item.question_id);
                obj.recommendation_ids = recommendation_ids.map(({dataValues: item}) => item.recommendation_id);
                return obj;
            });
    }


    async getAllByAlgorithmId(id) {
        return this.query({
            where: {
                algorithm_id: id
            },
        })
            .then(objs => Promise.all(objs.map(({dataValues: obj}) => this.processResult(obj))))
    }

    async get(id) {
        return super.get(id)
            .then(({dataValues: obj}) => this.processResult(obj))

    }
}


module.exports = StateTransporter;