import AbstractModel from "./AbstractModel";
import {observable} from "mobx";
import BluebirdPromise from "../../common/BluebirdPromise";

export default class AlgorithmModel extends AbstractModel {
    @observable id                = null;
    @observable name              = null;
    @observable short_description = null;
    @observable description       = null;

    get questions() {
        return this.rootStore.questionStore.getAll().filter(item => item.algorithm_id === this.id);
    }

    get recommendations() {
        return this.rootStore.recommendationStore.getAll().filter(item => item.algorithm_id === this.id);
    }

    get states() {
        return this.rootStore.stateStore.getAll().filter(item => item.algorithm_id === this.id);
    }

    get stateDiagramId() {
        return this.states
            .sort(function (a, b) {
                return a.id - b.id
            })
            .map(state => state.diagramId)
            .join('-') + "-" + this.state_id_start;
    }

    load = () => {
        return BluebirdPromise.all([
            this.rootStore.questionStore.fetch({}, {algorithm_id: this.id}),
            this.rootStore.recommendationStore.fetch({}, {algorithm_id: this.id}),
            this.rootStore.stateStore.fetch({}, {algorithm_id: this.id})
        ]);
    }
}