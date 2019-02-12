import AbstractModel from "./AbstractModel";
import {observable} from "mobx";

export default class StateModel extends AbstractModel {
    @observable id                 = null;
    @observable algorithm_id       = null;
    @observable state_id_next_good = null;
    @observable state_id_next_bad  = null;
}