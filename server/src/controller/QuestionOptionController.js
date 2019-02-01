'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

//Add for later handling of Algorithm routing
var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

class QuestionOptionController extends AbstractController{
    dispatch() {
        return super.dispatch(false);
    }

    getAllAction(params) {
        console.log("==== GET All ====");
        let id = parseInt(params.id); //Make sure id is an int
        let questionId = parseInt(params.questionId);
        let collect = this.storage.getAlgorithm(id).getQuestion(questionId).options;

        return new JsonModel({
            collection: collect
        });
    }

    //Get question from algo
    getAction(params) {   
        console.log("==== GET ====");           
        let id = parseInt(params.id); 
        let questionId = parseInt(params.questionId);
        let questionOptionId = parseInt(params.questionOptionId);
        console.log(id, questionId, questionOptionId);
        if ((id === "" || id === undefined) ||
            (questionId === "" || questionId === undefined) || 
            (questionOptionId === "" || questionOptionId === undefined)) { //if any value is missing
            return new ApiErrorModel(405, "parameters missing");
        } 
            
        let algo = this.storage.getAlgorithm(id);
        console.log("Algorithm", algo);
        if (!algo) {
            return new ApiErrorModel(404, "algo not found");
        }

        let question = this.storage.getAlgorithm(id).getQuestion(questionId);
        console.log("Question", question)
        if (!question) {
            return new ApiErrorModel(404, "question not found");
        }

        let questionOption = this.storage.getAlgorithm(id).getQuestion(questionId).getOption(questionOptionId).minify();
        if(!questionOption) {
            return new ApiErrorModel(404, "option not found");
        }
        
        return new JsonModel(questionOption);
    }

    //Put in new question
    //{"prompt":"What?"}
    //{"question" { "id": 0, "currentId": 0, "algorithmParent": 0, "prompt": 'What?', "typeKey": null, "options": [], "options": [] }}
    //{ "id": 0, "currentId": 0, "algorithmParent": 0, "prompt": "What update?", "typeKey": null, "options": [], "options": [] }
    putAction(params, data) {
        console.log("==== PUT ====");
        let id = parseInt(params.id);
        let questionId = parseInt(params.questionId);

        if ((id === "" || id === undefined) ||
            (questionId === "" || questionId === undefined)) { //if any value is missing
            return new ApiErrorModel(405, "parameters missing");
        }

        if (data.questionOption) {
            data = data.questionOption;
        }

        //Check if the algorithm exists
        let algo = this.serviceManager.storage.getAlgorithm(id);
        console.log("Algorithm", algo);
        if (!algo) {
            return new ApiErrorModel(404, `algo not found`);
        }
        
        let question = this.serviceManager.storage.algorithms[id].getQuestion(questionId);
        console.log("Question", question)
        if (!question) {
            return new ApiErrorModel(404, `question not found`);
        }

        let questionOptionId = this.storage.algorithms[id]
            .questions[questionId].addQuestionOption(data); //id is overwritten if included
        
            return new JsonModel({
            "success": true,
            "questionOptionId": questionOptionId
        });
    }

    //Post an update to a question
    //{"question" : { "id": 0, "currentId": 0, "algorithmParent": 0, "prompt": "What update?", "typeKey": null, "options": [], "options": [] }}
    //{ "id": 0, "currentId": 0, "algorithmParent": 0, "prompt": "What update?", "typeKey": null, "options": [], "options": [] }
    postAction(params, data) {
        console.log("==== POST ====");
        let id = parseInt(params.id);
        let questionId = parseInt(params.questionId);
        let questionOptionId = parseInt(params.questionOptionId);

        if ((id === "" || id === undefined) ||
            (questionId === "" || questionId === undefined) ||
            (questionOptionId === "" || questionOptionId === undefined)) { //if any value is missing
            return new ApiErrorModel(405, "parameters missing");
        }

        if (data.questionOption) {
            data = data.questionOption;
        }

        //Check if there is an algorithm
        let algo = this.storage.getAlgorithm(id);
        console.log(algo);
        if (!algo) {
            return new ApiErrorModel(404, `algo not found`);
        }

        let question = algo.getQuestion(questionId);
        if (!question) {
            return new ApiErrorModel(404, `question not found`);
        }

        let questionOption = question.getOption(questionOptionId);
        if (!questionOption) {
            return new ApiErrorModel(404, "option not found");
        }

        this.storage.algorithms[id].questions[questionId]
            .options[questionOptionId].fromObj(data);

        return new JsonModel({
            "success": true
        });
    }
}

module.exports = QuestionOptionController;