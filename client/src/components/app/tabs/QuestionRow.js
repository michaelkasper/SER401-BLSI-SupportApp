import React from 'react';
import Grid from "@material-ui/core/Grid";
import {observer} from "mobx-react";

const QuestionRow = ({item: question}) => {

    return (
        <Grid container
              direction="row"
              alignItems="center"
        >
            <Grid item xs={8} style={{
                textAlign: 'left',
            }}>
                {question.question}
            </Grid>
            <Grid item xs={4} style={{
                textAlign: 'left',
            }}>
                {question.type}
            </Grid>
        </Grid>
    );
};


export default observer(QuestionRow);