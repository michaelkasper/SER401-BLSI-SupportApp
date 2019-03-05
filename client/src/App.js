import React, {Component} from 'react';
import './App.css';
import AlgorithmContainer from "./components/app/algorithm/AlgorithmContainer";
import {inject, observer} from "mobx-react";
import AlgorithmSelectorContainer from "./components/app/algorithm/AlgorithmSelectorContainer";
import Loading from "./components/ui/Loading";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from "@material-ui/core/Slide";

@inject("rootStore")
@observer
class App extends Component {

    state = {
        message  : null,
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

    onRelease = () => {
        this.setState({loading: true});
        this.props.rootStore.releaseStore.post({algorithm_id: this.state.algorithm.id})
            .then(res => {
                this.setState({loading: false, algorithm: null, message: "Release Created!"});
            })
    };

    handleCloseMessage = () => {
        this.setState({message: null});
    };

    render() {
        let {classes}            = this.props;
        let {algorithm, loading} = this.state;

        if (loading) {
            return <Loading/>
        }

        return (
            <div className={classes.root}>
                <AlgorithmSelectorContainer onSelect={this.onSelect} onRelease={this.onRelease}/>
                {
                    algorithm &&
                    <AlgorithmContainer algorithm={algorithm}/>
                }

                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    TransitionComponent={(props) => <Slide {...props} direction="down"/>}
                    open={!!this.state.message}
                    autoHideDuration={6000}
                    onClose={this.handleCloseMessage}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                />
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
