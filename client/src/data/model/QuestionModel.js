import AbstractModel from "./AbstractModel";
import {observable, action} from "mobx";

export default class QuestionModel extends AbstractModel {
    @observable id               = null;
    @observable algorithm_id     = null;
    @observable text             = null;
    @observable type_key         = null;
    @observable prompt           = null;
    @observable question_options = [];
}


export class QuestionOptionModel {
    @observable id          = null;
    @observable question_id = null;
    @observable label       = "";
    @observable min_value   = 0;
    @observable max_value   = 1;
    @observable is_good     = true;


    /**
     * Update this project with information from the server
     */
    @action.bound fromJson(json) {
        // any transformations?// map our new values
        for (let field in json) {
            if (field in this) {
                this[field] = json[field];
                // delete this.trackingFields[field];
            }
        }

        return this;
    }
}