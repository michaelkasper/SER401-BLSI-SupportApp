'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('./../model/ApiErrorModel');
var JsonModel = require('./../model/JsonModel');

class ReleaseController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);
        this.dataType = "release";
    }

    getAllAction(query, params, data) {
        console.log("==== GET All ====");
        return this.database.release.getAll()
            .then(collection => {
                return new JsonModel({
                    collection: collection
                });
            });
    }

    getAction(id, params, data) {
        console.log("==== GET ====");
        return this.database.release.get(id)
            .then(data => {
                return new JsonModel(data);
            });
    }

    postAction(params, data) {
        console.log("==== POST ====");
        return this.database.algorithm.get(data.algorithm_id)
            .then((result) => {
                return [this.database.question.getAllByAlgorithmId(data.algorithm_id),
                    this.database.recommendation.getAllByAlgorithmId(data.algorithm_id),
                    this.database.state.getAllByAlgorithmId(data.algorithm_id),
                    result
                ];
            }).spread((questions, recommendations, states, algorithm) => {
                algorithm["questions"] = questions;
                algorithm["recommendations"] = recommendations;
                algorithm["states"] = states;
                return algorithm;
            }).then((algorithm) => {
                return this.database.startTransaction((transaction) => {
                    return this.database.release.create({
                            algorithm: JSON.stringify(algorithm),
                            algorithm_id: algorithm.id,
                            version_number: algorithm.version_number
                        }, transaction)
                        .then((data) => {
                            return new JsonModel(data);
                        });
                });
            })

    }

    deleteAction(id, params, data) {
        console.log("==== DELETE ====");

        return this.database.startTransaction((transaction) => {
            return this.database.release.delete(id, transaction)
                .then(data => {
                    return new JsonModel(data);
                });
        });
    }
}

module.exports = ReleaseController;