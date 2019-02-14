'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel      = require('./../model/ApiErrorModel');
var JsonModel          = require('./../model/JsonModel');

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
        console.log("==== GET All ====");
        if (data.password !== "blsi402MobileApp401") {
            throw new Error("bad password");
        }

        return this.database.key.getAll()
            .then(collection => {
                return new JsonModel({
                    collection: collection
                });
            });
    }

    getAction(id, params, data) {
        console.log("==== GET ====");
        if (data.password !== "blsi402MobileApp401") {
            throw new Error("bad password");
        }

        return this.database.key.get(id)
            .then(data => new JsonModel(data));
    }

    postAction(params, data) {
        console.log("==== POST ====");
        if (data.password !== "blsi402MobileApp401") {
            throw new Error("bad password");
        }

        let id = uuid();
        return this.database.startTransaction((transaction) => {
            return this.database.key.create({key: id}, transaction)
                .then(data => new JsonModel(data));
        });
    }

    deleteAction(id, params, data) {
        console.log("==== DELETE ====");

        return this.database.startTransaction((transaction) => {
            return this.database.key.delete(id, transaction)
                .then(data => new JsonModel(data));
        });

    }

}

module.exports = KeyController;