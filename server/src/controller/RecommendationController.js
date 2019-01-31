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

    getAllAction(params) {
        console.log("==== GET All ====");
        let id = parseInt(params.id); //Make sure id is an int
        let recommendationId = parseInt(params.recommendationId);
        let collect = this.storage.getAlgorithm(id).recommendations;

        return new JsonModel({
            collection: collect
        });
    }

    //Get recommendation from algo
    getAction(params) {
        console.log("==== GET ====");
        let id = parseInt(params.id); //Make sure id is an int
        let recommendationId = parseInt(params.recommendationId);

        if ((id === "" || id === undefined) ||
            (recommendationId === "" || recommendationId === undefined)) { //if any value is missing
            return new ApiErrorModel(404, `not found`);
        }

        let algo = this.storage.algorithms[id];
        console.log("Algorithm", algo);
        if (!algo) {
            return new ApiErrorModel(404, `not found`);
        }

        let recommendation = algo.getRecommendation(recommendationId).minify();
        console.log("recommendation", recommendation)
        if (!recommendation) {
            return new ApiErrorModel(404, `not found`);
        }
        return new JsonModel(recommendation);
    }

    //Put in new recommendation
    //{"title": "Recommendation", "description" : "This is the description."}
    //{"recommendation" : {"id": 1,"algorithmParent": 0,"title": "Recommendation", "description": "This is the description modified.", "contentContinued": [] }}
    //{"id": 1,"algorithmParent": 0,"title": "Recommendation", "description": "This is the description modified.", "contentContinued": [] }

    putAction(params, data) {
        console.log("==== PUT ====");
        let id = parseInt(params.id); //query data from id to get exact algorithm
        if ((id === "" || id === undefined)) { //id is query
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        if (data.recommendation) {
            data = data.recommendation;
        }

        //Check if the algorithm exists
        let algo = this.serviceManager.storage.getAlgorithm(id);
        console.log("Algorithm", algo);
        if (!algo) {
            return new ApiErrorModel(404, `not found`);
        }

        let recommendationId = this.storage.algorithms[id].addRecommendationFromData(data); //id is overwritten if included
        return new JsonModel({
            "success": true,
            "recommendationId": recommendationId
        });
    }

    //Post an update to a recommendation
    //{"recommendation" : {"id": 1,"algorithmParent": 0,"title": "Recommendation", "description": "This is the description modified.", "contentContinued": [] }}
    //{"id": 1,"algorithmParent": 0,"title": "Recommendation", "description": "This is the description modified.", "contentContinued": [] }
    postAction(params, data) {
        console.log("==== POST ====");
        let id = parseInt(params.id); //query data from id to get exact algorithm
        let recommendationId = parseInt(params.recommendationId); //query data for recommendation id to seach recommendation
        if ((id === "" || id === undefined) ||
            (recommendationId === "" || recommendationId === undefined)) { //if any value is missing
            return new ApiErrorModel(405, `parameters not allowed`);
        }

        //Check if there is an algorithm
        let algo = this.serviceManager.storage.getAlgorithm(id);
        if (algo === undefined) {
            return new ApiErrorModel(404, `not found`);
        }

        let recommendation = this.serviceManager.storage.algorithms[id].getRecommendation(id);
        if (recommendation === undefined) {
            return new ApiErrorModel(404, `not found`);
        }

        if (data.recommendation) {
            data = data.recommendation;
        }

        this.storage.algorithms[id].recommendations[recommendationId].fromObj(data);
        return new JsonModel({
            "success": true
        });
    }
}

module.exports = RecommendationController;