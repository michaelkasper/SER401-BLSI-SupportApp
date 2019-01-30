import AbstractStore from "./AbstractStore";
import AlgorithmModel from "./model/AlgorithmModel";

export default class AlgorithmStore extends AbstractStore {
    constructor(transporter) {
        super(AlgorithmModel, transporter);
    }
}