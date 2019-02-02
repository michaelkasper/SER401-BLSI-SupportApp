import StateModel from "./model/StateModel";
import AbstractStore from "./AbstractStore";

export default class StateStore extends AbstractStore {

    constructor(transporter, rootStore) {
        super("/state/{{id}}", StateModel, transporter, rootStore);
    }
}