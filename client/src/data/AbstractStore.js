import uuidv1 from "uuid/v1";
import {observable} from "mobx";
import Environment from "../common/Environment";
import Mustache from "mustache";

class AbstractStore {
    apiUrl                 = Environment.API;
    @observable collection = {};
    rootStore;
    transportLayer;
    primaryKey;
    model;
    endpoint;

    /**
     *
     * @param endpoint
     * @param model
     * @param transportLayer
     * @param rootStore
     */
    constructor(endpoint, model, transportLayer, rootStore) {
        this.endpoint       = endpoint;
        this.rootStore      = rootStore;
        this.model          = model;
        this.primaryKey     = model.primaryKey;
        this.collectionKey  = model.collectionKey;
        this.transportLayer = transportLayer;

        if (!this.primaryKey) {
            throw new Error('You must set the value of the `primaryKey`, e.g. primaryKey = "id"');
        }
    }

    new = (json = {}) => {
        json[this.primaryKey] = uuidv1();
        return this.register(json);
    };

    get(id) {
        return this.collection[id];
    }

    getAll() {
        return Object.values(this.collection);
    }

    fetchAll() {
        return this.fetch()
    }

    fetch(data = {}, query = {}) {
        let url = this.compileEndpointUrl(data);
        return this.transportLayer
            .get(url, query)
            .then(this.processResult.bind(this));
    }

    post(data, options) {
        let url = this.compileEndpointUrl(data);
        return this.transportLayer
            .post(url, data, options)
            .then(this.processResult.bind(this));
    }

    patch(changeSet, object, options) {
        let url = this.compileEndpointUrl(object);
        return this.transportLayer
            .patch(url, changeSet, options)
            .then(this.processResult.bind(this));
    }

    save(json) {
        let id = json[this.primaryKey];
        if (!id) {
            return this.post(json);
        }

        return this.patch(json, json);
    }

    delete(model) {
        let url = this.compileEndpointUrl(model);

        this.transportLayer
            .delete(url)
            .then(data => {
                this.unregister(model.id);
            });
    }

    processResult(res) {
        if (res) {
            if ('collection' in res) {

                return new Response(
                    res.collection.map(json => {
                        return this.register(json);
                    }, this),
                    res
                );
            }
            return new Response(this.register(res));
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

    compileEndpointUrl(data) {
        if (!data) {
            data = {};
        }
        // build url and strip out unused Mustache tags
        return Mustache
            .render(this.apiUrl + this.endpoint, data)
            .replace(/\{\{(?:(?!}})[\S\s])*?\}\}/gm, '')
            .replace(/\/\//gm, '\/')
            .replace(/(\/|\/(\?.*))$/gm, '$2');
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