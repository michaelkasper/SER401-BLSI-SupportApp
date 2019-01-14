'use strict';

const AbstractModel = require("./AbstractModel");

class RecommendationModel extends AbstractModel {
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        //this.state = null;
        this.dataType = "recommendation";
        
        this.algorithmParent = null; //identifies the algorithm that it is a part of.
        this.title = "";
        this.description = "";
    }
}

module.exports = RecommendationModel;