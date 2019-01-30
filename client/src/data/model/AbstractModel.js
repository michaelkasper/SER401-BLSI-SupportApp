export default class AbstractModel {
    store;

    constructor(store) {
        this.store = store;
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
    fromJson(json) {
        // any transformations?// map our new values
        for (let field in json) {
            if (field in this) {
                this[field] = json[field];
                // delete this.trackingFields[field];
            }
        }

        return this;
    }

}