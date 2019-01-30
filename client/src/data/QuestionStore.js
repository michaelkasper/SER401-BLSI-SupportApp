import AbstractStore from "./AbstractStore";
import QuestionModel from "./model/QuestionModel";

export default class QuestionStore extends AbstractStore{

    constructor(transporter) {
        super(QuestionModel, transporter);
    }
}