import React from 'react';
import {observer} from "mobx-react";
import {withDrop} from "../../../hoc/DragAndDrop";
import NextGoodStateDropZone from "./NextGoodStateDropZone";
import NextBadStateDropZone from "./NextBadStateDropZone";
import withStyles from "@material-ui/core/es/styles/withStyles";


const StateDropZone = ({canDrop, classes, state}) => {

    if (!canDrop) {
        return "";
    }

    return (
        <div className={classes.root}>
            <div className={classes.stateDropZoneGood}>
                <NextGoodStateDropZone state={state}/>
            </div>
            <div className={classes.stateDropZoneBad}>
                <NextBadStateDropZone state={state} className={classes.stateDropZoneBadStyle}/>
            </div>
        </div>
    );
};


const styles = theme => ({
    root                 : {
        position : "absolute",
        width    : 400,
        right    : "0px",
        top      : "0px",
        height   : "calc(100vh - 68px)",
        boxShadow: "-3px 0px 10px -5px #888888"
    },
    stateDropZoneGood    : {
        position : "absolute",
        width    : 400,
        right    : "0px",
        top      : "0px",
        height   : "calc((100vh - 68px)/2)",
        boxShadow: "-3px 0px 10px -5px #888888"
    },
    stateDropZoneBad     : {
        position : "absolute",
        width    : 400,
        right    : "0px",
        top      : "calc((100vh - 68px)/2)",
        height   : "calc((100vh - 68px)/2)",
        boxShadow: "-3px 0px 10px -5px #888888"
    },
    stateDropZoneBadStyle: {
        backgroundColor: 'red'
    },
});


export default withStyles(styles)(withDrop('state')(observer(StateDropZone)));
