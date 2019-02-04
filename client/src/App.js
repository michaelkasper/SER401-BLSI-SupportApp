import React, {Component} from 'react';
import './App.css';
import AlgorithmContainer from "./components/app/algorithm/AlgorithmContainer";
import {inject, observer} from "mobx-react";
import AlgorithmSelectorContainer from "./components/app/algorithm/AlgorithmSelectorContainer";
import Loading from "./components/ui/Loading";
import withStyles from "@material-ui/core/es/styles/withStyles";

@inject("rootStore")
@observer
class App extends Component {

    state = {
        algorithm: null,
        loading  : true
    };

    componentDidMount() {
        this.props.rootStore.algorithmStore.fetchAll()
            .then(() => {
                this.setState({loading: false})
            })
    }

    onSelect = (algorithm) => {
        this.setState({
            algorithm: algorithm
        });
    };

    render() {
        let {classes}            = this.props;
        let {algorithm, loading} = this.state;

        if (loading) {
            return <Loading/>
        }

        return (
            <div className={classes.root}>
                <AlgorithmSelectorContainer onSelect={this.onSelect}/>
                {
                    algorithm &&
                    <AlgorithmContainer algorithm={algorithm}/>
                }
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        height: '100%'
    }
});

export default withStyles(styles)(App);
