'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('./../model/ApiErrorModel');
var JsonModel = require('./../model/JsonModel');

const uuid = require("uuid/v4");

class KeyController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);
        this.dataType = "key";
    }

    dispatch() {  
        //this.secure is modified in methods
        return super.dispatch();
    }

    getAllAction(query, params, data) {
        this.secure = false; //Allow keyless pulls

        console.log("==== GET All ====");
        return new Promise((resolve, reject) => {
            if (data.password !== "blsi402MobileApp401") {
                throw new Error("bad password");
            }
            resolve(this.database.key.getAll());
        }).then(collection => {
            return new JsonModel({
                collection: collection
            });
        });
    }

    getAction(params, data) {
        this.secure = true; //Make sure secure

        console.log("==== GET ====");
        return new Promise((resolve, reject) => {
            if (data.password !== "blsi402MobileApp401") {
                throw new Error("bad password");
            }

            let id = parseInt(params.id);
            resolve(this.database.key.get(id));
        }).then(data => {
            return new JsonModel(data);
        });
    }

    deleteAllAction(params, data) {
        this.secure = true; //Make sure secure

        console.log("==== DELETE ====");
        return new Promise((resolve, reject) => {
            resolve(this.database.key.deleteAll());
        }).then(data => {
            return new JsonModel(data);
        });
    }

    postAction(params, data) {
        this.secure = false; //Allow keyless pulls

        if (data.collection) {
            return Promise.all(data.collection.forEach(element => {
                return this.postAction(params, element);
            })).then((data) => { 
                return new JsonModel(data);
            }).catch(err => {
                console.log("finished");
                return new JsonModel(data);
            });
        }

        console.log("==== POST ====");
        return new Promise((resolve, reject) => {
            if (data.password !== "blsi402MobileApp401") {
                throw new Error("bad password");
            }

            let id = uuid();
            resolve(this.database.key.create({
                key: id
            }));
        }).then(data => {
            return new JsonModel(data);
        });
    }
    deleteAction(params, data) {
        this.secure = true; //Make sure secure
        
        console.log("==== DELETE ====");
        return new Promise((resolve, reject) => {
            let id = parseInt(params.id);
            resolve(this.database.key.delete(id));
        }).then(data => {
            return new JsonModel(data);
        });
    }

}

module.exports = KeyController;