import Transport from "./Transport";
import AlgorithmStore from "../data/AlgorithmStore";
import QuestionStore from "../data/QuestionStore";
import RecommendationStore from "../data/RecommendationStore";
import StateStore from "../data/StateStore";
import ReleaseStore from "../data/ReleaseStore";

export default class RootStore {
    transporter;
    algorithmStore;
    questionStore;
    recommendationStore;
    stateStore;
    releaseStore;

    constructor() {
        this.transporter         = new Transport();
        this.algorithmStore      = new AlgorithmStore(this.transporter, this);
        this.questionStore       = new QuestionStore(this.transporter, this);
        this.recommendationStore = new RecommendationStore(this.transporter, this);
        this.stateStore          = new StateStore(this.transporter, this);
        this.releaseStore        = new ReleaseStore(this.transporter, this);
    }
}