'use strict';

//Add for later handling of Algorithm routing
var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

class QuestionController extends AbstractController{
    dispatch() {
        return super.dispatch(false);
    }

    //Get question from algo
    getAction() {              
        let id = this.param('id', ""); //query data from id to get exact algorithm
        let name = this.param("name", ""); //query data from name to search algorithm
        let questionId = this.param("questionId", ""); //query data for question id to seach question
        if(id === "" && name === "" && questionId === "") { //if all values are missing
             return new ApiErrorModel(405, `method not allowed`);
        } else if(questionId !== "") {
            if (id !== "") {
                let algo = this.serviceManager.storage.getAlgorithm(id);
                return new JsonModel(JSON.stringify(algo));
            } else if (name !== "") {
                let algorithmMatches = this.serviceManager.storage.findAlgorithms(name);
                return new JsonModel(JSON.stringify(algorithmMatches));
            }
        }
    }

    //Put in new question
    putAction() {
        let id = this.param('id', ""); //query data from id to get exact algorithm
        let key = this.param("key", "");

        if (key === "" || id === "") { //id is query
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        try {
            this.serviceManager.storage.algorithms[id].addQuestion(this.request.body.questionPrompt);
        } catch(e) {
            return new JsonModel({"success" : false});
        }
        return new JsonModel({"success" : true});
    }

    //Post an update to a question
    postAction() {
        let id = this.param("id", ""); //query data from name to add to database
        let key = this.param("key", "");
        let questionId = this.param("questionId", ""); //query data for question id to seach question
        if (key === "" || id === "" || questionId === "") { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        try {
            this.serviceManager.storage.algorithms[id].questions[questionId] = this.request.body.question;
        } catch (e) {
            return new JsonModel({"success": false});
        }
        return new JsonModel({"success": true});
    }
}

module.exports = QuestionController;