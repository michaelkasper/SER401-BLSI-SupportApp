import AbstractStore from "./AbstractStore";
import AlgorithmModel from "./model/AlgorithmModel";

export default class AlgorithmStore extends AbstractStore {
    constructor(transporter, rootStore) {
        super("/algorithm/{{id}}", AlgorithmModel, transporter, rootStore);
    }
}