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

        switch (this.request.method) {
            case "GET" :
                this.response.response = this.getAction();
                return;
            case "POST" :
                this.response.response = this.postAction();
                return;
            case "HEAD" :
                this.response.response = this.headAction();
                return;
            case "PUT" :
                this.response.response = this.putAction();
                return;
            case "DELETE" :
                this.response.response = this.deleteAction();
                return;
            case "CONNECT" :
                this.response.response = this.connectAction();
                return;
            case "TRACE" :
                this.response.response = this.traceAction();
                return;
            case "PATCH" :
                this.response.response = this.patchAction();
                return;
            default:
                this.response.response = new ApiErrorModel(405, 'method not allowed');
                return;
        }
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