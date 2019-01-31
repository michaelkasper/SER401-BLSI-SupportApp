'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

//Add for later handling of Algorithm routing
var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

class QuestionAnswerController extends AbstractController{
    dispatch() {
        return super.dispatch(false);
    }

    //Get question from algo
    getAction() {   
        console.log("==== GET ====");           
        let id = this.request.query.id; //query data from id to get exact algorithm
        let key = this.request.query.key;
        let questionId = this.request.query.questionId; //query data for question id to seach question
        let questionAnswerId = this.request.query.questionAnswerId;
        console.log("id", id);
        console.log("key", key);
        console.log("questionId", questionId);
        console.log("questionAnswerId", questionAnswerId);
        if ((key === "" || key === "") ||
            (id === "" || id === undefined) ||
            (questionId === "" || questionId === undefined) || 
            (questionAnswerId === "" || questionAnswerId === undefined)) { //if any value is missing
            return new ApiErrorModel(405, "parameters not allowed");
        } 
            
        let algo = this.serviceManager.storage.getAlgorithm(id);
        console.log("Algorithm", algo);
        if (algo === undefined || algo === null) {
            return new ApiErrorModel(404, "not found");
        }

        let question = algo.getQuestion(id);
        console.log("Question", question)
        if (question === undefined || question === null) {
            return new ApiErrorModel(404, "not found");
        }

        let questionAnswer = question.getAnswer(id);
        if(questionAnswer === "" || questionAnswer === undefined) {
            return new ApiErrorModel(404, "not found");
        }
        return new JsonModel(question);
    }

    //Put in new question
    //{"prompt":"What?"}
    //{"question" { "id": 0, "currentId": 0, "algorithmParent": 0, "prompt": 'What?', "typeKey": null, "options": [], "answers": [] }}
    //{ "id": 0, "currentId": 0, "algorithmParent": 0, "prompt": "What update?", "typeKey": null, "options": [], "answers": [] }
    putAction() {
        console.log("==== PUT ====");
        let id = this.request.query.id; //query data from id to get exact algorithm
        let key = this.request.query.key;
        console.log("id", id);
        console.log("key", key);
        if ((key === "" || key === "") || (id === "" || id === undefined)) { //id is query
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        //Get body data
        let data; 
        let questionId;
        try {   
            //verify data
            data = JSON.parse(this.request.body.data);
            console.log("Data", data);

            //Check format of data
            let question = data.question;
            console.log(question);
            if (question === undefined) {
                question = data;
            }

            //Check if the algorithm exists
            let algo = this.serviceManager.storage.getAlgorithm(id);
            console.log("Algorithm", algo);
            if (algo === undefined) {
                return new ApiErrorModel(404, `not found`);
            }

            id = parseInt(id);
            questionId = this.serviceManager.storage.algorithms[id].addQuestionFromData(question); //id is overwritten if included
            
        } catch(e) {
            console.log(e.toString(),  questionId);
            return new ApiErrorModel(405, `needs data object. Parameter invalid`);
        }
        console.log("questionId", questionId);
        return new JsonModel({"success" : true, "questionId": questionId});
    }

    //Post an update to a question
    //{"question" : { "id": 0, "currentId": 0, "algorithmParent": 0, "prompt": "What update?", "typeKey": null, "options": [], "answers": [] }}
    //{ "id": 0, "currentId": 0, "algorithmParent": 0, "prompt": "What update?", "typeKey": null, "options": [], "answers": [] }
    postAction() {
        console.log("==== POST ====");
        let id = this.request.query.id; //query data from id to get exact algorithm
        let key = this.request.query.key;
        let questionId = this.request.query.questionId; //query data for question id to seach question
        console.log("id", id);
        console.log("key", key);
        console.log("questionId", questionId);
        if ((key === "" || key === "") || 
            (id === "" || id === undefined) || 
            (questionId === "" || questionId === undefined)) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        //Get body data and checkfor algo and question
        try {
            //Get body data
            let data = JSON.parse(this.request.body.data);
            console.log("Data", data);

            id = parseInt(id); //Make sure id is an int 

            //Check if there is an algorithm
            let algo = this.serviceManager.storage.getAlgorithm(id);
            if (algo === undefined) {
                return new ApiErrorModel(404, `not found`);
            }

            let question = this.serviceManager.storage.algorithms[id].getQuestion(id);
            if (question === undefined) {
                return new ApiErrorModel(404, `not found`);
            }

            //Check format of data and swap
            question = data.question;
            console.log(question);
            if (question === undefined) {
                question = data;
            }

            this.serviceManager.storage
                .algorithms[id]
                .questions[questionId].fromObj(question);
        } catch (e) {
            console.log(e.toString());
            return new ApiErrorModel(405, `needs data object. Parameter invalid`);
        }
        return new JsonModel({"success": true});
    }
}

module.exports = QuestionAnswerController;