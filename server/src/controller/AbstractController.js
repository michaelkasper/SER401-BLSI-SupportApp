'use strict';

/**
 * Created by Michael Kasper - mkasper
 * Modified by Taylor Greeff - tgreeff
 */
const ApiErrorModel = require('./../model/ApiErrorModel');
const JsonModel = require('./../model/JsonModel');
const KeyTransporter = require('../transporter/KeyTransporter');

class AbstractController {

    constructor(request, response, serviceManager) {
        this.request        = request;
        this.response       = response;
        this.serviceManager = serviceManager;
        this.transporter = null;
        this.response.set('Cache-Control', 'no-cache, private, no-store, must-revalidate');
        this.dataType = "";
        this.keys = new KeyTransporter();
    }

    get requestMethod() {
        let modifier = "";
        if (this.request.method.includes("GET")) {
            modifier = !this.request.params.id ? "_ALL" : "";
        }
        else if(this.request.method.includes("DELETE")) {
            modifier = !this.request.params.id ? "_ALL" : "";
        }

        return this.request.method + modifier;
    }

    get params() {
        return this.request.params;
    }
    get body() {
        if (this.request.body.data) {
             return this.request.body.data;
        }
        return this.request.body;
    }

    get clientKey() {
        return this.request.query.key;
    }

    dispatch(secure = true) {
        try {
            if (secure && !this.clientKey) {
                this.response.response = new ApiErrorModel(400, 'missing client key');
                return;
            }

            console.log(this.params);
            console.log(this.body);
            let response = () => {};
            switch (this.requestMethod) {
                case "GET_ALL":
                    response = () => this.getAllAction();
                    break;
                case "GET":
                    response = () => this.getAction(this.params);
                    break;
                case "POST":
                    response = () => this.postAction(this.params, this.body);
                    break;
                case "HEAD":
                    response = () => this.headAction();
                    break;
                case "PUT":
                    response = () => this.putAction(this.body);
                    break;
                case "DELETE_ALL":
                    response = () => this.deleteAllAction();
                    break;
                case "DELETE":
                    response = () => this.deleteAction(this.params);
                    break;
                case "TRACE":
                    response = () => this.traceAction();
                    break;
                case "PATCH":
                    response = () => this.patchAction();
                    break;
                default:
                    response = () => new ApiErrorModel(405, 'method not allowed');
                    break;
            }
            
            if (this.dataType !== "key") {
                this.response.response = new Promise((resolve, reject) => {
                    resolve(this.keys.exists(this.clientKey));
                }).then(exists => {
                    console.log("EXISTS", exists);
                    if (exists === null || exists === "null") {
                        console.log("Throwing");
                        throw new Error("Invalid Key");
                    }
                }).then(() => {
                    console.log("Resolving");
                    return response();

                }).catch(err => {
                    console.log("Throwing2");
                    return new ApiErrorModel(400, 'Invalid key');
                });
            } else {
                this.response.response = new Promise((resolve, reject) => {
                    resolve(response());
                });
            }

        } catch (e) {
            console.log(e.toString());
            return new ApiErrorModel(500, 'Invalid input');
        }
    }

    getAllAction() {
        console.log("==== GET All ====");
        return new Promise((resolve, reject) => {
            resolve(this.transporter.getAll());
        }).then(collection => {
            return new JsonModel({
                collection: collection
            });
        });
    }

    getAction(params) {
        console.log("==== GET ====");
        return new Promise((resolve, reject) => {
            let id = parseInt(params.id);
            resolve(this.transporter.get(id));
        }).then(data => {
            return new JsonModel(data);
        });
    }

    putAction(data) {
        console.log("==== PUT ====");
        return new Promise((resolve, reject) => {
            resolve(this.transporter.create(data));
        }).then(data => {
            return new JsonModel(data);
        });
    }

    postAction(params, data) {
        console.log("==== POST ====");
        return new Promise((resolve, reject) => {
            if (data[this.dataType]) {
                data = data[this.dataType];
            }
            let id = parseInt(params.id); //Make sure id is an int
            resolve(this.transporter.update(id, data));
        }).then((data) => {
            return new JsonModel(data);
        });
    }

    headAction() {
        return new ApiErrorModel(405, `method not allowed`);
    }
     
    deleteAllAction() {
        console.log("==== DELETE ====");
        return new Promise((resolve, reject) => {
            resolve(this.transporter.deleteAll());
        }).then(data => {
            return new JsonModel(data);
        });
    }

    deleteAction(params) {
        console.log("==== DELETE ====");
        return new Promise((resolve, reject) => {
            let id = parseInt(params.id);
            resolve(this.transporter.delete(id));
        }).then(data => {
            return new JsonModel(data);
        });
    }

    traceAction() {
        return new ApiErrorModel(405, `method not allowed`);
    }

    patchAction() {
        return new ApiErrorModel(405, `method not allowed`);
    }

    param(key, defaultVal) {
        if (key in this.request.body) {
            return this.request.body[key];
        }
        return defaultVal;
    }

    get user() {
        return {
            ip       : this.request.headers['x-forwarded-for'] || this.request.connection.remoteAddress,
            userAgent: this.request.headers['user-agent']
        }
    }
}

module.exports = AbstractController;