'use strict';

const AbstractModel = require("./AbstractModel");

class AlgorithmModel extends AbstractModel{
    constructor(storage, name) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        //this.state = null;

        this.currentId = 0;
        this.startId = 0;
        this.name = name;
        this.description = null;
        this.shortDescription = null;

        this.questions = [];
        this.recommendations = [];
    }

}

module.exports = AlgorithmModel;