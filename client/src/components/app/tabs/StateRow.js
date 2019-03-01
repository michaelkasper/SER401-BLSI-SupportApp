import React from 'react';
import Grid from "@material-ui/core/Grid";
import {observer} from "mobx-react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {withDrag} from "../../hoc/DragAndDrop";
import StarIcon from "@material-ui/icons/StarBorder";
import StarSelectedIcon from "@material-ui/icons/Star";

const StateRow = ({item: state, connectDragSource, classes}) => {

    return connectDragSource(
        <div className={classes.root}>
            <Grid container
                  direction="row"
                  alignItems="center"
            >
                <Grid item xs={2} style={{
                    textAlign: 'left',
                }}>
                    {
                        !state.isStartState &&
                        <StarIcon className={[classes.star, "star"].join(" ")} onClick={() => {
                            state.toggleStartState();
                        }}/>
                    }

                    {
                        state.isStartState &&
                        <StarSelectedIcon className={[classes.starSelected, "star-selected"].join(" ")} onClick={() => {
                            state.toggleStartState();
                        }}/>
                    }

                </Grid>
                <Grid item xs={10} style={{
                    textAlign: 'left',
                }}>
                    {state.id}
                </Grid>

            </Grid>
        </div>
    );
};


const styles = theme => ({
    root        : {
        textAlign: 'right',
        padding  : "10px",
    },
    star        : {
        color: "#cccccc",
    },
    starSelected: {
        color: "#D8D800"
    }
});


export default withDrag('state')(withStyles(styles)(observer(StateRow)));