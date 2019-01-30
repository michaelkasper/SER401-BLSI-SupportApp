import uuidv1 from "uuid/v1";
import {observable} from "mobx";
import BluebirdPromise from "../common/BluebirdPromise";

class AbstractStore {
    rootStore;
    transportLayer;
    @observable collection = {};
    primaryKey;
    model;

    /**
     *
     * @param model
     * @param transportLayer
     */
    constructor(model, transportLayer, rootStore) {
        this.rootStore      = rootStore;
        this.model          = model;
        this.primaryKey     = model.primaryKey;
        this.collectionKey  = model.collectionKey;
        this.transportLayer = transportLayer;

        if (!this.primaryKey) {
            throw new Error('You must set the value of the `primaryKey`, e.g. primaryKey = "Id"');
        }
    }

    new = (json) => {
        json.id = uuidv1();
        return this.register(json);
    };

    get(id) {
        return this.collection[id];
    }

    fetch(query) {
        return new BluebirdPromise((resolve, reject) => {
            setTimeout(() => {
                resolve([])
            }, 1);
        });
    }

    getAll() {
        return Object.values(this.collection);
    }

    fetchAll() {
        return new BluebirdPromise((resolve, reject) => {
            setTimeout(() => {
                resolve([])
            }, 1);
        });
    }

    // fetch(data, query) {
    //     let url = this.transportLayer.compileUrl(this.endpoints.resource, data);
    //
    //     return this.transportLayer
    //         .get(url, query)
    //         .then(this.processResult.bind(this));
    // }
    //
    // post(data, options) {
    //     let url = this.transportLayer.compileUrl(this.endpoints.resource, data);
    //
    //     return this.transportLayer
    //         .post(url, data, options)
    //         .then(this.processResult.bind(this));
    // }
    //
    //
    // patch(changeSet, object, options) {
    //     let url = this.transportLayer.compileUrl(this.endpoints.resource, object);
    //     // console.log('patching: ', this.transportLayer.baseUrl + url);
    //
    //     // let data = changeSet;
    //     // if (object instanceof AbstractModel) {
    //     //     data = {...object.toJson(true), ...changeSet};
    //     // }
    //
    //     return this.transportLayer
    //         .patch(url, changeSet, options)
    //         .then(this.processResult.bind(this));
    // }
    //
    // patchList(data) {
    //     let url = this.transportLayer.compileUrl(this.endpoints.resource);
    //     // console.log('patching list: ', url);
    //
    //     return this.transportLayer
    //         .patch(url, data)
    //         .then(this.processResult.bind(this));
    // }
    //
    //
    // delete(model) {
    //     let url = this.transportLayer.compileUrl(this.endpoints.resource, model);
    //
    //     this.transportLayer
    //         .delete(url)
    //         .then(data => {
    //             this.remove(model);
    //         });
    // }

    processResult(res) {
        if (res && res.data) {
            let data = res.data;
            if ('_embedded' in data && this.collectionKey in data._embedded) {
                return new Response(
                    data._embedded[this.collectionKey].map(json => {
                        return this.register(json);
                    }, this),
                    data
                );
            }
            return new Response(this.register(data));
        }
        return new Response(res);
    }

    register(json) {
        let id    = json[this.primaryKey];
        let model = !(id in this.collection) ? this.newModel() : this.collection[id];

        model.fromJson(json);
        this.collection[id] = model;

        return this.collection[id];
    }

    newModel() {
        return new this.model(this);
    }

    unregister(id) {
        if (id in this.collection) {
            delete this.collection[id];
            return true;
        }
        return false;
    }
}

class Response {
    page       = 1;
    pageCount  = 1;
    pageSize   = 1;
    totalItems = 1;
    links      = null;
    result     = null;


    constructor(result, json = {}) {

        if ('page' in json) this.page = json.page;
        if ('page_count' in json) this.pageCount = json.page_count;
        if ('page_size' in json) this.pageSize = json.page_size;
        if ('total_items' in json) this.totalItems = json.total_items;
        if ('_links' in json) this.links = json._links;

        this.result = result
    }
}


export default AbstractStore;