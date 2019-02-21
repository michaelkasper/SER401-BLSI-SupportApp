import React from 'react';
import TabsContainer from "../tabs/TabsContainer";
import DetailContainer from "../detail/DetailContainer";
import {inject, observer} from "mobx-react";
import Loading from "../../ui/Loading";
import withStyles from "@material-ui/core/es/styles/withStyles";
import withDragAndDrop from "../../hoc/DragAndDrop";
import TreeContainer from "../tree/TreeContainer";

@inject("rootStore")
@observer
class AlgorithmContainer extends React.Component {

    state = {
        selectedState: null,
        loading      : true
    };

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.algorithm.id !== this.props.algorithm.id) {
            this.setState({loading: true});
            this.loadData();
        }
    }


    loadData = () => {
        this.props.algorithm.load()
            .then(() => {
                this.setState({loading: false});
            })
    };

    onStateChange = (stateId) => {
        let state = null;
        if (stateId) {
            state = this.props.rootStore.stateStore.get(stateId);
        }
        this.setState({selectedState: state});
    };

    render() {
        let {loading, selectedState} = this.state;
        let {algorithm, classes}     = this.props;

        if (loading) {
            return <Loading/>
        }

        return (
            <div className={classes.root}>
                <TabsContainer
                    algorithm={algorithm}
                    onStateChange={this.onStateChange}
                />
                <TreeContainer
                    algorithm={algorithm}
                    diagramId={algorithm.stateDiagramId}
                    onStateChange={this.onStateChange}
                    selectedState={selectedState}
                />

                {
                    selectedState &&
                    <DetailContainer
                        algorithm={algorithm}
                        state={selectedState}
                        onStateChange={this.onStateChange}
                    />
                }

            </div>
        );
    }
}


const styles = theme => ({
    root: {
        "position": "relative"
    },
});

export default withDragAndDrop(withStyles(styles)(AlgorithmContainer));