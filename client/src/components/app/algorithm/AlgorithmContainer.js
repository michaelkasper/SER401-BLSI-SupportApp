import React from 'react';
import TabsContainer from "../tabs/TabsContainer";
import TreeContainer from "../tree/TreeContainer";
import DetailContainer from "../detail/DetailContainer";
import {observer} from "mobx-react";
import Loading from "../../ui/Loading";
import withStyles from "@material-ui/core/es/styles/withStyles";
import withDragAndDrop from "../../hoc/DragAndDrop";

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

    onStateChange = (state) => {
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
                <TabsContainer algorithm={algorithm} onStateChange={this.onStateChange}/>
                <TreeContainer tree={algorithm} onStateChange={this.onStateChange}/>

                {
                    selectedState &&
                    <DetailContainer algorithm={algorithm} state={selectedState}/>
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