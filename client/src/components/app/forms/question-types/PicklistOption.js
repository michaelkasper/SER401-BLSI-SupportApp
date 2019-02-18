import React from 'react';
import {withStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

@inject("rootStore")
@observer
class PicklistOption extends React.Component {
    state = {
        invalidOption: false    // UI only, does not affect functionality
    };

    onChange = (field) => (e) => {
        this.setState({invalidOption: e.target.value.length < 1});
        this.props.option[field] = e.target.value;
    };

    onCheckboxChange = (field) => (e) => {
        this.props.option[field] = e.target.checked;
    };

    render() {
        let {option, classes, onRemoveOption} = this.props;

        return (
            <FormGroup row className={classes.root}>
                <RemoveCircleIcon className={classes.delete} onClick={onRemoveOption}/>
                <TextField
                    id="label-input"
                    label="Option Label"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={option.label}
                    required
                    onChange={this.onChange('label')}
                    error={this.state.invalidOption}
                    helperText={this.state.invalidOption ? "Required field" : ""}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={option.is_good}
                            onChange={this.onCheckboxChange('is_good')}
                            value="true"
                        />
                    }
                    label="Is Good Response?"
                    labelPlacement="start"
                />
            </FormGroup>
        );
    }
}


const styles = theme => ({
    root       : {
        borderBottom: "1px solid #ccc"
    },
    button     : {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin  : theme.spacing.unit,
        minWidth: 120,
    },
    textField  : {
        marginLeft : theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width      : 200,
    },
    delete     : {
        marginTop: 30,
        cursor   : 'pointer'
    }
});

export default withStyles(styles)(PicklistOption);