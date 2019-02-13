'use strict';

/**
 * Created by Michael Kasper - mkasper
 * Modified for use by Taylor Greeff - tgreeff
 */

const express    = require('express');
const fs         = require('fs');
const ejs        = require('ejs');
const bodyParser = require('body-parser');

//Controllers
const KeyController = require('./controller/KeyController');
const AlgorithmController      = require('./controller/AlgorithmController');
const QuestionController       = require('./controller/QuestionController');
const RecommendationController = require('./controller/RecommendationController');
const QuestionOptionController = require('./controller/QuestionOptionController');
const StateController = require('./controller/StateController');

//Model
const ApiErrorModel = require('./model/ApiErrorModel');

//Transporter
const Database = require("./transporter/DatabaseTransporter");

const dispatcher = (controller, req, res, next) => {
    (new controller(req, res, serviceManager)).dispatch();
    next();
};

const routes = {
    "key"           : KeyController,
    "algorithm"     : AlgorithmController,
    "question"      : QuestionController,
    "recommendation": RecommendationController,
    "question_option": QuestionOptionController,
    "state"         : StateController
};

const serviceManager = {
    database : new Database(),
    routes : routes
};

const app  = express();
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

Object.keys(routes).forEach(route => {
    if(route.includes("question")){
        app.all(`/${route}(/:id)?(/:questionId)?(/:questionOptionId)?`,
            (req, res, next) => dispatcher(routes[route], req, res, next));
    } else if(route === "recommendation") {
        app.all(`/${route}(/:id)?(/:recommendationId)?`,
            (req, res, next) => dispatcher(routes[route], req, res, next));
    } else if(route === "state") {
        app.all(`/${route}(/:id)?(/:stateId)?`,
            (req, res, next) => dispatcher(routes[route], req, res, next));
    } 
    else if (route === "key") {
        app.all(`/${route}`,
            (req, res, next) => dispatcher(routes[route], req, res, next));
    } else {
        app.all(`/${route}(/:id)?`,
            (req, res, next) => dispatcher(routes[route], req, res, next));
    }
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
        if (res.response instanceof Promise) {
            res.response.then(r => r.render(res))
            .catch(e => {
                console.log(e.toString());
            });
            
        } else {
            res.response.render(res);
        }
    }
});

app.listen(port, () => console.log(`Server listening on port ` + port));
