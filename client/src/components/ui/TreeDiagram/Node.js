import {
    DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget
} from "storm-react-diagrams";
import * as React from "react";
import * as _ from "lodash";
import StarSelectedIcon from "@material-ui/icons/StarTwoTone";

export class NodeModel extends DefaultNodeModel {
    onSelect;
    stateObj;
    inPortGood;
    inPortBad;
    outPort;
    stateSelected;

    constructor(stateObj, onSelect, name, color) {
        super(name, color);
        this.onSelect = onSelect;
        this.stateObj = stateObj;

        this.inPortGood    = this.addInPort(" ");
        this.inPortBad     = this.addInPort(" ");
        this.outPort       = this.addOutPort(" ");
        this.stateSelected = false;
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
        this.stateSelected = isSelected;
    }
}

export class NodeFactory extends DefaultNodeFactory {
    onNodeSelected;

    constructor(onNodeSelected) {
        super();
        this.onNodeSelected = onNodeSelected;
    }

    generateReactWidget(diagramEngine, node) {
        return <NodeWidget node={node} diagramEngine={diagramEngine}/>;
    }

    getNewInstance(config) {
        let stateObj = config.stateObj;
        delete config.stateObj;

        return new NodeModel(stateObj, () => this.onNodeSelected(stateObj.id), config);
    }
}


export class NodeWidget extends DefaultNodeWidget {
    render() {
        let {node} = this.props;

        return (
            <div {...this.getProps()}
                 style={{position: 'relative', background: node.stateSelected ? '#FFFFCC' : node.color}}>

                {
                    node.stateObj.is_initial &&
                    <StarSelectedIcon style={{
                        color   : node.stateSelected ? node.color : "#FAFA00",
                        position: 'absolute',
                        top     : -1,
                        left    : 1
                    }}/>
                }

                <div className={this.bem("__title")} style={{color: node.stateSelected ? '#1E1E1E' : 'inherit'}}>
                    <div className={this.bem("__name")}>{node.name}</div>
                </div>
                <div className={this.bem("__ports")}>
                    <div className={this.bem("__in")}>
                        {_.map(node.getInPorts(), this.generatePort.bind(this))}
                    </div>
                    <div className={this.bem("__out")}>
                        {_.map(node.getOutPorts(), this.generatePort.bind(this))}
                    </div>
                </div>
            </div>
        );
    }
}

