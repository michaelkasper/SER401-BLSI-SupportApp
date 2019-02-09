'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel      = require('./../model/ApiErrorModel');
var JsonModel          = require('./../model/JsonModel');

const AlgorithmTransporter = require("../transporter/AlgorithmTransporter");

class AlgorithmController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);

        this.transporter = new AlgorithmTransporter();
        this.dataType    = "algorithm"
    }

    dispatch() {
        return super.dispatch();
    }


    getAllAction() {
        this.database.algorithm.getAll()
            .then(collection => {
                return Prmoise.all(collection.map(item => {
                    retunr
                    this.database.questionOptions.findByQuesitonId(item.id)
                        .then(options => {
                            item.options = options;
                            retunr
                            item;
                        })
                }))

            }).then(
            resutls => {
                return new JsonModel({
                    collection: resutls
                });
            }
        )
    }

    postAction(params, data) {
        this.transporter.create(data)
            .then(collection => {
                return new JsonModel({
                    collection: collection
                });
            });
    }

    patchAction() {
        return super.patchAction();
    }
}

module.exports = AlgorithmController;