'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const AlgorithmTransporter = require("./AlgorithmTransporter");
const QuestionTransporter = require("./QuestionTransporter");
const RecommendationTransporter = require("./RecommendationTransporter");
const QuestionOptionTransporter = require("./QuestionOptionTransporter");
const StateTransporter = require("./StateTransporter");
const KeyTransporter = require("./KeyTransporter");

const Sequelize = require("sequelize");

class DatabaseTransporter {
    constructor() {
        this.sequelize = new Sequelize("blsi", "user", "password", {

            host: "localhost",
            port: 3366,
            dialect: "mysql",
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            operatorsAliases: false
        });

        this.algorithm = new AlgorithmTransporter(this.sequelize);
        this.question = new QuestionTransporter(this.sequelize);
        this.recommendation = new RecommendationTransporter(this.sequelize);
        this.questionOption = new QuestionOptionTransporter(this.sequelize);
        this.state = new StateTransporter(this.sequelize);
        this.key = new KeyTransporter(this.sequelize);

        this.addAssociations();
    }

    get algorithmTable() {
        return this.algorithm.table;
    }

    get questionTable() {
        return this.question.table;
    }

    get recommendationTable() {
        return this.recommendation.table;
    }

    get questionOptionTable() {
        return this.questionOption.table;
    }

    get stateTable() {
        return this.state.table;
    }

    get keyTable() {
        return this.key.table;
    }

    addAssociations() {
        //Algorithm & object association
        this.algorithmTable.hasMany(this.stateTable);
        this.algorithmTable.hasMany(this.recommendationTable);
        this.algorithmTable.hasMany(this.questionTable);
        this.stateTable.belongsTo(this.algorithmTable);
        this.recommendationTable.belongsTo(this.algorithmTable);
        this.questionTable.belongsTo(this.algorithmTable);

        this.algorithmTable.hasOne(this.stateTable, {
            foreignKey: "state_id_start"
        });

        //Question & question_option association
        this.questionTable.hasMany(this.questionOptionTable);
        this.questionOptionTable.belongsTo(this.questionTable);

        this.sequelize.sync();
    }
}

module.exports = DatabaseTransporter;