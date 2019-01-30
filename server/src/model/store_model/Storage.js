'use strict';

const AbstractModel = require("./AbstractModel");
const Algorithm = require("./AlgorithmModel");
const State = require("./StateModel");

class Storage{
    constructor() {
        // Abstract Model values
        //this.id = null;

        this.currentId = 0; //iterator to hold curent identifier to be used by new algorithms algorithm
        this.algorithms = [];
        this.keys = [];
        this.states = [];
    }

    keyExists(key) {
        try {
            return this.keys[key];
        } catch (e) {
            console.log(e.toString());
            return null;
        }
    }

    addKey(key) {
        try {
            this.keys[key] = key;
        } catch (e) {
            console.log(e.toString());
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

    getAlgorithms() {
        try {
            return Object.values(this.algorithms);
        } catch (e) {
            return null;
        }
    }

    addAlgorithmFromData(data) {
        this.algorithms[this.currentId] = new Algorithm();
        this.algorithms[this.currentId].fromObj(data);
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