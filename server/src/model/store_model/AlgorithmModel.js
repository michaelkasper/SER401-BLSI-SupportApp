'use strict';

const AbstractModel = require("./AbstractModel");

class AlgorithmModel extends AbstractModel{
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        //this.state = null;
        //this.algorithmParent = null;
        //this.dataType = null;
        
        this.startId = 0;
        this.description = null;
        this.shortDescription = null;
    }
}

module.exports = AlgorithmModel;