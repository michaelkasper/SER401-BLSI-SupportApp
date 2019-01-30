import StateModel from "./model/StateModel";
import AbstractStore from "./AbstractStore";

export default class StateStore extends AbstractStore {

    constructor(transporter) {
        super(StateModel, transporter);
    }
}