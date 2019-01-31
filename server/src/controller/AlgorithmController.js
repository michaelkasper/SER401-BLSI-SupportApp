'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

//Add for later handling of Algorithm routing
var AbstractController = require('./AbstractController');
var ApiErrorModel      = require('./../model/ApiErrorModel');
var JsonModel          = require('./../model/JsonModel');

class AlgorithmController extends AbstractController {
    dispatch() {
        return super.dispatch(false);
    }

    getAllAction(params) {
        console.log("==== GET All ====");
        return new JsonModel({collection: this.storage.getAlgorithms()});
    }

    getAction(params) {
        console.log("==== GET ====");

        let id = parseInt(params.id); //Make sure id is an int
        if ((id === "" || id === undefined)) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        let algo = this.storage.getAlgorithm(id).minify();
        console.log("Algorithm", algo);
        if (!algo) {
            return new ApiErrorModel(404, `not found`);
        }
        return new JsonModel(algo);
    }

    //Put in new algorithm
    //json data: {"name" : "tester"}
    //json data: {"algorithm":{"name": "test", "currentId": 0, "description": null, "id": 0, "questions": [], "recommendations" : [], "shortDescription" : "testers", "startId": null}}
    // {"name": "test", "currentId": 0, "description": null, "id": 0, "questions": [], "recommendations" : [], "shortDescription" : "testers", "startId": null}
    putAction(params, data) {
        console.log("==== PUT ====");
        let id = this.storage.addAlgorithmFromData(data); //id is overwritten if included

        return new JsonModel({
            "success": true,
            "id": id
        });
    }

    //Post an update
    //json data: {"algorithm":{"name": "tester", "currentId": 0, "description": null, "id": 0, "questions": [], "recommendations" : [], "shortDescription" : "testers", "startId": null}}
    //{"name": "tester", "currentId": 0, "description": null, "id": 0, "questions": [], "recommendations" : [], "shortDescription" : "testers", "startId": null}
    postAction(params, data) {
        console.log("==== POST ====");
        let id = parseInt(params.id); //Make sure id is an int
        if ((id === "" || id === undefined)) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        let algo = this.storage.getAlgorithm(id);
        console.log("Algorithm", algo);
        if (!algo) {
            return new ApiErrorModel(404, `not found`);
        }

        if (data.algorithm) {
            data = data.algorithm;
        }

        this.storage.algorithms[id].fromObj(data);
        //find the algorithm
        return new JsonModel({
            "success": true
        });      
    }
}

module.exports = AlgorithmController;