'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const AlgorithmTransporter           = require("./AlgorithmTransporter");
const QuestionTransporter            = require("./QuestionTransporter");
const RecommendationTransporter      = require("./RecommendationTransporter");
const QuestionOptionTransporter      = require("./QuestionOptionTransporter");
const StateTransporter               = require("./StateTransporter");
const StateQuestionTransporter       = require("./StateQuestionTransporter");
const StateRecommendationTransporter = require("./StateRecommendationTransporter");
const KeyTransporter                 = require("./KeyTransporter");
const ReleaseTransporter             = require("./ReleaseTransporter")

const Sequelize = require("sequelize");
var database    = require("../../env/database");

class DatabaseTransporter {
    constructor() {
        this.sequelize = new Sequelize(database.database, database.username, database.password, {

            host            : database.host,
            port            : database.port,
            dialect         : database.dialect,
            pool            : {
                max    : 5,
                min    : 0,
                acquire: 30000,
                idle   : 10000
            },
            operatorsAliases: false
        });

        this.algorithm            = new AlgorithmTransporter(this, this.sequelize);
        this.question             = new QuestionTransporter(this, this.sequelize);
        this.recommendation       = new RecommendationTransporter(this, this.sequelize);
        this.question_option      = new QuestionOptionTransporter(this, this.sequelize);
        this.state                = new StateTransporter(this, this.sequelize);
        this.state_question       = new StateQuestionTransporter(this, this.sequelize);
        this.state_recommendation = new StateRecommendationTransporter(this, this.sequelize);
        this.key                  = new KeyTransporter(this, this.sequelize);
        this.release              = new ReleaseTransporter(this, this.sequelize);

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

    get stateQuestionTable() {
        return this.state_question.table;
    }

    get stateRecommendationTable() {
        return this.state_recommendation.table;
    }

    get keyTable() {
        return this.key.table;
    }

    get releaseTable() {
        return this.release.table;
    }

    startTransaction(callback) {
        return this.sequelize.transaction(callback);
    }

    syncAndSave() {
        //this.algorithmTable.save();
        //this.stateTable.save();
    }

    //Reference to figure out FK and TK https://github.com/sequelize/sequelize/issues/9021
    addAssociations() {
        //Algorithm & state association
        this.algorithmTable.hasMany(this.stateTable, {
            //as: "states",
            foreignKey          : "algorithm_id",
            targetKey           : "id",
            foreignKeyConstraint: false
        });
        this.stateTable.belongsTo(this.algorithmTable, {
            foreignKey          : "algorithm_id",
            targetKey           : "id",
            foreignKeyConstraint: false
        });

        //algo & question assoc
        this.algorithmTable.hasMany(this.questionTable, {
            //as: "questions",
            foreignKey          : "algorithm_id",
            sourceKey           : "id",
            foreignKeyConstraint: false
        });
        this.questionTable.belongsTo(this.algorithmTable, {
            foreignKey          : "algorithm_id",
            targetKey           : "id",
            foreignKeyConstraint: false
        });

        //algo & recommendation assoc
        this.algorithmTable.hasMany(this.recommendationTable, {
            //as: "recommendations",
            foreignKey          : "algorithm_id",
            sourceKey           : "id",
            foreignKeyConstraint: false
        });
        this.recommendationTable.belongsTo(this.algorithmTable, {
            foreignKey          : "algorithm_id",
            targetKey           : "id",
            foreignKeyConstraint: false
        });

        //Question & question_option association
        this.questionTable.hasMany(this.questionOptionTable, {
            //as: "question_options",
            foreignKey          : "question_id",
            sourceKey           : "id",
            foreignKeyConstraint: false
        });
        this.questionOptionTable.belongsTo(this.questionTable, {
            foreignKey          : "question_id",
            targetKey           : "id",
            foreignKeyConstraint: false
        });


        this.stateTable.hasMany(this.stateQuestionTable, {
            foreignKey: 'state_id'
        });
        this.stateQuestionTable.belongsTo(this.stateTable, {
            foreignKey: 'state_id'
        });

        this.stateTable.hasMany(this.stateRecommendationTable, {
            foreignKey: 'state_id'
        });
        this.stateRecommendationTable.belongsTo(this.stateTable, {
            foreignKey: 'state_id'
        });

        //Algorithm and release associations
        this.algorithmTable.hasMany(this.releaseTable, {
            foreignKey: "algorithm_id"
        });
        this.releaseTable.belongsTo(this.algorithmTable, {
            foreignKey: "algorithm_id"
        });

        /*
        //State & question association
        this.stateTable.hasMany(this.questionTable, {
            foreignKey: "question_ids",
            sourceKey: "id",
            foreignKeyConstraint: false,
        });
        this.questionTable.belongsTo(this.stateTable, {
            foreignKey: "question_ids",
            targetKey: "id",
            foreignKeyConstraint: false,
        });

        //state & recommendation association
        this.stateTable.hasMany(this.recommendationTable, {
            foreignKey: "recommendation_ids",
            sourceKey: "id",
            foreignKeyConstraint: false,
        });
        this.recommendationTable.belongsTo(this.stateTable, {
            foreignKey: "recommendation_ids",
            targetKey: "id",
            foreignKeyConstraint: false,
        });
        */


        this.sequelize.sync();
    }
}

module.exports = DatabaseTransporter;