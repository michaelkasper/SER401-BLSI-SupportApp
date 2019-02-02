'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

//Add for later handling of Algorithm routing
var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

const QuestionOptionTransporter = require("../transporter/QuestionOptionTransporter");

class QuestionOptionController extends AbstractController{
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);

        this.transporter = new QuestionOptionTransporter();
        this.dataType = "questionOption"
    }

    dispatch() {
        return super.dispatch();
    }
}

module.exports = QuestionOptionController;