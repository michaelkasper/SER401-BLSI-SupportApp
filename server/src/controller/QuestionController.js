'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

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
            return new Promise((resolve, reject) => {
                resolve(this.database.question.getAllByAlgorithmId(id));
            }).then(collection => {
                return new JsonModel({
                    collection: collection
                });
            });
        } else {
            Promise.resolve(new ApiErrorModel(400, "Needs Id"));
        }
    }

    getAction(params, data) {
        console.log("==== GET ====");
        return new Promise((resolve, reject) => {
            let id = parseInt(params.id);
            resolve(this.database.question.get(id));
        }).then(data => { //TODO: Build data
            return new JsonModel(data);
        });
    }

    putAction(params, data) {
        console.log("==== PUT ====");
        return new Promise((resolve, reject) => {
            if (data[this.dataType]) {
                data = data[this.dataType];
            }
            let id = parseInt(params.id); //Make sure id is an int
            resolve(this.database.question.update(id, data));
        }).then(data => {
            return new JsonModel(data);
        });
    }

    postAction(params, data) {
        console.log("==== POST ====");
        return new Promise((resolve, reject) => {
            resolve(this.database.question.create(data));
        }).then((data) => { //TODO: spread data 
            return new JsonModel(data);
        });
    }

    headAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    deleteAllAction(query, params, data) {
        console.log("==== DELETE ====");
        let id = parseInt(query.algorithm_id); //Make sure id is an int
        return new Promise((resolve, reject) => {
            resolve(this.database.question.deleteAll(id));
        }).then(data => {
            return new JsonModel(data);
        });
    }

    deleteAction(params, data) {
        console.log("==== DELETE ====");
        return new Promise((resolve, reject) => {
            let id = parseInt(params.id);
            resolve(this.database.question.delete(id));
        }).then(data => {
            return new JsonModel(data);
        });
    }

    traceAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    patchAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }
}

module.exports = QuestionController;