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

            if (algo === undefined) {
                return new ApiErrorModel(404, `not found`);
            }
            return new JsonModel(algo);
        }
    }

    //Put in new algorithm
    //json data: {"name" : "tester"}
    //json data: {"algorithm":{"name": "test", "currentId": 0, "description": null, "id": 0, "questions": [], "recommendations" : [], "shortDescription" : "testers", "startId": null}}
    putAction() {
        let data; //verify data
        try {
            data = JSON.parse(this.request.body.data);
        } catch(e) {
            return new ApiErrorModel(405, `needs data object. Parameter invalid`);
        }

        let key = this.request.query.key;
        if (key === "" || key === undefined) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        //Get name of algorithm
        let name;
        try {
            name = data["name"]; //fetch sends with data named object with string json
            console.log(name);
        } catch(e) {
            return new ApiErrorModel(403, `request denied`);
        }
        
        //Check for existing name
        let algorithmMatches = this.serviceManager.storage.getAlgorithmByName(name);
        if (algorithmMatches === []) {
            return new ApiErrorModel(403, `request denied`);
        }
        
        //Make and return id
        let id;
        try {
            if(Object.keys(data).length === 1) {
                id = this.serviceManager.storage.addAlgorithm(name);
            }
            else {
                id = this.serviceManager.storage.addAlgorithmByData(data); //id is overwritten if included
            }
        } catch(e) {
            return new JsonModel({"success" : false});
        }
        console.log({"success" : true, "id": id});
        return new JsonModel({"success" : true, "id": id});
    }

    //Post an update
    //json data: {"algorithm":{"name": "test", "currentId": 0, "description": null, "id": 0, "questions": [], "recommendations" : [], "shortDescription" : "testers", "startId": null}}
    postAction() {
        let data; //Verify data
        try {
            data = JSON.parse(this.request.body.data);
        } catch (e) {
            return new ApiErrorModel(405, `needs data object. Parameter invalid`);
        }

        let id = this.request.query.id ; //query data from name to add to database
        let key = this.request.query.key;
        if (key === "" || key === undefined || 
            id === "" || id === undefined) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        try {
            id = parseInt(id); //Make sure id is an int

            //find the algorithm
            let algo = this.serviceManager.storage.getAlgorithm(id);
            if (algo === undefined) {
                return new ApiErrorModel(404, `not found`);
            }

            algo = data.algorithm
            console.log(algo);
            
            this.serviceManager.storage.algorithms[id].fromObj(algo);
        } catch (e) {
            return new JsonModel({"success": false});
        }
        return new JsonModel({"success": true});
    }
}

module.exports = AlgorithmController;