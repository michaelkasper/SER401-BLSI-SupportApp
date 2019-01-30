import AbstractStore from "./AbstractStore";
import RecommendationModel from "./model/RecommendationModel";

export default class RecommendationStore extends AbstractStore {

    constructor(transporter) {
        super(RecommendationModel, transporter);
    }
}