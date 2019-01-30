'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

//Add for later handling of Algorithm routing
var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');

class RecommendationController extends AbstractController {
    dispatch() {
        return super.dispatch(false);
    }

    //Get recommendation from algo
    getAction() {
        console.log("==== GET ====");
        let id = this.request.query.id; //query data from id to get exact algorithm
        let key = this.request.query.key;
        let recommendationId = this.request.query.recommendationId; //query data for recommendation id to seach recommendation
        console.log("id", id);
        console.log("key", key);
        console.log("recommendationId", recommendationId);
        if ((key === "" || key === "") ||
            (id === "" || id === undefined) ||
            (recommendationId === "" || recommendationId === undefined)) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        let algo = this.serviceManager.storage.getAlgorithm(id);
        console.log("Algorithm", algo);
        if (algo === undefined || algo === null) {
            return new ApiErrorModel(404, `not found`);
        }

        let recommendation = algo.getRecommendation(id);
        console.log("Recommendation", recommendation)
        if (recommendation === undefined || recommendation === null) {
            return new ApiErrorModel(404, `not found`);
        }
        return new JsonModel(recommendation);
    }

    //Put in new recommendation
    //{"title": "Recommendation", "description" : "This is the description."}
    //{"recommendation" : {"id": 1,"algorithmParent": 0,"title": "Recommendation", "description": "This is the description modified.", "contentContinued": [] }}
    //{"id": 1,"algorithmParent": 0,"title": "Recommendation", "description": "This is the description modified.", "contentContinued": [] }

    putAction() {
        console.log("==== PUT ====");
        let id = this.request.query.id; //query data from id to get exact algorithm
        let key = this.request.query.key;
        console.log("id", id);
        console.log("key", key);
        if ((key === "" || key === "") || (id === "" || id === undefined)) { //id is query
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        //Get body data
        let data;
        let recommendationId;
        try {
            //verify data
            data = JSON.parse(this.request.body.data);
            console.log("Data", data);

            //Check format of data
            let recommendation = data.recommendation;
            console.log(recommendation);
            if (recommendation === undefined) {
                recommendation = data;
            }

            //Check if the algorithm exists
            let algo = this.serviceManager.storage.getAlgorithm(id);
            console.log("Algorithm", algo);
            if (algo === undefined) {
                return new ApiErrorModel(404, `not found`);
            }

            id = parseInt(id);
            recommendationId = this.serviceManager.storage.algorithms[id].addRecommendationFromData(data); //id is overwritten if included 
        } catch (e) {
            console.log(e.toString(), recommendationId);
            return new ApiErrorModel(405, `needs data object. Parameter invalid`);
        }
        console.log("recommendationId", recommendationId);
        return new JsonModel({
            "success": true,
            "recommendationId": recommendationId
        });
    }

    //Post an update to a recommendation
    //{"recommendation" : {"id": 1,"algorithmParent": 0,"title": "Recommendation", "description": "This is the description modified.", "contentContinued": [] }}
    //{"id": 1,"algorithmParent": 0,"title": "Recommendation", "description": "This is the description modified.", "contentContinued": [] }
    postAction() {
        console.log("==== POST ====");
        let id = this.request.query.id; //query data from id to get exact algorithm
        let key = this.request.query.key;
        let recommendationId = this.request.query.recommendationId; //query data for recommendation id to seach recommendation
        console.log("id", id);
        console.log("key", key);
        console.log("recommendationId", recommendationId);
        if ((key === "" || key === "") ||
            (id === "" || id === undefined) ||
            (recommendationId === "" || recommendationId === undefined)) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        //Get body data and check for algo and recommendation
        try {
            //Get body data
            let data = JSON.parse(this.request.body.data);
            console.log("Data", data);

            id = parseInt(id); //Make sure id is an int 

            //Check if there is an algorithm
            let algo = this.serviceManager.storage.getAlgorithm(id);
            if (algo === undefined) {
                return new ApiErrorModel(404, `not found`);
            }

            let recommendation = this.serviceManager.storage.algorithms[id].getRecommendation(id);
            if (recommendation === undefined) {
                return new ApiErrorModel(404, `not found`);
            }

            //Check for different data and swap
            recommendation = data.recommendation;
            console.log(recommendation);
            if(recommendation === undefined) { 
                recommendation = data;
            }

            this.serviceManager.storage
                .algorithms[id]
                .recommendations[recommendationId].fromObj(recommendation);
        } catch (e) {
            console.log(e.toString());
            return new ApiErrorModel(405, `needs data object. Parameter invalid`);
        }
        return new JsonModel({
            "success": true
        });
    }
}

module.exports = RecommendationController;