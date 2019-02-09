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

        this.algorithm = new AlgorithmTransporter(this, this.sequelize);
        this.question = new QuestionTransporter(this, this.sequelize);
        this.recommendation = new RecommendationTransporter(this, this.sequelize);
        this.question_option = new QuestionOptionTransporter(this, this.sequelize);
        this.state = new StateTransporter(this, this.sequelize);
        this.key = new KeyTransporter(this, this.sequelize);

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
        return this.question_option.table;
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
            //as: "states",
            foreignKey: "algorithm_id",
            targetKey: "id",
            foreignKeyConstraint: false
        });
        this.stateTable.belongsTo(this.algorithmTable, {
            foreignKey: "algorithm_id",
            targetKey: "id",
            foreignKeyConstraint: false
        });
        
        //algo & question assoc
        this.algorithmTable.hasMany(this.questionTable, {
            //as: "questions",
            foreignKey: "algorithm_id",
            sourceKey: "id",
            foreignKeyConstraint: false
        });
        this.questionTable.belongsTo(this.algorithmTable, {
            foreignKey: "algorithm_id",
            targetKey: "id",
            foreignKeyConstraint: false
        });

        //algo & recommendation assoc
        this.algorithmTable.hasMany(this.recommendationTable, {
            //as: "recommendations",
            foreignKey: "algorithm_id",
            sourceKey: "id",
            foreignKeyConstraint: false
        });
        this.recommendationTable.belongsTo(this.algorithmTable, {
            foreignKey: "algorithm_id",
            targetKey: "id",
            foreignKeyConstraint: false
        });
        
        //Question & question_option association
        this.questionTable.hasMany(this.questionOptionTable, {
            //as: "question_options",
            foreignKey: "question_id",
            sourceKey: "id",
            foreignKeyConstraint: false
        });
        this.questionOptionTable.belongsTo(this.questionTable, {
            foreignKey: "question_id",
            targetKey: "id",
            foreignKeyConstraint: false
        });

        this.sequelize.sync();
    }
}

module.exports = DatabaseTransporter;