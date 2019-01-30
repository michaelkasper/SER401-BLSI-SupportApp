import React, {Fragment} from 'react';
import {inject, observer} from "mobx-react";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

@inject("rootStore")
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

    get algorithmStore() {
        return this.props.rootStore.algorithmStore;
    }

    get algorithms() {
        return this.algorithmStore.getAll()
    }

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

    onAlgorithmChange = (event) => {

        if (event.target.value === -1) {
            this.setState({createNew: true});
        } else if (event.target.value !== '') {
            this.onSelect(this.algorithmStore.get(event.target.value));
        } else {
            this.setState({selectedAlgorithm: '', createNew: false});
        }
    };

    onNewNameChange = (event) => {
        this.setState({localModel: {name: event.target.value}});
    };

    onSelect = (algorithm) => {
        this.setState({createNew: false, showModal: false, localModel: {name: ''}, selectedAlgorithm: algorithm});
        this.props.onSelect(algorithm);
    };

    onCreateNew = () => {
        // this.algorithmStore.post(this.state.localModel)
        //     .then((algorithm) => {
        //         this.onSelect(algorithm);
        //     });

        /** TODO: Remove after testing **/
        this.onSelect(this.algorithmStore.new(this.state.localModel));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.createNew) {
            this.onCreateNew();
        }
    };

    render() {

        let {showModal, selectedAlgorithm, createNew, localModel} = this.state;
        let {classes}                                             = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Algorithm: {selectedAlgorithm ? selectedAlgorithm.name : '...'}
                        </Typography>
                        <Button color="inherit" onClick={this.showModal}>Change</Button>
                    </Toolbar>
                </AppBar>


                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={showModal}
                    onClose={this.handleClose}
                >
                    <div style={{
                        top      : `20%`,
                        left     : `50%`,
                        transform: `translate(-50%, -20%)`,
                    }} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            Select or Create a new algorithm
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            <form className={classes.root} autoComplete="off" onSubmit={this.onSubmit}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="algorithm">Algorithm</InputLabel>
                                    <Select
                                        value={selectedAlgorithm ? selectedAlgorithm.id : ''}
                                        onChange={this.onAlgorithmChange}
                                        inputProps={{
                                            name: 'selectedAlgorithm',
                                            id  : 'algorithm',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                        {
                                            this.algorithms.map(algorithm => (
                                                    <MenuItem
                                                        key={algorithm.id}
                                                        value={algorithm.id}
                                                    >
                                                        {algorithm.name}
                                                    </MenuItem>
                                                )
                                            )
                                        }

                                        <MenuItem value={-1}>Create New...</MenuItem>
                                    </Select>

                                    {
                                        createNew &&
                                        <Fragment>
                                            <TextField
                                                id="standard-create-new"
                                                label="Create New"
                                                className={classes.textField}
                                                margin="normal"
                                                value={localModel.name}
                                                onChange={this.onNewNameChange}
                                                autoFocus={true}
                                            />

                                            <Button variant="contained" color="primary" className={classes.button}
                                                    onClick={this.onCreateNew}>Create and Select
                                            </Button>
                                        </Fragment>

                                    }

                                </FormControl>
                            </form>
                        </Typography>
                    </div>
                </Modal>

            </div>

        );
    }
}


const styles = theme => ({
    root       : {
        flexGrow: 1,
    },
    paper      : {
        position       : 'absolute',
        width          : theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow      : theme.shadows[5],
        padding        : theme.spacing.unit * 4,
        outline        : 'none',
    },
    button     : {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin  : theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    textField  : {
        marginLeft : theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width      : 200,
    },
});

export default withStyles(styles)(AlgorithmSelectorContainer);