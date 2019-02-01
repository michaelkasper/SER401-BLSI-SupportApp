'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

//Add for later handling of Algorithm routing
var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

class QuestionController extends AbstractController {
    dispatch() {
        return super.dispatch(false);
    }

    getAllAction(params) {
        console.log("==== GET All ====");
        let id = parseInt(params.id); //Make sure id is an int
        
        let collect = this.storage.getAlgorithm(id).questions;

        return new JsonModel({
            collection: collect
        });
    }

    //Get question from algo
    getAction(params) {
        console.log("==== GET ====");
        let id = parseInt(params.id); //Make sure id is an int
        let questionId = parseInt(params.questionId);

        if ((id === "" || id === undefined) ||
            (questionId === "" || questionId === undefined)) { //if any value is missing
            return new ApiErrorModel(405, "parameters missing");
        }

        let algo = this.storage.algorithms[id];
        console.log("Algorithm", algo);
        if (!algo) {
            return new ApiErrorModel(404, `not found`);
        }

        let question = algo.getQuestion(questionId).minify();
        console.log("Question", question)
        if (!question) {
            return new ApiErrorModel(404, `not found`);
        }
        return new JsonModel(question);
    }

    //Put in new question
    //{"prompt":"What?"}
    //{"question" { "id": 0, "currentId": 0, "algorithmParent": 0, "prompt": 'What?', "typeKey": null, "options": [], "answers": [] }}
    //{ "id": 0, "currentId": 0, "algorithmParent": 0, "prompt": "What update?", "typeKey": null, "options": [], "answers": [] }
    putAction(params, data) {
        console.log("==== PUT ====");
        let id = parseInt(params.id); //query data from id to get exact algorithm
        if ((id === "" || id === undefined)) { //id is query
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        if (data.question) {
            data = data.question;
        }

        //Check if the algorithm exists
        let algo = this.serviceManager.storage.getAlgorithm(id);
        console.log("Algorithm", algo);
        if (!algo) {
            return new ApiErrorModel(404, `not found`);
        }

        let questionId = this.storage.algorithms[id].addQuestionFromData(data); //id is overwritten if included
        return new JsonModel({
            "success": true,
            "questionId": questionId
        });
    }

    //Post an update to a question
    //{"question" : { "id": 0, "currentId": 0, "algorithmParent": 0, "prompt": "What update?", "typeKey": null, "options": [], "answers": [] }}
    //{ "id": 0, "currentId": 0, "algorithmParent": 0, "prompt": "What update?", "typeKey": null, "options": [], "answers": [] }
    postAction(params, data) {
        console.log("==== POST ====");
        let id = parseInt(params.id); //query data from id to get exact algorithm
        let questionId = parseInt(params.questionId); //query data for question id to seach question
        if ((id === "" || id === undefined) ||
            (questionId === "" || questionId === undefined)) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        //Check if there is an algorithm
        let algo = this.serviceManager.storage.getAlgorithm(id);
        if (algo === undefined) {
            return new ApiErrorModel(404, `not found`);
        }

        let question = this.serviceManager.storage.algorithms[id].getQuestion(questionId);
        if (question === undefined) {
            return new ApiErrorModel(404, `not found`);
        }

        if (data.question) {
            data = data.question;
        }

        this.storage.algorithms[id].questions[questionId].fromObj(data);
        return new JsonModel({
            "success": true
        });
    }
}

module.exports = QuestionController;