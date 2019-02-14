import {action, toJS} from "mobx";

export default class AbstractModel {
    store;

    constructor(store) {
        this.store = store;
    }

    get rootStore() {
        return this.store.rootStore;
    }

    static get primaryKey() {
        return "id";
    }

    static get collectionKey() {
        return "collection";
    }


    /**
     * Update this project with information from the server
     */
    @action.bound fromJson(json) {
        for (let field in json) {
            if (field in this) {
                this[field] = json[field];
            }
        }

        return this;
    }

    toJson() {
        let obj  = toJS(this);
        let data = {};
        for (let field in obj) {
            if (!['store'].includes(field)) {
                data[field] = obj[field];
            }
        }
        return data;
    }


    save() {
        return this.store.save(this.toJson());
    }

}