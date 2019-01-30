import React, {Fragment} from 'react';
import TabsContainer from "./tabs/TabsContainer";
import TreeContainer from "./tree/TreeContainer";
import DetailContainer from "./detail/DetailContainer";
import {observer} from "mobx-react";

@observer
class AlgorithmContainer extends React.Component {

    state = {
        selectedState: null
    };

    onStateClick = () => {
    };

    render() {

        let {selectedState} = this.state;
        let {algorithm}     = this.props;

        return (
            <Fragment>

                <TabsContainer algorithm={algorithm}/>
                <TreeContainer tree={algorithm.tree} onStateClick={this.onStateClick}/>
                <DetailContainer state={selectedState}/>

            </Fragment>
        );
    }
}

export default AlgorithmContainer;