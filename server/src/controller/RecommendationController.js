'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

const RecommendationTransporter = require("../transporter/RecommendationTransporter");

class RecommendationController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);

        this.transporter = new RecommendationTransporter();
        this.dataType = "recommendation"
    }

    dispatch() {
        return super.dispatch();
    }
}

module.exports = RecommendationController;