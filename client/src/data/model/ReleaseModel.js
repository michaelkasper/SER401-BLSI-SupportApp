import AbstractModel from "./AbstractModel";
import {observable} from "mobx";

export default class ReleaseModel extends AbstractModel {
    @observable id             = null;
    @observable name           = null;
    @observable algorithm_id   = null;
    @observable version_number = null;
    @observable algorithm_json = null;
    @observable attribute_json = null;
    @observable date_created   = null;
}