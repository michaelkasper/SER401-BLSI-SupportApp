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
        return this.request.method + (!("id" in this.request.params && this.request.params.id) ? "_ALL" : "");
    }

    get algorithmManager() {
        return this.serviceManager.algorithmAPI;
    }

    get clientKey() {
        return this.request.query.key;
    }

    dispatch(secure = true) {
        if (secure && !this.clientKey) {
            this.response.response = new ApiErrorModel(400, 'missing client key');
            return;
        }

        let key = this.request.query.key;
        if (!key || key === "") {
            return new ApiErrorModel(405, `method not allowed`);
        }

        switch (this.requestMethod) {
            case "GET_ALL" :
                this.response.response = this.getAllAction();
                break;
            case "GET" :
                this.response.response = this.getAction(this.request.params.id);
                break;
            case "POST" :
                this.response.response = this.postAction();
                break;
            case "HEAD" :
                this.response.response = this.headAction();
                break;
            case "PUT" :
                this.response.response = this.putAction();
                break;
            case "DELETE" :
                this.response.response = this.deleteAction();
                break;
            case "CONNECT" :
                this.response.response = this.connectAction();
                break;
            case "TRACE" :
                this.response.response = this.traceAction();
                break;
            case "PATCH" :
                this.response.response = this.patchAction();
                break;
            default:
                this.response.response = new ApiErrorModel(405, 'method not allowed');
                break;
        }

        let old                = this.response.response;
        this.response.response = new Promise((resolve, reject) => {
            resolve(old);
        })
    }

    getAllAction() {
        return new ApiErrorModel(403, `method not allowed`);
    }

    getAction() {
        return new ApiErrorModel(405, `method not allowed`);
    }

    postAction() {
        return new ApiErrorModel(405, `method not allowed`);
    }

    headAction() {
        return new ApiErrorModel(405, `method not allowed`);
    }

    putAction() {
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