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
        this.currentId = 0;
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
            return null;
        }
        return question;
    }

    getRecommendation(id) {
        let recommend;
        try {
            recommend = this.recommendations[parseInt(id)];
        } catch (e) {
            return null;
        }
        return recommend;
    }

    addQuestion(prompt) {
        if(this.startId === null) {
            this.startId = 0;
        }
        
        this.questions[this.currentId] = new Question();
        this.questions[this.currentId].prompt = prompt;
        this.questions[this.currentId].algorithmParent = this.id;
        this.questions[this.currentId].id = this.currentId++;
        return this.currentId - 1;
    }

    addRecommendation(title, description) {
        if (this.startId == null) {
            this.startId = 0;
        }
        
        this.recommendations[this.currentId] = new Recommendation(); 
        this.recommendations[this.currentId].title = title;
        this.recommendations[this.currentId].description = description;
        this.recommendations[this.currentId].algorithmParent = this.id;
        this.recommendations[this.currentId].id = this.currentId++;
        return this.currentId - 1;
    }

    addQuestionFromData(data) {
        this.questions[this.currentId] = new Question();
        this.questions[this.currentId].fromObject(data);
        this.questions[this.currentId].id = this.currentId++; //overwrite id
        return this.currentId - 1;
    }

    addRecommendationFromData(data) {
        this.recommendations[this.currentId] = new Recommendation();
        this.recommendations[this.currentId].fromObject(data);
        this.recommendations[this.currentId].id = this.currentId++; //overwrite id
        return this.currentId - 1;
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