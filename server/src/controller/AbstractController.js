'use strict';

/**
 * Created by Michael Kasper - mkasper
 * Modified by Taylor Greeff - tgreeff
 */
const ApiErrorModel = require('./../model/ApiErrorModel');
const JsonModel = require('./../model/JsonModel');

class AbstractController {

    constructor(request, response, serviceManager) {
        this.request        = request;
        this.response       = response;
        this.serviceManager = serviceManager;
        this.response.set('Cache-Control', 'no-cache, private, no-store, must-revalidate');

        this.secure = true;
    }

    get database() {
        return this.serviceManager.database;
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

    dispatch() {
        try {
            if (this.secure && !this.clientKey) {
                this.response.response = new ApiErrorModel(400, 'missing client key');
                return;
            }

            console.log(this.params);
            console.log(this.body);
            let response = () => {};
            switch (this.requestMethod) {
                case "GET_ALL":
                    response = () => this.getAllAction(this.params, this.body);
                    break;
                case "GET":
                    response = () => this.getAction(this.params, this.body);
                    break;
                case "POST":
                    response = () => this.postAction(this.params, this.body);
                    break;
                case "HEAD":
                    response = () => this.headAction(this.params, this.body);
                    break;
                case "PUT":
                    response = () => this.putAction(this.params, this.body);
                    break;
                case "DELETE_ALL":
                    response = () => this.deleteAllAction(this.params, this.body);
                    break;
                case "DELETE":
                    response = () => this.deleteAction(this.params, this.body);
                    break;
                case "TRACE":
                    response = () => this.traceAction(this.params, this.body);
                    break;
                case "PATCH":
                    response = () => this.patchAction(this.params, this.body);
                    break;
                default:
                    response = () => new ApiErrorModel(405, 'method not allowed');
                    break;
            }
            
            /*
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
            } else {*/
                this.response.response = Promise.resolve(response()).catch(err => {
                    console.log(err);
                    return new ApiErrorModel(400, 'Invalid key');
                });
            //}

        } catch (e) {
            console.log(e.toString());
            return new ApiErrorModel(500, 'Invalid input');
        }
    }

    getAllAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    getAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    putAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    postAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    headAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }
     
    deleteAllAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    deleteAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    traceAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    patchAction(params, data) {
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