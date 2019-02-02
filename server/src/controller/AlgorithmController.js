'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

//Add for later handling of Algorithm routing
var AbstractController = require('./AbstractController');
var ApiErrorModel      = require('./../model/ApiErrorModel');
var JsonModel          = require('./../model/JsonModel');

const AlgorithmTransporter = require("../transporter/AlgorithmTransporter");

class AlgorithmController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);

        this.transporter = new AlgorithmTransporter();
        this.dataType = "algorithm"
    }

    dispatch() {
        return super.dispatch();
    }

}

module.exports = AlgorithmController;