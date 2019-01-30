import Transport from "./Transport";
import AlgorithmStore from "../data/AlgorithmStore";
import QuestionStore from "../data/QuestionStore";
import RecommendationStore from "../data/RecommendationStore";
import StateStore from "../data/StateStore";

export default class RootStore {
    transporter;
    algorithmStore;
    questionStore;
    recommendationStore;
    stateStore;

    constructor() {
        this.transporter         = new Transport();
        this.algorithmStore      = new AlgorithmStore(this.transporter);
        this.questionStore       = new QuestionStore(this.transporter);
        this.recommendationStore = new RecommendationStore(this.transporter);
        this.stateStore          = new StateStore(this.transporter);
    }
}