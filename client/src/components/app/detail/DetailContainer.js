import React from 'react';
import {observer} from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {withDrop} from "../../hoc/DragAndDrop";
import QuestionDropZone from "./drop-zones/QuestionDropZone";
import RecommendationDropZone from "./drop-zones/RecommendationDropZone";
import StateDropZone from "./drop-zones/StateDropZone";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import StarSelectedIcon from "@material-ui/icons/StarTwoTone";

@observer
class DetailContainer extends React.Component {

    onClose = () => {
        this.props.onStateChange(null);
    };

    switchState = (state) => () => {
        this.props.onStateChange(state.id);
    };

    removeRecommendation = (recommendation) => () => {
        this.props.state.removeRecommendation(recommendation).save();
    };

    removeQuestion = (question) => () => {
        this.props.state.removeQuestion(question).save();
    };

    clearBadState = () => {
        this.props.state.linkNextBadState(null).save();
    };

    clearGoodState = () => {
        this.props.state.linkNextGoodState(null).save();
    };

    render() {
        let {classes, state} = this.props;

        return (
            <div className={classes.root}>


                <QuestionDropZone state={state}/>
                <RecommendationDropZone state={state}/>
                <StateDropZone state={state}/>


                <AppBar position='static' color='primary' className={classes.containerHeader}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                            State Details ({state.id})
                        </Typography>

                        <Button color="inherit" onClick={this.onClose}>Close</Button>
                    </Toolbar>
                </AppBar>

                <div className={classes.content}>


                    {
                        state.is_initial &&
                        <>
                            <Typography align='left' className={classes.startStateFlag}>
                                <>
                                    <StarSelectedIcon style={{
                                        color: "#404040",
                                    }}/>

                                    Start State
                                </>
                            </Typography>

                            <div className={classes.section}>
                            </div>
                        </>
                    }

                    <Typography align='left' className={classes.addContent}>
                        Questions (Drop here to add)
                    </Typography>


                    <div className={classes.section}>
                        {state.questions.map(row => (
                            <Grid container
                                  direction="row"
                                  alignItems="center"
                                  key={row.id}
                                  className={classes.sectionRow}
                            >
                                <Grid item xs={7}>
                                    {row.text}
                                </Grid>
                                <Grid item xs={3}>
                                    {row.type}
                                </Grid>
                                <Grid item xs={1}>
                                    <Button onClick={this.removeQuestion(row)}><RemoveCircleIcon/></Button>
                                </Grid>
                            </Grid>
                        ))}
                    </div>

                    <Typography align='left' className={classes.addContent}>
                        Recommendations (Drop here to add)
                    </Typography>

                    <div className={classes.section}>
                        {state.recommendations.map(row => (
                            <Grid container
                                  direction="row"
                                  alignItems="center"
                                  key={row.id}
                                  className={classes.sectionRow}
                            >
                                <Grid item xs={10}>
                                    {row.title}
                                </Grid>
                                <Grid item xs={1}>
                                    <Button onClick={this.removeRecommendation(row)}><RemoveCircleIcon/></Button>
                                </Grid>
                            </Grid>
                        ))}
                    </div>


                    <Typography align='left' className={classes.addContent}>
                        Next States (Drop here to add)
                    </Typography>

                    <div className={classes.section}>
                        <Grid container
                              direction="row"
                              alignItems="center"
                              className={classes.sectionRow}
                        >
                            {
                                state.nextGoodState &&
                                <>
                                    <Grid item xs={7}>
                                        Good State Id: {state.nextGoodState.id}
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button onClick={this.switchState(state.nextGoodState)}>View</Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button onClick={this.clearGoodState}><RemoveCircleIcon/></Button>
                                    </Grid>
                                </>
                            }

                            {
                                !state.nextGoodState &&
                                <>
                                    <Grid item xs={11} style={{paddingTop: 10, paddingBottom: 10}}>
                                        Good State Id: none
                                    </Grid>
                                </>
                            }
                        </Grid>

                        <Grid container
                              direction="row"
                              alignItems="center"
                              className={classes.sectionRow}
                        >

                            {
                                state.nextBadState &&
                                <>
                                    <Grid item xs={7}>
                                        Bad State Id: {state.nextBadState.id}
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button onClick={this.switchState(state.nextBadState)}>View</Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button onClick={this.clearBadState}><RemoveCircleIcon/></Button>
                                    </Grid>
                                </>
                            }

                            {
                                !state.nextBadState &&
                                <>
                                    <Grid item xs={11} style={{paddingTop: 10, paddingBottom: 10}}>
                                        Bad State Id: none
                                    </Grid>
                                </>
                            }
                        </Grid>
                    </div>

                </div>
            </div>
        );
    }
}


const styles = theme => ({
    root           : {
        position       : "absolute",
        backgroundColor: theme.palette.background.default,
        width          : 400,
        right          : "0px",
        top            : "0px",
        height         : "calc(100vh - 80px)",
        boxShadow      : "-3px 0px 10px -5px #888888"
    },
    containerHeader: {},
    section        : {
        paddingTop   : 8,
        paddingBottom: 8,
        paddingRight : 16,
        paddingLeft  : 16,
    },
    sectionRow     : {
        color       : "#4d4d4d",
        fontSize    : "0.8125rem",
        fontWeight  : 400,
        textAlign   : "left",
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
    },
    addContent     : {
        padding        : 16,
        backgroundColor: '#f2f2f2',
        color          : '#404040',
        fontWeight     : 'bold'
    },
    startStateFlag : {
        padding        : 8,
        backgroundColor: '#FAFA00',
        color          : '#404040',
        fontWeight     : 'bold'
    },
    cellPadding    : {
        paddingRight: 6
    },
    content        : {
        paddingLeft: 8,
        overflow   : "hidden",
        height     : "calc(100% - 48px)",
        overflowY  : "scroll"
    }
});


export default withDrop('state')(withStyles(styles, {withTheme: true})(DetailContainer));
