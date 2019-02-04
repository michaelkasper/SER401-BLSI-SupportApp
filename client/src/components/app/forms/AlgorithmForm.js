import React, {Fragment} from 'react';
import Form from "../../ui/Form";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import FormControl from "@material-ui/core/FormControl";

@inject("rootStore")
@observer
class AlgorithmForm extends React.Component {

    state = {
        createNew : false,
        localModel: {
            name: ''
        }
    };

    get algorithmStore() {
        return this.props.rootStore.algorithmStore;
    }

    get algorithms() {
        return this.algorithmStore.getAll()
    }

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
        this.setState({createNew: false, localModel: {name: ''}});
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

    render() {
        let {createNew, localModel}      = this.state;
        let {selectedAlgorithm, classes} = this.props;

        return (
            <Form
                title={"Select or Create a new algorithm"}
                onClose={this.handleClose}
            >
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
            </Form>
        );
    }
}


const styles = theme => ({
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

export default withStyles(styles)(AlgorithmForm);