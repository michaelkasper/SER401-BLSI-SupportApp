import React, {Component} from 'react';
import './App.css';
import AlgorithmContainer from "./components/algorithmContainer";
import {inject, observer} from "mobx-react";
import AlgorithmSelectorContainer from "./components/algorithmSelectorContainer";
import Loading from "./components/ui/Loading";

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

        let {algorithm, loading} = this.state;

        if (loading) {
            return <Loading/>
        }

        return (
            <div className="App">
                <AlgorithmSelectorContainer onSelect={this.onSelect}/>
                {
                    algorithm &&
                    <AlgorithmContainer algorithm={algorithm}/>
                }
            </div>
        );
    }
}

export default App;
