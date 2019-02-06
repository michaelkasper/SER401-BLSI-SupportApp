'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

var AbstractController = require('./AbstractController');
var ApiErrorModel = require('./../model/ApiErrorModel');
var JsonModel = require('./../model/JsonModel');

const KeyTransporter = require("../transporter/KeyTransporter");
const uuid = require("uuid/v4");

class AlgorithmController extends AbstractController {
    constructor(request, response, serviceManager) {
        super(request, response, serviceManager);

        this.transporter = new KeyTransporter();
        this.dataType = "key"
    }

    dispatch() {
        return super.dispatch(false);
    }

     getAllAction() {
         return new ApiErrorModel(405, `method not allowed`);
     }

     getAction(params) {
         return new ApiErrorModel(405, `method not allowed`);
     }

     putAction(data) {
         console.log("==== Connect ====");
         return new Promise((resolve, reject) => {
             if (data.password !== "blsi402MobileApp401") {
                 throw new Error("bad password");
             }

             let id = uuid();
             resolve(this.transporter.create({
                 key: id
             }));
         }).then(data => {
             return new JsonModel(data);
         });
     }

     postAction(params, data) {
         return new ApiErrorModel(405, `method not allowed`);
     }

     headAction() {
         return new ApiErrorModel(405, `method not allowed`);
     }

     deleteAllAction() {
         return new ApiErrorModel(405, `method not allowed`);
     }

     deleteAction(params) {
         return new ApiErrorModel(405, `method not allowed`);
     }

     connectAction(data) {
         return new ApiErrorModel(405, `method not allowed`);
     }

     traceAction() {
         return new ApiErrorModel(405, `method not allowed`);
     }

     patchAction() {
         return new ApiErrorModel(405, `method not allowed`);
     }
}

module.exports = AlgorithmController;