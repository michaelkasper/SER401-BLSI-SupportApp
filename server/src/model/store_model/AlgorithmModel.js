'use strict';

const AbstractModel = require("./AbstractModel");
const Question = require("./QuestionModel");
const Recommendation = require("./RecommendationModel");

class AlgorithmModel extends AbstractModel{
    constructor(storage, name) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;

        this.currentId = 0;
        this.startId = null;
        this.name = name;
        this.description = null;
        this.shortDescription = null;

        this.questions = []; //id points to index
        this.recommendations = [];
    }

    getQuestion(id) {
        return this.questions[id];
    }

    getRecommendation(id) {
        return this.recommendations[id];
    }

    addQuestion(prompt) {
        if(this.startId == null) {
            this.startId = 0;
        }

        let question = new Question(this.storage);
        question.id = this.currentId; //Set to current, but increase after
        question.algorithmParent = this;
        question.promt = prompt;

        this.question[this.currentId++] = question; //Set to array with current id, but increase after
        return question.id;
    }

    addRecommendation(title, description) {
        if (this.startId == null) {
            this.startId = 0;
        }

        let recommend = new Recommendation(this.storage);
        recommend.id = this.currentId;
        recommend.algorithmParent = this;
        recommend.title = title;
        recommend.description = description;

        this.recommendation[this.currentId++] = recommend; //Set to array with current id, but increase after
        return recommend.id;
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