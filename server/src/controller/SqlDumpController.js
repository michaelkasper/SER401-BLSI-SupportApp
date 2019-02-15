'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('../model/ApiErrorModel');
var JsonModel = require('../model/JsonModel');
var dump = require("mysqldump");
var database = require("../../env/database");

class AlgorithmController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);
        this.dataType = "dump";
    }

    dispatch() {
        //this.secure is modified in methods
        return super.dispatch();
    }

    postAction(params, data) {
        console.log("==== POST ====");

        return dump({
            connection: {
                host: database.host,
                port: database.port,
                user: database.username,
                password: database.password,
                database: database.database
            },
            dumpToFile: database.location
        }).then(() => {
            return new JsonModel({
                completed: true
            });
        }).catch((err) => {
            console.log(err);
            return new JsonModel({
                completed: false
            });
        });
    }
}

module.exports = AlgorithmController;