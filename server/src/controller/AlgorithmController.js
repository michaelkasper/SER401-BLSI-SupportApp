'use strict';

//Add for later handling of Algorithm routing
var AbstractController = require('./AbstractController');
var ApiErrorModel = require('./../model/ApiErrorModel');
var JsonModel = require('./../model/JsonModel');

class AlgorithmController extends AbstractController{
    dispatch() {
        return super.dispatch(false);
    }

    getAction() {   
        console.log("==== GET ====");
        let id = this.request.query.id; //query data from id to get exact algorithm
        let key = this.request.query.key;
        console.log("id", id);
        console.log("key", key);
        if ((key === "" || key === "") || (id === "" || id === undefined)) { //if both values are missing
             return new ApiErrorModel(405, `method not allowed`);
        }

        let algo = this.serviceManager.storage.getAlgorithm(id);
        console.log(id, algo);
        if (algo === undefined) {
            return new ApiErrorModel(404, `not found`);
        }

        return new JsonModel(algo);
    }

    //Put in new algorithm
    //json data: {"name" : "tester"}
    //json data: {"algorithm":{"name": "test", "currentId": 0, "description": null, "id": 0, "questions": [], "recommendations" : [], "shortDescription" : "testers", "startId": null}}
    putAction() {
        console.log("==== PUT ====");
        let key = this.request.query.key;
        console.log("key", key);
        if (key === "" || key === undefined) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }
        
        
        
        //Make and return id
        let id;
        try {
            let data = JSON.parse(this.request.body.data); //Verify data
            console.log("Data", data);

            //Get name of algorithm
            let name = data["name"]; //fetch sends with data named object with string json
            console.log("Name",name);

            //Check for existing name
            let algorithmMatches = this.serviceManager.storage.getAlgorithmByName(name);
            console.log("Matches", algorithmMatches);
            if (algorithmMatches === []) {
                return new ApiErrorModel(403, `request denied`);
            }

            if(Object.keys(data).length === 1) {
                id = this.serviceManager.storage.addAlgorithm(name);
            }
            else {
                id = this.serviceManager.storage.addAlgorithmFromData(data); //id is overwritten if included
            }
        } catch(e) {
            console.log(e.toString());
            return new ApiErrorModel(405, `needs data object. Parameter invalid`);
        }
        console.log({"success" : true, "id": id});
        return new JsonModel({"success" : true, "id": id});
    }

    //Post an update
    //json data: {"algorithm":{"name": "test", "currentId": 0, "description": null, "id": 0, "questions": [], "recommendations" : [], "shortDescription" : "testers", "startId": null}}
    postAction() {
        console.log("==== POST ====");

        let id = this.request.query.id ; //query data from name to add to database
        let key = this.request.query.key;
        if (key === "" || key === undefined || 
            id === "" || id === undefined) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        try {
            let data = JSON.parse(this.request.body.data);
            console.log("Data", data);

            id = parseInt(id); //Make sure id is an int

            //find the algorithm
            let algo = this.serviceManager.storage.getAlgorithm(id);
            console.log("Algorithm", algo);
            if (algo === undefined) {
                return new ApiErrorModel(404, `not found`);
            }

            algo = data.algorithm
            console.log("Update for Algorithm", algo);
            
            this.serviceManager.storage.algorithms[id].fromObj(algo);
        } catch (e) {
            console.log(e.toString());
            return new ApiErrorModel(405, `needs data object. Parameter invalid`);
        }
        return new JsonModel({"success": true});
    }
}

module.exports = AlgorithmController;