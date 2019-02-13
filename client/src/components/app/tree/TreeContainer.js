import {
    DiagramEngine,
    DiagramModel,
    DefaultNodeModel,
    DefaultPortFactory,
    LinkModel,
    DiagramWidget,
    DefaultLinkModel
} from "storm-react-diagrams";
import React, {Fragment} from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import {distributeElements} from "../../../common/dagre-utils";
import {Node, NodeFactory, LinkFactory} from "./Node";

require("storm-react-diagrams/dist/style.min.css");

function getDistributedModel(engine, model) {
    const serialized                   = model.serializeDiagram();
    const distributedSerializedDiagram = distributeElements(serialized);

    //deserialize the model
    let deSerializedModel = new DiagramModel();
    deSerializedModel.deSerializeDiagram(distributedSerializedDiagram, engine);
    return deSerializedModel;
}

class TreeContainer extends React.Component {

    nodes = {};
    state = {
        engine: null
    };

    componentDidMount() {
        let {algorithm} = this.props;

        //1) setup the diagram engine
        let engine = new DiagramEngine();
        engine.installDefaultFactories();
        engine.registerNodeFactory(new NodeFactory());
        engine.registerLinkFactory(new LinkFactory());


        let model      = new DiagramModel();
        let startState = algorithm.startState;


        let rootNodeWrapper = this.getNode(model, startState);
        this.addNode(model, rootNodeWrapper, startState);

        let model2 = getDistributedModel(engine, model);
        model2.setLocked(true);

        //5) load model into engine
        engine.setDiagramModel(model2);

        this.setState({engine: engine})
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    getNode(model, state) {
        if (state.id in this.nodes) {
            this.nodes[state.id].new = false;
            return this.nodes[state.id];
        }

        let node = new Node(state, "Node " + state.id);
        model.addNode(node);

        this.nodes[state.id] = {
            new : true,
            node: node,
            port: {
                in : node.addInPort("in"),
                out: node.addOutPort("out"),
            }
        };

        return this.nodes[state.id];
    }


    addNode(model, parentNodeWrapper, state) {
        if (state.goodState || state.badState) {
            [state.goodState, state.badState].forEach(nextState => {
                if (nextState) {

                    let nodeWrapper = this.getNode(model, nextState);

                    let link = new DefaultLinkModel();
                    link.setSourcePort(parentNodeWrapper.port.out);
                    link.setTargetPort(nodeWrapper.port.in);
                    link.addLabel("Hello World!");
                    link.color = "#000000";

                    model.addLink(link);
                    if (nodeWrapper.new) {
                        this.addNode(model, nodeWrapper, nextState);
                    }
                }
            });
        }
    }


    render() {
        let {classes} = this.props;
        let {engine}  = this.state;

        return (
            <div className={classes.root}>
                {
                    engine &&
                    <DiagramWidget
                        className="srd-demo-canvas"
                        diagramEngine={engine}
                        allowLooseLinks={false}
                        maxNumberPointsPerLink={0}
                    />
                }
            </div>
        );
    };
}


const styles = theme => ({
    root: {
        textAlign : 'right',
        padding   : 10,
        marginLeft: 400,
        height    : '600px',
        display   : 'flex',
        width     : 'calc(100% - 400px)'
    },
});

export default withStyles(styles)(TreeContainer);