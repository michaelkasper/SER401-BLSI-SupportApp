'use strict';

/**
 * Based off same Abstract model used in the app.
 */
class AbstractModel {
    constructor(storage) {
        this.storage = storage; //contains hosted storage and workspace storage methods
        this.id = null;
        this.state = null; 
        this.algorithmParent = null; //identifies the algorithm that it is a part of.
        this.dataType = null; //identifies whether a question, recommendation, or algo part.
    }

    existsInHosted() {
        if (this.dataType === null || 
            this.id === null || 
            this.state === null) {
                return;
            }

        //query datatype in database and check for id
    }

    saveToHosted() {
        if (this.existsInHost())
            return;
    }

    existsInWorkspace() {
        if (this.dataType === null ||
            this.id === null ||
            this.state === null) {
            return;
        }

        //query datatype in database and check for id
    }

    saveToWorkspace() {
        if (this.existsInHost())
            return;
    }

    fromObj(json) {
        for (let field in json) {
            if (field in this) {
                this[field] = json[field];
            }
        }
        return this;
    }

    toJson() {
        let ignore = ['store'];

        let arrayConverter = (array) => {
            return array.map(item => {
                return valConverter(item);
            })
        };

        let objectConverter = (obj) => {
            return 'toJS' in obj ? obj.toJS() : obj.constructor.name;
        };

        let valConverter = (val) => {
            switch (true) {
                case val instanceof AbstractModel:
                    return val.toJson();
                case val instanceof Array:
                    return arrayConverter(val);
                case val instanceof Object:
                    return objectConverter(val);
                default:
                    return val;
            }
        };

        let resultObj = {};
        Object.keys(this).forEach(field => {
            if (!(ignore.includes(field))) {
                resultObj[field] = valConverter(this[field]);
            }
        });
        return resultObj;
    }
}



module.exports = AbstractModel;