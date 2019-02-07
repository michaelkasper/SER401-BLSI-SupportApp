'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

class RecommendationController extends AbstractController {
    dispatch() {
        this.secure = true; //Make sure secure
        return super.dispatch();
    }

    getAllAction(params, data) {
        console.log("==== GET All ====");
        return new Promise((resolve, reject) => {
            resolve(this.transporter.getAll());
        }).then(collection => {
            return new JsonModel({
                collection: collection
            });
        });
    }

    getAction(params, data) {
        console.log("==== GET ====");
        return new Promise((resolve, reject) => {
            let id = parseInt(params.id);
            resolve(this.transporter.get(id));
        }).then(data => { //TODO: Build data
            return new JsonModel(data);
        });
    }

    putAction(params, data) {
        console.log("==== PUT ====");
        return new Promise((resolve, reject) => {
            resolve(this.transporter.create(data));
        }).then(data => {
            return new JsonModel(data);
        });
    }

    postAction(params, data) {
        console.log("==== POST ====");
        return new Promise((resolve, reject) => {
            if (data[this.dataType]) {
                data = data[this.dataType];
            }
            let id = parseInt(params.id); //Make sure id is an int
            resolve(this.transporter.update(id, data));
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
            resolve(this.transporter.deleteAll());
        }).then(data => {
            return new JsonModel(data);
        });
    }

    deleteAction(params, data) {
        console.log("==== DELETE ====");
        return new Promise((resolve, reject) => {
            let id = parseInt(params.id);
            resolve(this.transporter.delete(id));
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

module.exports = RecommendationController;