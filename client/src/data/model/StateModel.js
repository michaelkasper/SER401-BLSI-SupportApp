import AbstractModel from "./AbstractModel";
import {observable, computed, action} from "mobx";

export default class StateModel extends AbstractModel {
    @observable id                 = null;
    @observable algorithm_id       = null;
    @observable state_id_next_good = null;
    @observable state_id_next_bad  = null;
    @observable question_ids       = [];
    @observable recommendation_ids = [];


    @computed get nextGoodState() {
        return this.rootStore.stateStore.get(this.state_id_next_good);
    }

    @computed get nextBadState() {
        return this.rootStore.stateStore.get(this.state_id_next_bad);
    }

    @computed get questions() {
        return this.question_ids.map(id => this.rootStore.questionStore.get(id));
    }

    @computed get recommendations() {
        return this.recommendation_ids.map(id => this.rootStore.recommendationStore.get(id));
    }

    @computed get diagramId() {
        return `${this.id}.${this.state_id_next_good}.${this.state_id_next_bad}`;
    }

    hasQuestion(question) {
        return this.question_ids.includes(question.id);
    }

    hasRecommendation(recommendation) {
        return this.recommendation_ids.includes(recommendation.id);
    }

    @action.bound addQuestion(question) {
        if (!this.hasQuestion(question)) {
            this.question_ids.push(question.id);
        }
        return this;
    }

    @action.bound addRecommendation(recommendation) {
        if (!this.hasRecommendation(recommendation)) {
            this.recommendation_ids.push(recommendation.id);
        }
        return this;
    }

    @action.bound removeQuestion(question) {
        if (this.hasQuestion(question)) {
            this.question_ids.splice(this.question_ids.indexOf(question.id), 1);
        }
        return this;
    }

    @action.bound removeRecommendation(recommendation) {
        if (this.hasRecommendation(recommendation)) {
            this.recommendation_ids.splice(this.recommendation_ids.indexOf(recommendation.id), 1);
        }
        return this;
    }

    @action.bound linkNextGoodState(state) {
        this.state_id_next_good = state ? state.id : null;
        return this;
    }

    @action.bound linkNextBadState(state) {
        this.state_id_next_bad = state ? state.id : null;
        return this;
    }
}