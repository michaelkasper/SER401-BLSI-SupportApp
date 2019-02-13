import {
    DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget, BaseWidget, DefaultLinkFactory, DefaultLinkWidget
} from "storm-react-diagrams";
import * as React from "react";
import {PortWidget} from "storm-react-diagrams";
import * as _ from "lodash";


export class Node extends DefaultNodeModel {


    constructor(stateObj, name, color) {
        super(name, color);
        this.stateObj = stateObj;
    }
}

export class NodeFactory extends DefaultNodeFactory {

    generateReactWidget(diagramEngine, node) {
        return <NodeWidget node={node} diagramEngine={diagramEngine}/>;
    }

    getNewInstance(config) {
        return new Node(config);
    }
}


export class DefaultPortLabel extends BaseWidget {
    constructor(props) {
        super("srd-default-port", props);
    }

    getClassName() {
        return "";//super.getClassName() + (this.props.model.in ? this.bem("--in") : this.bem("--out"));
    }

    render() {
        let port  = <PortWidget node={this.props.model.getParent()} name={this.props.model.name}/>;
        let label = <div className="name"></div>;

        return (
            <div {...this.getProps()}>
                {this.props.model.in ? port : label}
                {this.props.model.in ? label : port}
            </div>
        );
    }
}


/**
 * @author Dylan Vorster
 */
export class NodeWidget extends DefaultNodeWidget {
    static defaultProps = {
        size: 50,
        node: null
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    generatePort(port) {
        return <DefaultPortLabel model={port} key={port.id}/>;
    }

    render() {
        return (
            <div
                className={"diamond-node"}
                style={{
                    position: "relative",
                    width   : this.props.size,
                    height  : this.props.size
                }}
            >
                <svg height={this.props.size} width={this.props.size}>
                    <circle cx={this.props.size / 2} cy={this.props.size / 2} r={this.props.size / 2} stroke="black"
                            fill="red"/>
                </svg>
                <div
                    style={{
                        position: "absolute",
                        zIndex  : 10,
                        left    : this.props.size / 2 - 8,
                        top     : -8
                    }}
                >
                    {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
                </div>
                <div
                    style={{
                        position: "absolute",
                        zIndex  : 10,
                        left    : this.props.size / 2 - 8,
                        top     : this.props.size / 2
                    }}
                >
                    {this.props.node.stateObj.id}
                </div>
                <div
                    style={{
                        position: "absolute",
                        zIndex  : 10,
                        left    : this.props.size / 2 - 8,
                        top     : this.props.size - 8
                    }}
                >
                    {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
                </div>
            </div>
        );
    }
}


export class LinkFactory extends DefaultLinkFactory {
    generateReactWidget(diagramEngine, link) {
        return <LinkWidget link={link} diagramEngine={diagramEngine} smooth={true} width={1}/>;
    }
}


export class LinkWidget extends DefaultLinkWidget {

}