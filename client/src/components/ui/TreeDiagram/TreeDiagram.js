import {DiagramEngine, DiagramModel} from "storm-react-diagrams";
import {distributeElements} from "../../../common/dagre-utils";
import {LinkFactory, LinkModel} from "./Line";
import {NodeFactory, NodeModel} from "./Node";


class TreeDiagram {
    onStateChange;
    algorithm;
    selectedState;
    engine;
    model;
    nodes = {};

    constructor(algorithm, selectedState, onStateChange) {
        this.onStateChange = onStateChange;
        this.algorithm     = algorithm;
        this.selectedState = selectedState;
        this.engine        = algorithm;

        this.engine = new DiagramEngine();
        this.engine.installDefaultFactories();
        this.engine.registerNodeFactory(new NodeFactory(this.onStateChange));
        this.engine.registerLinkFactory(new LinkFactory());


        this.model = new DiagramModel();
        this.model.setOffset(50, 50);

        this.algorithm.states.forEach(state => {
            this.addNode(state);
        });

        let model = this.getDistributedModel();
        this.engine.setDiagramModel(model);


        Object.values(model.getNodes()).forEach(node => {
            // node.setLocked(true);
            Object.values(node.getPorts()).forEach(port => {
                port.setLocked(true);
            });
        });

    }


    build() {

        if (this.selectedState) {
            Object.values(this.engine.getDiagramModel().getNodes()).forEach(node => {
                node.setStateSelected(node.stateObj.id === this.selectedState.id);
            });
        }


        // Object.values(model.getLinks()).forEach(link => {
        //     link.setLocked(true);
        // });

        // model.setLocked(true);
        return this.engine;
    }

    setSelectedState(selectedState) {
        this.selectedState = selectedState;
    }


    addNode(state, type = null, parent = null, parents = []) {
        parents  = parents.slice(0);
        let node = this.getNode(state);
        if (parent) {
            let link = new LinkModel();
            link.setSourcePort(parent.outPort);
            link.curvyness = 40;

            switch (type) {
                case "good":
                    link.color = "#15B61C";
                    link.setTargetPort(node.inPortGood);

                    break;
                case "bad":
                    link.color = "#B61515";
                    link.setTargetPort(node.inPortBad);

                    break;
                default:
                    link.color = "#000000";
            }

            this.model.addLink(link);
        }

        parents.push(state.id);
        if (state.nextGoodState && !parents.includes(state.nextGoodState.id)) {
            this.addNode(state.nextGoodState, 'good', node, parents);
        }

        if (state.nextBadState && !parents.includes(state.nextBadState.id)) {
            this.addNode(state.nextBadState, 'bad', node, parents);
        }
    }


    getNode(state) {
        if (state.id in this.nodes) {
            this.nodes[state.id].new = false;
            return this.nodes[state.id];
        }

        return this.createNode(state)
    }

    createNode(state) {
        this.nodes[state.id] = new NodeModel(state, () => this.onStateChange(state.id), state.id);
        this.model.addNode(this.nodes[state.id]);
        return this.nodes[state.id];
    }


    getDistributedModel() {
        const serialized                   = this.model.serializeDiagram();
        const distributedSerializedDiagram = distributeElements(serialized);

        //deserialize the model
        let deSerializedModel = new DiagramModel();
        deSerializedModel.deSerializeDiagram(distributedSerializedDiagram, this.engine);
        return deSerializedModel;
    }
}


export default TreeDiagram;