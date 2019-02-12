'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('./../model/ApiErrorModel');
var JsonModel = require('./../model/JsonModel');

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
        this.secure = false; //Allow unsecure pulls

        console.log("==== GET All ====");
        return new Promise((resolve, reject) => {
            resolve(this.database.algorithm.getAll());
        }).then(collection => {
            return new JsonModel({
                collection: collection
            });
        });
    }

    getAction(params, data) {
        this.secure = true; //Make sure secure

        console.log("==== GET ====");
        return new Promise((resolve, reject) => {
            let id = parseInt(params.id);
            resolve(this.database.algorithm.get(id));
        }).then(data => {
            return new JsonModel(data);
        });
    }

    putAction(params, data) {
        this.secure = true; //Make sure secure

        if (data.collection) {
            return Promise.all(data.collection.forEach(element => {
                return this.putAction(params, element);
            })).then((data) => {
                return new JsonModel(data);
            }).catch(err => {
                console.log("finished");
                return new JsonModel(data);
            });
        }

        console.log("==== PUT ====");
        return new Promise((resolve, reject) => {
            if (data[this.dataType]) {
                data = data[this.dataType];
            }

            let id = parseInt(params.id); //Make sure id is an int
            resolve(this.database.algorithm.update(id, data));
        }).then(data => {
            return new JsonModel(data);
        });
    }

    postAction(params, data) {
        this.secure = true; //Make sure secure

        if (data.collection) {
            return Promise.all(data.collection.forEach(element => {
                return this.postAction(params, element);
            })).then((data) => {  
                return new JsonModel(data);
            }).catch(err => {
                console.log("finished");
                return new JsonModel(data);
            });
        }

        console.log("==== POST ====");
        return new Promise((resolve, reject) => {

            resolve(this.database.algorithm.create(data));
        }).then((data) => {
            return new JsonModel(data);
        });
    }

    headAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    deleteAllAction(query, params, data) {
        this.secure = true; //Make sure secure

        console.log("==== DELETE ====");
        return new Promise((resolve, reject) => {
            resolve(this.database.algorithm.deleteAll());
        }).then(data => {
            return new JsonModel(data);
        });
    }

    deleteAction(params, data) {
        this.secure = true; //Make sure secure

        console.log("==== DELETE ====");
        return new Promise((resolve, reject) => {
            let id = parseInt(params.id);
            resolve(this.database.algorithm.delete(id));
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

module.exports = AlgorithmController;