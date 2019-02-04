import React from 'react';
import {withStyles} from '@material-ui/core';
import {observer} from "mobx-react";
import Typography from "@material-ui/core/Typography";
import MuiModal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Modal from "../app/algorithm/AlgorithmSelectorContainer";


const Form = ({open, isCreate = false, isEdit = false, onCreate, onClose, onEdit, title, children, classes}) => {

    let onSubmit = (e) => {
        e.preventDefault();
        if (isCreate) {
            onCreate();
        } else if (isEdit) {
            onEdit();
        } else {
            onClose();
        }
    };

    return (

        <div
            style={{
                top      : `20%`,
                left     : `50%`,
                transform: `translate(-50%, -20%)`,
            }}
            className={classes.paper}
            tabIndex="-1"
        >
            <Typography variant="h6" id="modal-title">
                {title}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
                <form className={classes.root} autoComplete="off" onSubmit={onSubmit}>
                    <FormControl className={classes.formControl}>
                        {children}

                        {
                            isCreate &&
                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={onCreate}>Create
                            </Button>
                        }

                        {
                            isEdit &&
                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={onEdit}>Save
                            </Button>
                        }

                    </FormControl>
                </form>
            </Typography>
        </div>
    );
};

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
});

export default withStyles(styles)(observer(Form));