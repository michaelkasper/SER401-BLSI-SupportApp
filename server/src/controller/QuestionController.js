'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');
var Promise = require('bluebird');

class QuestionController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);
        this.dataType = "question";
    }

    dispatch() {
        this.secure = true; //Make sure secure
        return super.dispatch();
    }

    getAllAction(query, params, data) {
        console.log("==== GET All ====");

        if (query.algorithm_id) {
            let id = query.algorithm_id;

            return this.database.question.getAllByAlgorithmId(id)
                .then(collection => {
                    return new JsonModel({
                        collection: collection
                    });
                });
        }

        return Promise.resolve(new ApiErrorModel(400, "Needs Id"));
    }

    getAction(id, params, data) {
        console.log("==== GET ====");

        return this.database.question.get(id)
            .then(data => new JsonModel(data));
    }

    putAction(id, params, data) {
        console.log("==== PUT ====");

        let questionOptions = data.question_options;
        delete data.question_options;

        return this.database.startTransaction((transaction) => {
            return this.database.question.update(id, data, transaction)
                .then(res => {
                    // delete existing question options
                    return this.database.questionOptionTable.destroy({
                        where: {
                            question_id: id
                        },
                        transaction: transaction
                    })
                }).then(res => {
                    if (questionOptions) {
                        return Promise.all(questionOptions.map((option) => {
                            option.question_id = id;
                            return this.database.question_option.create(option, transaction);
                        }))
                    }
                    return res;
                }).then((res) => {
                    return this.database.algorithm.updateDateModified(data.algorithm_id);
                });
        }).then(res => this.getAction(id));
    }

    postAction(params, data) {
        console.log("==== POST ====");

        return this.database.startTransaction((transaction) => {

                let questionOptions = data.question_options;
                delete data.question_options;

                return this.database.question.create(data, transaction)
                    .then(question => {
                        if (questionOptions) {
                            return Promise.all(questionOptions.map((option) => {
                                    option.question_id = question.id;
                                    return this.database.question_option.create(option, transaction);
                                }))
                                .then(() => question);
                        }
                        return question;
                    }).then((res) => {
                        return [this.database.algorithm.updateDateModified(data.algorithm_id), res];
                    })
            })
            .spread((res, question) => this.getAction(question.id));

    }

    deleteAction(id, params, data) {
        console.log("==== DELETE ====");
        return this.database.startTransaction((transaction) => {

            return this.database.question.delete(id, transaction)
                .then(data => new JsonModel(data));
        });
    }
}

module.exports = QuestionController;