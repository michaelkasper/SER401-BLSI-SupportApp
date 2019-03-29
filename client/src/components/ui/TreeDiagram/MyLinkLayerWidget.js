import {LinkLayerWidget} from "storm-react-diagrams";

export default class MyLinkLayerWidget extends LinkLayerWidget {

    viewState = null;

    updateViewState() {
        this.viewState = this.buildViewState(this.props.diagramEngine.getDiagramModel());
    }

    buildViewState(model) {
        return `${model.zoom}:${model.offsetX}:${model.offsetY}:${Object.keys(model.links).length}`;
    }

    componentDidMount() {
        this.updateViewState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateViewState();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let newViewState = this.buildViewState(nextProps.diagramEngine.getDiagramModel());

        console.log(newViewState, this.viewState);
        return newViewState !== this.viewState;
    }
}