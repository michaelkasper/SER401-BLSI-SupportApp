'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

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
        
        if(query.algorithm_id) {
            let id = query.algorithm_id;
            return new Promise((resolve, reject) => {
                resolve(this.database.state.getAllByAlgorithmId(id));
            }).then(collection => {
                Promise.all(collection.map((element) => {
                    if (element.question_ids) {
                        element.question_ids = JSON.parse(element.question_ids);
                    }
                    if (element.recommendation_ids) {
                        element.recommendation_ids = JSON.parse(element.recommendation_ids);
                    }
                    return element;
                    
                })).then((data) => {
                    console.log(data);
                });
                return new JsonModel({
                    collection: collection
                });
            });
        }
        else {
            Promise.resolve(new ApiErrorModel(400, "Needs Id"));
        }
    }

    getAction(params, data) {
        console.log("==== GET ====");
        return new Promise((resolve, reject) => {
            let id = parseInt(params.id);
            resolve(this.database.state.get(id));
        }).then(data => { //TODO: Build data
            if (data.question_ids) {
                data.question_ids = JSON.parse(data.question_ids);
            }
            if (data.recommendation_ids) {
                data.recommendation_ids = JSON.parse(data.recommendation_ids);
            }
            return new JsonModel(data);
        });
    }

    postAction(params, data) {
        console.log("==== PUT ====");
        return new Promise((resolve, reject) => {
            if (data[this.dataType]) {
                data = data[this.dataType];
            }
            if (data.question_ids) {
                data.question_ids = JSON.stringify(data.question_ids);
            }
            if (data.recommendation_ids) {
                data.recommendation_ids = JSON.stringify(data.recommendation_ids);
            }
            resolve(this.database.state.create(data));
        }).then(data => {
            return new JsonModel(data);
        });
    }

    putAction(params, data) {
        console.log("==== POST ====");
        return new Promise((resolve, reject) => {
            if (data[this.dataType]) {
                data = data[this.dataType];
            }
            if(data.question_ids) {
                data.question_ids = JSON.stringify(data.question_ids);
            }
            if (data.recommendation_ids) {
                data.recommendation_ids = JSON.stringify(data.recommendation_ids);
            }
            let id = parseInt(params.id); //Make sure id is an int
            resolve(this.database.state.update(id, data));
        }).then((data) => { //TODO: spread data 
            return new JsonModel(data);
        });
    }

    headAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    deleteAllAction(params, data) {
        console.log("==== DELETE ====");
        return new Promise((resolve, reject) => {
            resolve(this.database.state.deleteAll());
        }).then(data => {
            return new JsonModel(data);
        });
    }

    deleteAction(params, data) {
        console.log("==== DELETE ====");
        return new Promise((resolve, reject) => {
            let id = parseInt(params.id);
            resolve(this.database.state.delete(id));
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

module.exports = StateController;