import React from 'react';
import Grid from "@material-ui/core/Grid";
import {observer} from "mobx-react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {withDrag} from "../../hoc/DragAndDrop";

const StateRow = ({item: state, connectDragSource,classes}) => {

    return connectDragSource(
        <div className={classes.root}>
            <Grid container
                  direction="row"
                  alignItems="center"
            >
                <Grid item xs={12} style={{
                    textAlign: 'left',
                }}>
                    {state.id}
                </Grid>
            </Grid>
        </div>
    );
};


const styles = theme => ({
    root: {
        textAlign: 'right',
        padding  : "10px",
    },
});


export default withDrag('state')(withStyles(styles)(observer(StateRow)));