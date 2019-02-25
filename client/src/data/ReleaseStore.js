import AbstractStore from "./AbstractStore";
import AlgorithmModel from "./model/AlgorithmModel";

export default class ReleaseStore extends AbstractStore {
    constructor(transporter, rootStore) {
        super("/release/{{id}}", AlgorithmModel, transporter, rootStore);
    }
}