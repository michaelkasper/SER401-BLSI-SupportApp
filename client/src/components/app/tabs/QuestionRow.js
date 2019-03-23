import React from 'react';
import Grid from "@material-ui/core/Grid";
import {observer} from "mobx-react";
import {withDrag} from "../../hoc/DragAndDrop";
import withStyles from "@material-ui/core/es/styles/withStyles";

const QuestionRow = ({item: question, connectDragSource, classes}) => {

    return connectDragSource(
        <div className={classes.root}>
            <Grid container
                  direction="row"
                  alignItems="center"
            >
                <Grid item xs={8} style={{
                    textAlign: 'left',
                }}>
                    {question.text}
                </Grid>
                <Grid item xs={4} style={{
                    textAlign: 'left',
                }}>
                    {question.type}
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


export default withDrag('question')(withStyles(styles)(observer(QuestionRow)));