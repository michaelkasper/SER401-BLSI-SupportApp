'use strict';

const AbstractModel = require("./AbstractModel");
const Question = require("./QuestionModel");
const Recommendation = require("./RecommendationModel");

class AlgorithmModel extends AbstractModel{
    constructor(name) {
        super();
        // Abstract Model values
        //this.id = null;

        this.name = "";
        this.currentQuestionId = 0;
        this.currentRecommendationId = 0;
        this.startId = null;
        this.description = null;
        this.shortDescription = null;
        this.questions = []; //id points to index
        this.recommendations = [];
    }

    getQuestion(id) {
        let question;
        try {
            question = this.questions[parseInt(id)];
        } catch (e) {
            console.log(e.toString());
            return null;
        }
        return question;
    }

    getRecommendation(id) {
        let recommend;
        try {
            recommend = this.recommendations[parseInt(id)];
        } catch (e) {
            console.log(e.toString());
            return null;
        }
        return recommend;
    }

    addQuestionFromData(data) {
        this.questions[this.currentQuestionId] = new Question();
        this.questions[this.currentQuestionId].fromObj(data);
        this.questions[this.currentQuestionId].algorithmParent  = this.id;
        this.questions[this.currentQuestionId].id = this.currentQuestionId++; //overwrite id
        return this.currentQuestionId - 1;
    }

    addRecommendationFromData(data) {
        this.recommendations[this.currentRecommendationId] = new Recommendation();
        this.recommendations[this.currentRecommendationId].fromObj(data);
        this.recommendations[this.currentRecommendationId].algorithmParent = this.id;
        this.recommendations[this.currentRecommendationId].id = this.currentRecommendationId++; //overwrite id
        return this.currentRecommendationId - 1;
    }

    setStart(id) {
        for(let quest in this.questions) {
            if(id === quest.id) {
                return this.startId = id;
            }
        }
        for (let recommend in this.recommendations) {
            if (id === recommend.id) {
                return this.startId = id;
            }
        }
        return null;
    }
}

module.exports = AlgorithmModel;