'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel      = require('./../model/ApiErrorModel');
var JsonModel          = require('./../model/JsonModel');

class AlgorithmController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);
        this.dataType = "algorithm";
    }

    dispatch() {
        //this.secure is modified in methods
        return super.dispatch();
    }

    getAllAction(query, params, data) {
        console.log("==== GET All ====");
        return this.database.algorithm.getAll()
            .then(collection => {
                return new JsonModel({
                    collection: collection
                });
            });
    }

    getAction(id, params, data) {
        console.log("==== GET ====");
        return this.database.algorithm.get(id)
            .then(data => {
                return new JsonModel(data);
            });
    }

    putAction(id, params, data) {
        console.log("==== PUT ====");
        data.version_number += 0.1;
        data.date_modified = new Date().toDateString();
        
        return this.database.startTransaction((transaction) => {
            return this.database.algorithm.update(id, data, transaction)
                .then(data => {
                    return new JsonModel(data);
                });
        });
    }

    postAction(params, data) {
        console.log("==== POST ====");
        data.version_number = (data.version_number ? data.version_number : 0.0);
        data.date_created = new Date().toDateString();
        data.date_modified = new Date().toDateString();

        return this.database.startTransaction((transaction) => {
            return this.database.algorithm.create(data, transaction)
                .then((data) => {
                    return new JsonModel(data);
                });
        });
    }

    deleteAction(id, params, data) {
        console.log("==== DELETE ====");

        return this.database.startTransaction((transaction) => {
            return this.database.algorithm.delete(id, transaction)
                .then(data => {
                    return new JsonModel(data);
                });
        });
    }
}

module.exports = AlgorithmController;