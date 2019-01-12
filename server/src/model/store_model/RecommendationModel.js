'use strict';

const AbstractModel = require("./AbstractModel");

class RecommendationModel extends AbstractModel {
    constructor(storage) {
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        //this.state = null;
        //this.algorithmParent = null;
        //this.dataType = null;
        super(storage);

        this.title = "";
        this.description = "";
    }
}

module.exports = RecommendationModel;