'use strict';

//Add for later handling of Algorithm routing
const AbstractController = require('./AbstractController');
const JsonModel = require('./../model/JsonModel');

class AlgorithmController extends AbstractController{
    dispatch() {
        return super.dispatch(false);
    }

    getAction() {
        return new ApiErrorModel(405, `method not allowed`);
    }

    postAction() {
        return new ApiErrorModel(405, `method not allowed`);
    }
}

module.exports = AlgorithmController;