'use strict';

//Add for later handling of Algorithm routing
const AbstractController = require('./AbstractController');
const ApiErrorModel = require('./../model/ApiErrorModel');
const JsonModel = require('./../model/JsonModel');

class AlgorithmController extends AbstractController{
    dispatch() {
        return super.dispatch(false);
    }

    getAction() { 
                    
        let id = this.param('id', ""); //query data from id to get exact algorithm
        let name = this.param("name", ""); //query data from name to search algorithm
        if(id === "" && name === "") {
             return new ApiErrorModel(405, `method not allowed`);
        }

        return new JsonModel(this.respsonse);
    }

    //Put in new algorithm
    putAction() {
        return new JsonModel(this.respsonse);
    }

    postAction() {
        return new JsonModel(this.respsonse);
    }
}

module.exports = AlgorithmController;