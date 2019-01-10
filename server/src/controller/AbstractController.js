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

    get calculator() {
        return this.serviceManager.calculator;
    }

    get clientKey() {
        return this.request.query.key;
    }

    dispatch(secure = true) {
        let response;

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