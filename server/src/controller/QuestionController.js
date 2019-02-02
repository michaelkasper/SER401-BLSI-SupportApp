'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

const QuestionTransporter = require("../transporter/QuestionTransporter");

class QuestionController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);

        this.transporter = new QuestionTransporter();
        this.dataType = "question"
    }

    dispatch() {
        return super.dispatch();
    }
}

module.exports = QuestionController;