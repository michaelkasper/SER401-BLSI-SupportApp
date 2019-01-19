'use strict';

/**
 * Created by Michael Kasper - mkasper
 * Modified for use by Taylor Greeff - tgreeff
 */

const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');

//Controllers
const AlgorithmController = require('./controller/AlgorithmController');

//Models
const ApiErrorModel = require('./model/ApiErrorModel');
//const AlgorithmModel = require('./model/store_model/AlgorithmModel');
//const QuestionModel = require('./model/store_model/QuestionModel');
//const QuestionAnswerModel = require('./model/store_model/QuestionAnswerModel');
//const QuestionOptionModel = require('./model/store_model/QuestionOptionModel');
//const RecommendationModel = require('./model/store_model/RecommendationModel');
//const StateModel = require('./model/store_model/StateModel');
const Storage = require("./model/store_model/Storage");

const dispatcher = (controller, req, res, next) => {
    (new controller(req, res, serviceManager)).dispatch();
    next();
};

const routes = {
    "algorithm": AlgorithmController,
};

const serviceManager = {
    routes: routes,
    storage: new Storage()
};

const app = express();
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Object.keys(routes).forEach(route => {
    app.all(`/${route}`, (req, res, next) => dispatcher(routes[route], req, res, next));
});

app.use('/', function (req, res, next) {
    if (!('response' in res)) {
        fs.stat(__dirname + "/../../public" + req.originalUrl, function (err, stat) {
            if (err == null) {
                //Bad request check. GET accepted
                if (req.method.toUpperCase() !== 'GET') {
                    res.response = new ApiErrorModel(405, 'method not allowed');
                }
            } else {
                res.response = new ApiErrorModel(404, 'page not found');
            }
            next();
        });
    } else {
        next();
    }
});


app.use('/', express.static(__dirname + "/test/", {
    index: "test.html"
}));


app.use(function (req, res, next) {
    if ('response' in res) {
        res.response.render(res);
    }
});

app.listen(port, () => console.log(`Server listening on port ` + port));
