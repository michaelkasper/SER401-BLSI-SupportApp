import React from 'react';
import {observer} from "mobx-react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";
import AlgorithmForm from "../forms/AlgorithmForm";
import Modal from "@material-ui/core/Modal";


@observer
class AlgorithmSelectorContainer extends React.Component {

    state = {
        showModal        : false,
        selectedAlgorithm: '',
        createNew        : false,
        localModel       : {
            name: ''
        }
    };

    componentDidMount() {
        if (!this.state.selectedAlgorithm) {
            this.setState({
                showModal: true
            })
        }
    }

    showModal = () => {
        this.setState({
            showModal: true
        })
    };

    onSelect = (algorithm) => {
        this.setState({showModal: false, selectedAlgorithm: algorithm});
        this.props.onSelect(algorithm);
    };

    render() {

        let {showModal, selectedAlgorithm} = this.state;
        let {classes}                      = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                            Algorithm: {selectedAlgorithm ? selectedAlgorithm.name : '...'}

                            <Button color="inherit" onClick={this.showModal}>Change</Button>

                        </Typography>

                        <Button color="secondary">Dump Mysql</Button>
                        <Button color="primary">New Release</Button>

                    </Toolbar>
                </AppBar>


                {
                    showModal &&
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={showModal}
                    >
                        <AlgorithmForm onSelect={this.onSelect} selectedAlgorithm={selectedAlgorithm}/>
                    </Modal>
                }
            </div>

        );
    }
}


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

export default withStyles(styles)(AlgorithmSelectorContainer);