import React from 'react';
import {withStyles} from '@material-ui/core';
import {observer} from "mobx-react";
import MuiDialog from "@material-ui/core/Dialog";

const Dialog = ({open, onClose, children}) => {

    return (
        <MuiDialog
            maxWidth={'xl'}
            open={open}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
            {children}
        </MuiDialog>
    );
};

const styles = theme => ({});

export default withStyles(styles)(observer(Dialog));