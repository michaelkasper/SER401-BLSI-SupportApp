import AbstractModel from "./AbstractModel";
import {observable} from "mobx";

export default class StateModel extends AbstractModel {
    @observable id                 = null;
    @observable algorithm_id       = null;
    @observable state_id_next_good = null;
    @observable state_id_next_bad  = null;
    @observable questions_id       = [];
    @observable recommendations_id = [];


    get nextGoodState() {
        return this.rootStore.stateStore.get(this.state_id_next_good);
    }

    get nextBadState() {
        return this.rootStore.stateStore.get(this.state_id_next_bad);
    }

    get questions() {
        return this.questions_id.map(id => this.rootStore.questionStore.get(id));
    }

    get recommendations() {
        return this.recommendations_id.map(id => this.rootStore.recommendationStore.get(id));
    }

    hasQuestion(question) {
        return this.questions_id.includes(question.id);
    }

    hasRecommendation(recommendation) {
        return this.recommendations_id.includes(recommendation.id);
    }

    addQuestion(question) {
        if (!this.hasQuestion(question)) {
            this.questions_id.push(question.id);
        }
        return this;
    }

    addRecommendation(recommendation) {
        if (!this.hasRecommendation(recommendation)) {
            this.recommendations_id.push(recommendation.id);
        }
        return this;
    }

    removeQuestion(question) {
        if (this.hasQuestion(question)) {
            this.questions_id.splice(this.questions_id.indexOf(question.id), 1);
        }
        return this;
    }

    removeRecommendation(recommendation) {
        if (this.hasRecommendation(recommendation)) {
            this.recommendations_id.splice(this.recommendations_id.indexOf(recommendation.id), 1);
        }
        return this;
    }

    linkNextGoodState(state) {
        this.state_id_next_good = state ? state.id : null;
        return this;
    }

    linkNextBadState(state) {
        this.state_id_next_bad = state ? state.id : null;
        return this;
    }
}