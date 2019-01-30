import AbstractModel from "./AbstractModel";
import {observable} from "mobx";

export default class AlgorithmModel extends AbstractModel {
    @observable id   = null;
    @observable name = null;
}