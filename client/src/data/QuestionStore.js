import AbstractStore from "./AbstractStore";
import QuestionModel from "./model/QuestionModel";

export default class QuestionStore extends AbstractStore {

    constructor(transporter, rootStore) {
        super(QuestionModel, transporter, rootStore);
    }
}