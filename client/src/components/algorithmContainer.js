import React, {Fragment} from 'react';
import TabsContainer from "./tabs/TabsContainer";
import TreeContainer from "./tree/TreeContainer";
import DetailContainer from "./detail/DetailContainer";
import {observer} from "mobx-react";
import Loading from "../components/ui/Loading";

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
        let {algorithm}              = this.props;

        if (loading) {
            return <Loading/>
        }

        return (
            <Fragment>

                <TabsContainer algorithm={algorithm}/>
                <TreeContainer tree={algorithm} onStateChange={this.onStateChange}/>
                <DetailContainer algorithm={algorithm}/>

                {
                    selectedState &&
                    <DetailContainer state={selectedState}/>
                }

            </Fragment>
        );
    }
}

export default AlgorithmContainer;