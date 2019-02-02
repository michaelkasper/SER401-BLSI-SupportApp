'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

const StateTransporter = require("../transporter/StateTransporter.js");

class QuestionController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);

        this.transporter = new StateTransporter();
        this.dataType = "state"
    }

    dispatch() {
        return super.dispatch();
    }
}

module.exports = QuestionController;