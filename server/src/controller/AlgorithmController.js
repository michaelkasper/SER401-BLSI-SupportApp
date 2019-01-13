'use strict';

//Add for later handling of Algorithm routing
const AbstractController = require('./AbstractController');
const JsonModel = require('./../model/JsonModel');

class AlgorithmController extends AbstractController{
    dispatch() {
        return super.dispatch(false);
    }

    getAction() {
        let name = this.param('input', "");
        if(name !== "") {
            
        }
    }

    postAction() {
        return new JsonModel(this.respsonse);
    }
}

module.exports = AlgorithmController;