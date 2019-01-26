'use strict';

//Add for later handling of Algorithm routing
var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');
var KeyModel = require("./../model/KeyModel");

class QuestionController extends AbstractController{
    dispatch() {
        return super.dispatch(false);
    }

    //Get question from algo
    getAction() {              
        let id = this.request.query.id; //query data from id to get exact algorithm
        let key = this.request.query.key;
        let questionId = this.request.query.questionId; //query data for question id to seach question
        if ((key === "" || key === "") ||
            (id === "" || id === undefined) ||
            (questionId === "" || questionId === undefined)) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        } 
            
        let algo = this.serviceManager.storage.getAlgorithm(id);
        if (algo === undefined) {
            return new ApiErrorModel(404, `not found`);
        }

        let question = algo.getQuestion(id);
        if (question === undefined) {
            return new ApiErrorModel(404, `not found`);
        }
        return new JsonModel(question);
    }

    //Put in new question
    putAction() {
        let id = this.request.query.id; //query data from id to get exact algorithm
        let key = this.request.query.key;
        if ((key === "" || key === "") || (id === "" || id === undefined)) { //id is query
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        //Get body data
        let data; //verify data
        try {
            data = JSON.parse(this.request.body.data);
        } catch (e) {
            return new ApiErrorModel(405, `needs data object. Parameter invalid`);
        }

        //Make and return id
        let questionId;
        try {
            //Check if the algorithm exists
            let algo = this.serviceManager.storage.getAlgorithm(id);
            if (algo === undefined) {
                return new ApiErrorModel(404, `not found`);
            }

            id = parseInt(id);
            if(Object.keys(data).length === 1) {
                let prompt = data["prompt"];
                console.log(prompt);
                questionId = this.serviceManager.storage
                    .algorithms[id].addQuestion(prompt);
            }
            else {
                questionId = this.serviceManager.storage
                    .algorithms[id].addQuestionByData(data); //id is overwritten if included
            }
        } catch(e) {
            console.log({"questionId": questionId});
            return new JsonModel({"success" : false});
        }
        console.log({"success" : true, "questionId": questionId});
        return new JsonModel({"success" : true, "questionId": questionId});
    }

    //Post an update to a question
    postAction() {
        let id = this.request.query.id; //query data from id to get exact algorithm
        let key = this.request.query.key;
        let questionId = this.request.query.questionId; //query data for question id to seach question
        if ((key === "" || key === "") || 
            (id === "" || id === undefined) || 
            (questionId === "" || questionId === undefined)) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        //Get body data
        let data; //verify data
        try {
            data = JSON.parse(this.request.body.data);
        } catch (e) {
            return new ApiErrorModel(405, `needs data object. Parameter invalid`);
        }

        try {
            id = parseInt(id);

            //Check if there is an algorithm
            let algo = this.serviceManager.storage.getAlgorithm(id);
            if (algo === undefined) {
                return new ApiErrorModel(404, `not found`);
            }

            let question = this.serviceManager.storage.algorithms[id].getAlgorithm(id);
            if (question === undefined) {
                return new ApiErrorModel(404, `not found`);
            }

            question = data.question;
            console.log(question);

            this.serviceManager.storage
                .algorithms[id]
                .questions[questionId].fromObj(question);
        } catch (e) {
            return new JsonModel({"success": false});
        }
        return new JsonModel({"success": true});
    }
}

module.exports = QuestionController;