'use strict';

const AbstractModel = require("./AbstractModel");
const Algorithm = require("./AlgorithmModel");

class Storage extends AbstractModel{
    constructor() {
        super();
        // Abstract Model values
        //this.id = null;

        this.currentId = 0; //iterator to hold curent identifier to be used by new algorithms algorithm
        this.algorithms = [];
        this.keys = [];
    }

    keyExists(key) {
        try {
            return this.keys[key];
        } catch (e) {
            return null;
        }
    }

    addKey(key) {
        try {
            this.keys[key] = key;
        } catch (e) {
            return null;
        }
        return key;
    }

    getAlgorithm(id) {
        try {
            return this.algorithms[parseInt(id)];
        } catch (e) {
            return null;
        }
    }

    addAlgorithm(name) {
        this.algorithms[this.currentId] = new Algorithm(name);
        this.algorithms[this.currentId].id = this.currentId++;
        return this.currentId - 1;
    }

    addAlgorithmFromData(data) {
        this.algorithms[this.currentId] = new Algorithm();
        this.algorithms[this.currentId].fromObject(data);
        this.algorithms[this.currentId].id = this.currentId++; //overwrite id
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
}

module.exports = Storage;