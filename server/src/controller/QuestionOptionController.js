'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

class QuestionOptionController extends AbstractController{
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);
        this.dataType = "question_option";
    }

    dispatch() {
        this.secure = true; //Make sure secure
        return super.dispatch();
    }

    getAllAction(query, params, data) {
        console.log("==== GET All ====");
        console.log(query.question_id);
        if (query.question_id) {
            let id = query.question_id;
            return new Promise((resolve, reject) => {
                resolve(this.database.question_option.getAllByQuestionId(id));
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
            resolve(this.database.question_option.get(id));
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
            resolve(this.database.question_option.update(id, data));
            
        }).then(data => {
            return new JsonModel(data);
        });
    }

    postAction(params, data) {
        console.log("==== POST ====");
        return new Promise((resolve, reject) => {
            resolve(this.database.question_option.create(data));
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
            resolve(this.database.question_option.deleteAll());
        }).then(data => {
            return new JsonModel(data);
        });
    }

    deleteAction(params, data) {
        console.log("==== DELETE ====");
        return new Promise((resolve, reject) => {
            let id = parseInt(params.id);
            resolve(this.database.question_option.delete(id));
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

module.exports = QuestionOptionController;