import {
    DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget, BaseWidget, DefaultLinkFactory, DefaultLinkWidget
} from "storm-react-diagrams";
import * as React from "react";
import * as _ from "lodash";

export class NodeModel extends DefaultNodeModel {
    onSelect;
    stateObj;
    inPortGood;
    inPortBad;
    outPort;
    defaultColor;

    constructor(stateObj, onSelect, name, color) {
        super(name, color);
        this.onSelect = onSelect;
        this.stateObj = stateObj;

        this.inPortGood   = this.addInPort(" ");
        this.inPortBad    = this.addInPort(" ");
        this.outPort      = this.addOutPort(" ");
        this.defaultColor = this.color;
    }

    serialize() {
        return _.merge(super.serialize(), {
            stateObj: this.stateObj
        });
    }

    setSelected(selected) {
        if (selected) {
            this.onSelect();
        }
        super.setSelected(selected);
    }

    setStateSelected(isSelected) {
        if (isSelected) {
            this.color    = "#FFFFCC";
            this.selected = true;
        } else {
            this.color    = this.defaultColor;
            this.selected = false;
        }
    }
}

export class NodeFactory extends DefaultNodeFactory {
    onNodeSelected;

    constructor(onNodeSelected) {
        super();
        this.onNodeSelected = onNodeSelected;
    }

    generateReactWidget(diagramEngine, node) {
        return <DefaultNodeWidget node={node} diagramEngine={diagramEngine}/>;
    }

    getNewInstance(config) {
        let stateObj = config.stateObj;
        delete config.stateObj;

        return new NodeModel(stateObj, () => this.onNodeSelected(stateObj), config);
    }
}
