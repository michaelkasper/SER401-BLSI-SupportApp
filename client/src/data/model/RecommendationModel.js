import AbstractModel from "./AbstractModel";
import {observable} from "mobx";

export default class RecommendationModel extends AbstractModel {
    @observable id           = null;
    @observable algorithm_id = null;
    @observable title        = null;
    @observable description  = null;
}