'use strict';

/**
 * Created by Michael Kasper - mkasper
 */
const ApiErrorModel = require('./../model/ApiErrorModel');

class AbstractController {

    constructor(request, response, serviceManager) {
        this.request        = request;
        this.response       = response;
        this.serviceManager = serviceManager;

        this.response.set('Cache-Control', 'no-cache, private, no-store, must-revalidate');
    }

    get requestMethod() {
        return this.request.method + ((this.request.method.includes("GET") && !this.request.params.id) ? "_ALL" : "");
    }

    get algorithmManager() {
        return this.serviceManager.algorithmAPI;
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

    get storage() {
        return this.serviceManager.storage;
    }

    dispatch(secure = true) {
        try {
            if (secure && !this.clientKey) {
                this.response.response = new ApiErrorModel(400, 'missing client key');
                return;
            }

            console.log(this.request.params);
            console.log(this.body);

            switch (this.requestMethod) {
                case "GET_ALL":
                    this.response.response = this.getAllAction(this.params);
                    break;
                case "GET":
                    this.response.response = this.getAction(this.params);
                    break;
                case "POST":
                    this.response.response = this.postAction(this.params, this.body);
                    break;
                case "HEAD":
                    this.response.response = this.headAction();
                    break;
                case "PUT":
                    this.response.response = this.putAction(this.params, this.body);
                    break;
                case "DELETE":
                    this.response.response = this.deleteAction(this.params);
                    break;
                case "CONNECT":
                    this.response.response = this.connectAction();
                    break;
                case "TRACE":
                    this.response.response = this.traceAction();
                    break;
                case "PATCH":
                    this.response.response = this.patchAction();
                    break;
                default:
                    this.response.response = new ApiErrorModel(405, 'method not allowed');
                    break;
            }
        } catch (e) {
            console.log(e.toString());
            this.response.response = new ApiErrorModel(500, 'Invalid input');
        }
            let old = this.response.response;
            console.log(this.response.response);
            this.response.response = new Promise((resolve, reject) => {
                resolve(old);
            })
        
        
    }

    getAllAction() {
        return new ApiErrorModel(403, `method not allowed`);
    }

    getAction(params) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    postAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    headAction() {
        return new ApiErrorModel(405, `method not allowed`);
    }

    putAction(params, data) {
        return new ApiErrorModel(405, `method not allowed`);
    }

    deleteAction() {
        return new ApiErrorModel(405, `method not allowed`);
    }

    connectAction() {
        return new ApiErrorModel(405, `method not allowed`);
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