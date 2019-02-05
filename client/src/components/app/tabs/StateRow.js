import React from 'react';
import Grid from "@material-ui/core/Grid";
import {observer} from "mobx-react";

const StateRow = ({item: state, index}) => {

    return (
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
    );
};


export default observer(StateRow);