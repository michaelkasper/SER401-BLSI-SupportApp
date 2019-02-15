'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');
var Promise = require('bluebird');

class RecommendationController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);
        this.dataType = "recommendation";
    }

    dispatch() {
        this.secure = true; //Make sure secure
        return super.dispatch();
    }

    getAllAction(query, params, data) {
        console.log("==== GET All ====");

        if (query.algorithm_id) {
            let id = query.algorithm_id;

            return this.database.recommendation.getAllByAlgorithmId(id)
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
        return this.database.recommendation.get(id)
            .then(data => new JsonModel(data));
    }

    postAction(params, data) {
        console.log("==== POST ====");
        return this.database.startTransaction((transaction) => {
                return this.database.recommendation.create(data, transaction)
                    .then(data => new JsonModel(data));
            }).then((res) => {
                return [this.database.algorithm.updateDateModified(data.algorithm_id), res];
            }).spread((res, recomm) => recomm);
    }

    putAction(id, params, data) {
        console.log("==== PUT ====");

        return this.database.startTransaction((transaction) => {
            return this.database.recommendation.update(id, data, transaction)
                .then((data) => new JsonModel(data));
        }).then((res) => {
            return [this.database.algorithm.updateDateModified(data.algorithm_id), res];
        }).spread((res, recomm) => recomm); 
    }

    deleteAction(id, params, data) {
        console.log("==== DELETE ====");

        return this.database.startTransaction((transaction) => {
            return this.database.recommendation.delete(id, transaction)
                .then(data => new JsonModel(data));
        });
    }
}

module.exports = RecommendationController;