'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */

const Abstract = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class AlgorithmTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            version_number: Sequelize.FLOAT(8, 2),
            state_id_start: Sequelize.INTEGER.UNSIGNED,
            description: Sequelize.STRING,
            shortDescription: Sequelize.STRING
        };

        super(database, sequelize, "algorithm", fields);
    }

    //Retrieving associations https://stackoverflow.com/questions/13002873/sequelize-fetching-associations-on-find-1-6
    async getWithAssociations(id) {
        return this.sequelize.transaction((transaction) => {
            return this.table.findOne({
                where: {
                    id: id
                },
                include: ["questions", "recommendations", "states"],
                transaction: transaction
            });
        }).then(value => {
            console.log(value);
            return value;
        }).catch(err => {
            console.log(err);
        });
    }

    async create(data) {
        return this.sequelize.transaction((transaction) => {
            return this.table.create(data, {
                transaction: transaction
            }).then((result) => {
                if (data.questions) {
                    Promise.all(data.questions.forEach((question, index) => {
                        return this.database.question.create(question);
                    }));
                }
                return result;
            }).then((result) => {
                if (data.recommendations) {
                    Promise.all(data.recommendations.forEach((recommendation, index) => {
                        return this.database.recommendations.create(recommendation);
                    }));
                }
                return result;
            }).then((result) => {
                if (data.states) {
                    Promise.all(data.states.forEach((state, index) => {
                        return this.database.states.create(state);
                    }));
                }
                return result;
            });
        }).then(value => {
            //transaction committed
            console.log(value);
            return value;
        }).catch(err => {
            //transaction rolledback
            console.log(err);
        });
    }

    async update(id, data) {
        return this.sequelize.transaction((transaction) => {
            data["version_number"] += 0.1;
            return this.table.findOrCreate({
                where: {
                        id: id
                    },
                defaults: data,
                transaction: transaction
            }).spread((result, created) => {
                if (!created) { //not created
                    Promise.resolve(this.table.update(data, {
                        where: {
                            id: id
                        }
                    }));
                }
                return result;
            }).then((result) => {
                if (data.questions) {
                    Promise.all(data.questions.forEach((question, index) => {
                        return this.database.question.update(question.id, question);
                    }));
                }
                return result;
            }).then((result) => {
                if (data.recommendations) {
                    Promise.all(data.recommendations.forEach((recommendation, index) => {
                        return this.database.recommendations.update(recommendation.id, recommendation);
                    }));
                }
                return result;
            }).then((result) => {
                if (data.states) {
                    Promise.all(data.states.forEach((state, index) => {
                        return this.database.states.update(state.id, state);
                    }));
                }
                return result;
            });

        }).then((result) => {
            console.log(result);
            return result;
        }).catch(err => {
            console.log(err);
        });
    }
}


module.exports = AlgorithmTransporter;