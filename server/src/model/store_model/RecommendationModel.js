'use strict';

const AbstractModel = require("./AbstractModel");

class RecommendationModel extends AbstractModel {
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        this.dataType = "recommendation"; //used to easily identify the datatype when sent individually
        
        this.algorithmParent = null; //identifies the algorithm that it is a part of.
        this.title = "";
        this.description = "";
        this.contentContinued = [];
    }

    addContentContinued(information) {
        this.contentContinued.push(information);
    }
}

module.exports = RecommendationModel;