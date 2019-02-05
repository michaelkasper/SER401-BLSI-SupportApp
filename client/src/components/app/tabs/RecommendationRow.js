import React from 'react';
import Grid from "@material-ui/core/Grid";
import {observer} from "mobx-react";

const RecommendationRow = ({item: recommendation}) => {

    return (
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
    );
};


export default observer(RecommendationRow);