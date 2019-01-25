'use strict';

const AbstractModel = require("./AbstractModel");
const Algorithm = require("./AlgorithmModel");

class Storage extends AbstractModel{
    constructor(storage) {
        super(storage);
        // Abstract Model values
        //this.storage = storage;
        //this.id = null;

        this.currentId = 0; //iterator to hold curent identifier to be used by new algorithms algorithm
        this.algorithms = [];
    }

    getAlgorithm(id) {
        let algo;
        try {
            algo = this.algorithms[parseInt(id)];
        } catch (e) {
            return null;
        }
        return this.algorithms[parseInt(id)];
    }

    addAlgorithm(name) {
        this.algorithms[this.currentId] = new Algorithm(this.storage, name);
        this.algorithms[this.currentId].id = this.currentId++;
        return this.currentId - 1;
    }

    findAlgorithms(name) {
        let algos = [];
        for(let a in this.algorithms) {
            if(a.name.includes(name)) {
                algos.push(a);
            }
        }
        return JSON.stringify(algos);
    }

    getAlgorithmByName(name) {
        let algos = [];
        for(let a in this.algorithms) {
            if(a.name === name) {
                algos.push(a);
            }
        }
        return JSON.stringify(algos);
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

    //Saves to hosted db. Not needed until we have need to setup hosting.
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

module.exports = Storage;