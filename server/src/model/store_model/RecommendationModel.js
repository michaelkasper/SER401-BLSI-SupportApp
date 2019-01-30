'use strict';

const AbstractModel = require("./AbstractModel");

class RecommendationModel extends AbstractModel {
    constructor() {
        super();
        // Abstract Model values
        //this.id = null;
        
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