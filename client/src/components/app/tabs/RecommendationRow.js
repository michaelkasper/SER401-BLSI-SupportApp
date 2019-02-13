import React from 'react';
import Grid from "@material-ui/core/Grid";
import {observer} from "mobx-react";
import {withDrag} from "../../hoc/DragAndDrop";
import withStyles from "@material-ui/core/es/styles/withStyles";

const RecommendationRow = ({item: recommendation, connectDragSource, classes}) => {

    return connectDragSource(
        <div className={classes.root}>
            <Grid container
                  direction="row"
                  alignItems="center"
            >
                <Grid item xs={12} style={{
                    textAlign: 'left',
                }}>
                    {recommendation.title}
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


export default withDrag('recommendation')(withStyles(styles)(observer(RecommendationRow)));