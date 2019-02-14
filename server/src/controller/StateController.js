'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */
const Sequelize        = require("sequelize");
var AbstractController = require('./AbstractController');
var ApiErrorModel      = require('../model/ApiErrorModel');
var JsonModel          = require('../model/JsonModel');

class StateController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);
        this.dataType = "state";
    }

    dispatch() {
        this.secure = true; //Make sure secure
        return super.dispatch();
    }

    getAllAction(query, params, data) {
        console.log("==== GET All ====");

        if (query.algorithm_id) {
            let id = query.algorithm_id;
            return this.database.state.getAllByAlgorithmId(id)
                .then(collection => {
                    return new JsonModel({
                        collection: collection
                    });
                });
        }

        return Promise.resolve(new ApiErrorModel(400, "Needs Id"));
    }

    getAction(id) {
        console.log("==== GET ====");

        return this.database.state.get(id)
            .then(data => new JsonModel(data));
    }

    postAction(params, data) {
        console.log("==== POST ====");
        if (data.question_ids) {
            delete data.question_ids;
        }
        if (data.recommendation_ids) {
            delete data.recommendation_ids;
        }

        return this.database.startTransaction((transaction) => {
            return this.database.state.create(data, transaction)
                .then(data => new JsonModel(data));
        });
    }

    putAction(id, params, data) {
        console.log("==== PUT ====");

        let recommendation_ids = data.recommendation_ids;
        let question_ids       = data.question_ids;

        delete data.recommendation_ids;
        delete data.question_ids;

        return this.database.startTransaction((transaction) => {

            return this.database.state.update(id, data, transaction)
                .then(res => {
                    // delete existing linked questions and relations
                    return Promise.all([
                        this.database.stateQuestionTable.destroy({
                            where      : {
                                state_id: id
                            },
                            transaction: transaction
                        }),
                        this.database.stateRecommendationTable.destroy({
                            where      : {
                                state_id: id
                            },
                            transaction: transaction
                        }),
                    ])
                })
                .then(res => {
                    // create passed in questions and relations link
                    let promises = [];
                    if (recommendation_ids && Array.isArray(recommendation_ids)) {
                        promises = promises.concat(
                            recommendation_ids.map(recommendation_id => {
                                return this.database.state_recommendation.create({
                                    state_id         : id,
                                    recommendation_id: recommendation_id
                                }, transaction);
                            })
                        )
                    }

                    if (question_ids && Array.isArray(question_ids)) {
                        promises = promises.concat(
                            question_ids.map(question_id => {
                                return this.database.state_question.create({
                                    state_id   : id,
                                    question_id: question_id
                                }, transaction);
                            })
                        )
                    }
                    return Promise.all(promises);
                })
        }).then(res => this.getAction(id))
    }

    deleteAction(id, params, data) {
        console.log("==== DELETE ====");

        return this.database.startTransaction((transaction) => {
            return this.database.state.delete(id, transaction)
                .then(data => new JsonModel(data));
        });
    }
}

module.exports = StateController;