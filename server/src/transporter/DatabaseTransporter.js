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

    //Reference to figure out FK and TK https://github.com/sequelize/sequelize/issues/9021
    addAssociations() {
        //Algorithm & state association
        this.algorithmTable.hasMany(this.stateTable, {
            as: "states",
            foreignKey: "id",
            targetKey: "id"
        });
        this.stateTable.belongsTo(this.algorithmTable, {
            foreignKey: "id",
            targetKey: "id"
        });
        
        //algo & question assoc
        this.algorithmTable.hasMany(this.questionTable, {
            as: "questions",
            foreignKey: "id",
            targetKey: "id"
        });
        this.questionTable.belongsTo(this.algorithmTable, {
            foreignKey: "id"
        });

        //algo & recommendation assoc
        this.algorithmTable.hasMany(this.recommendationTable, {
            as: "recommendations",
            foreignKey: "id",
            targetKey: "id"
        });
        this.recommendationTable.belongsTo(this.algorithmTable, {
            foreignKey: "id"
        });
        
        /* No need for association on start_id
        //algo & start_id assoc
        this.algorithmTable.hasOne(this.stateTable, {
            as: "start_state",
            foreignKey: "state_id_start",
            targetKey: "state_id_start"
        });*/

        //Question & question_option association
        this.questionTable.hasMany(this.questionOptionTable, {
            as: "options",
            foreignKey: "id",
            targetKey: "id"
        });
        this.questionOptionTable.belongsTo(this.questionTable, {
            foreignKey: "id",
        });

        this.sequelize.sync();
    }
}

module.exports = DatabaseTransporter;