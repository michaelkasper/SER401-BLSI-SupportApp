'use strict';

/**
 * Created by Michael Kasper - mkasper
 * Modified for use by Taylor Greeff - tgreeff
 */

require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const path       = require("path");

const env = require('../common/Environment');

//Controllers
const KeyController            = require('./controller/KeyController');
const AlgorithmController      = require('./controller/AlgorithmController');
const QuestionController       = require('./controller/QuestionController');
const RecommendationController = require('./controller/RecommendationController');
const StateController          = require('./controller/StateController');
const ReleaseController        = require('./controller/ReleaseController');
const SqlDumpController        = require("./controller/SqlDumpController");

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
    "state"         : StateController,
    "release"       : ReleaseController,
    "dump"          : SqlDumpController
};

const serviceManager = {
    database: new Database(),
    routes  : routes
};

const app  = express();
const port = env.http_port || 3001;

app.use(cors({
    origin              : function (origin, callback) {
        callback(null, true)
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

Object.keys(routes).forEach(route => {
    if (route === "key") {
        app.all(`/${route}`,
            (req, res, next) => dispatcher(routes[route], req, res, next));
    } else {
        app.all(`/${route}(/:id)?`,
            (req, res, next) => dispatcher(routes[route], req, res, next));
    }
});


app.use('/test', express.static(__dirname + "/test/", {
    index: "test.html"
}));


app.use(function (req, res, next) {
    if ('response' in res) {
        res.response
            .then(r => {
                r.render(res)
            })
            .catch(e => {
                console.log(e.toString());
            });
    } else {
        next();
    }
});


app.use(express.static(path.join(__dirname, "../..", env.build_dir)));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../..", env.build_dir, "index.html"));
});


app.listen(port, () => console.log(`Server listening on port ` + port));

