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
class NumberOption extends React.Component {

    onChange = (field) => (e) => {
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
                    id="min-number"
                    label="Min"
                    value={option.min_value}
                    onChange={this.onChange('min_value')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    id="max-number"
                    label="Max"
                    value={option.max_value}
                    onChange={this.onChange('max_value')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
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
        width      : 100,
    },
    delete     : {
        marginTop: 30,
        cursor   : 'pointer'
    }
});

export default withStyles(styles)(NumberOption);