'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const AlgorithmTransporter = require("./AlgorithmTransporter");
const QuestionTransporter = require("./QuestionTransporter");
const RecommendationTransporter = require("./RecommendationTransporter");
const QuestionOptionTransporter = require("./QuestionOptionTransporter");
const StateTransporter = require("./StateTransporter");
const KeyTransporter = require("./KeyTransporter");

class DatabaseTransporter{
    constructor() {
        this.algorithm = new AlgorithmTransporter();
        this.question = new QuestionTransporter();
        this.recommendation = new RecommendationTransporter();
        this.questionOption = new QuestionOptionTransporter();
        this.state = new StateTransporter();
        this.key = new KeyTransporter();
    }
}

module.exports = DatabaseTransporter;