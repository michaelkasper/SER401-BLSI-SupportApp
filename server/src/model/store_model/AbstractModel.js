'use strict';

/**
 * Based off same Abstract model used in the app.
 */
class AbstractModel {
    constructor() {
        this.id = null;
    }

    fromObj(json) {
        for (let field in json) {
            if (field in this 
                && this[field] !== this["id"]) {
                this[field] = json[field];
            }
        }
        return this;
    }

    toJson() {

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
            resultObj[field] = valConverter(this[field]); 
        });
        return resultObj;
    }
}



module.exports = AbstractModel;