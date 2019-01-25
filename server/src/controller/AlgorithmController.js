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
        let id = this.request.query.id; //query data from id to get exact algorithm
        if(id === "" || id === undefined) { //if both values are missing
             return new ApiErrorModel(405, `method not allowed`);
        } else {
            let algo = this.serviceManager.storage.getAlgorithm(id);
            console.log(id, algo);
            return new JsonModel(algo);
        }
    }

    //Put in new algorithm
    putAction() {
        let key = this.request.query.key;
        let name = this.request.body.name;
        if (key === "" || key === undefined) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        let algorithmMatches = this.serviceManager.storage.getAlgorithmByName(name);
        if (algorithmMatches === []) {
            return new ApiErrorModel(403, `request denied`);
        }
        
        let id;
        try {
            id = this.serviceManager.storage.addAlgorithm(name);
        } catch(e) {
            return new JsonModel({"success" : false});
        }
        console.log({"success" : true, "id": id});
        return new JsonModel({"success" : true, "id": id});
    }

    //Post an update
    postAction() {
        let id = this.request.query.id ; //query data from name to add to database
        let key = this.request.query.key;
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