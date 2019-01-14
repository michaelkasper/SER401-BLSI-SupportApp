'use strict';

const AbstractModel = require("./AbstractModel");

class Store extends AbstractModel{
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;
        //this.state = null;

        this.algorithms = [];
    }

    //Add comparison of questions and recommendations
    //Will be used to indicate the a change in the algoritm
    changesMade(algorithmId) {

    }

    //Checks if id of this algo exists
    existsInHosted(algorithmId) {
        if (this.dataType === null ||
            this.id === null) {
            return;
        }

        //query datatype in storage and check for id
    }

    saveToHosted() {
        if (this.existsInHost())
            return;
        
        for (let algo in this.algorithms) {
            if (this.existsInHosted(algo.id)) {
                //Replace in hosted db
                return algo;
            }
            else {
                //Add to db
            }
        }
    }

    //Can Return the algo
    existsInWorkspace(algorithmId) {
        if (this.dataType === null ||
            this.id === null ||
            this.state === null) {
            return;
        }

        //query datatype in algorithms and check for id
        for(let algo in this.algorithms) {
            if(algo.id === algorithmId) {
                return algo;
            }
        }
        return null;
    }

    saveToWorkspace(algorithm) {
        if (this.existsInWorkspace(algorithm.id)) {
            let index = 0;
            for(let algo in this.algorithms) {
                if(algo.id === algorithm.id) {
                    break;
                }
                index++;
            }
            this.algorithms[index] = algorithm;
        }
        else {
            this.algorithms.push(algorithm);
        }
            

        
    }
}

module.exports = Store;