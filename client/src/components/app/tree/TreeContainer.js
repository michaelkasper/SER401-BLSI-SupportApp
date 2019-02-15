import {
    DiagramWidget
} from "storm-react-diagrams";
import React from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import TreeDiagram from "../../ui/TreeDiagram";

require("../../ui/TreeDiagramElements/TreeDiagram.css");


class TreeContainer extends React.Component {

    nodes = {};
    state = {
        diagram: null
    };

    componentDidMount() {
        let {algorithm, selectedState, onStateChange} = this.props;

        this.setState({
            diagram: new TreeDiagram(algorithm, selectedState, onStateChange)
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        let {algorithm, diagramId, selectedState, onStateChange} = this.props;

        if (prevProps.diagramId !== diagramId) {
            this.setState({
                diagram: new TreeDiagram(algorithm, selectedState, onStateChange)
            })
        } else if (selectedState !== prevProps.selectedState) {
            this.state.diagram.setSelectedState(selectedState);
            this.setState({
                diagram: this.state.diagram
            })
        }
    }


    render() {
        let {classes} = this.props;
        let {diagram} = this.state;

        return (
            <div className={classes.root}>
                {
                    diagram &&
                    <DiagramWidget
                        className="srd-demo-canvas"
                        diagramEngine={diagram.build()}
                        allowLooseLinks={false}
                        maxNumberPointsPerLink={4}
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