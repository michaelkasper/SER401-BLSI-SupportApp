'use strict';

//Add for later handling of Algorithm routing
var AbstractController = require('./AbstractController');
var ApiErrorModel = require('./../model/ApiErrorModel');
var JsonModel = require('./../model/JsonModel');
var KeyModel = require("./../model/KeyModel");

class AlgorithmController extends AbstractController{
    dispatch() {
        return super.dispatch(false);
    }

    getAction() {              
        let id = this.param('id', ""); //query data from id to get exact algorithm
        let name = this.param("name", ""); //query data from name to search algorithm
        if(id === "" && name === "") { //if both values are missing
             return new ApiErrorModel(405, `method not allowed`);
        } else if(id !== "") {
            let algo = this.serviceManager.storage.getAlgorithm(id);
            return new JsonModel(JSON.stringify(algo));
        } else if(name !== "") {
            let algorithmMatches = this.serviceManager.storage.findAlgorithms(id);
            return new JsonModel(JSON.stringify(algorithmMatches));
        }
    }

    //Put in new algorithm
    putAction() {
        let name = this.param("name", ""); //query data from name to add to database
        let key = this.param("key", "");
        if (key === "" || name === "") { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        try {
            let id = this.serviceManager.storage.addAlgorithm(name);
            this.serviceManager.storage.algorithms[id] = this.request.body.algorithm;
        } catch(e) {
            return new JsonModel({"success" : false});
        }
        return new JsonModel({"success" : true});
    }

    //Post an update
    postAction() {
        let id = this.param("id", ""); //query data from name to add to database
        let key = this.param("key", "");
        if (key === "" || id === "") { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        try {
            this.serviceManager.storage.algorithms[id] = this.request.body.algorithm;
        } catch (e) {
            return new JsonModel({"success": false});
        }
        return new JsonModel({"success": true});
    }
}

module.exports = AlgorithmController;