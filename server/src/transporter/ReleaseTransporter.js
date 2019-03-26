'use strict';

/**
 * Written by Taylor Greeff (tgreeff)
 */
const Abstract  = require("./AbstractTransporter");
const Sequelize = require("sequelize");

class ReleaseTransporter extends Abstract {
    constructor(database, sequelize) {
        let fields = {
            id            : {
                type         : Sequelize.INTEGER.UNSIGNED,
                primaryKey   : true,
                autoIncrement: true,
                unique       : true
            },
            name          : {
                type: Sequelize.TEXT
            },
            algorithm_id  : {
                type     : Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            version_number: {
                type      : Sequelize.FLOAT(8, 2),
                primaryKey: true,
            },
            algorithm_json: { //stores algorithm
                type: Sequelize.TEXT
            },
            attribute_json: { //Stores question, reccomendation, and states
                type: Sequelize.BLOB
            },
            is_active     : {
                type: Sequelize.BOOLEAN,
            },
            date_created  : {
                type: Sequelize.DATE
            }
        };

        super(database, sequelize, "release", fields);
    }

    async get(id, config = {}) {
        return this.table.findAll({
            where: {
                algorithm_id: id
            },
            ...config
        }).then(res => {
            let latest = res[0];
            res.forEach(element => {
                if(element.version_number > latest.version_number) {
                    latest = element;
                }
            });
            return latest
        });
    }

    async getAll() {
        return super.query({
            where: {
                is_active: 1
            }
        })
            .then((results) => {
                if (results) {
                    return results.map(({dataValues: result}) => {
                        delete result.attribute_json;
                        return this.formatObject(result);
                    })
                }

                return null
            });
    }


    async get(id) {
        return super.get(id)
            .then((result) => {
                return this.formatObject(result);
            });
    }


    formatObject(object) {

        if ('attribute_json' in object) {
            object.attribute_json = JSON.parse(this.jsonEscape(object.attribute_json));
        }

        if ('algorithm_json' in object) {
            object.algorithm_json = JSON.parse(this.jsonEscape(object.algorithm_json));
        }
        return object;
    }


    jsonEscape(str) {
        return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
    }
}


module.exports = ReleaseTransporter;