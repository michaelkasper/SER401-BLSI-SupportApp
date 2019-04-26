import React from 'react';
import {observer} from "mobx-react";
import withStyles from "@material-ui/core/es/styles/withStyles";

@observer
class DropZone extends React.Component {
    state = {};

    render() {
        let {classes, connectDropTarget, isOver, canDrop, title, className = ""} = this.props;

        if (!canDrop) {
            return "";
        }

        return (
            connectDropTarget(
                <div className={classes.root}>
                    <div
                        className={isOver ? [classes.dropZone, classes.dropZoneHover, className].join(' ') : [classes.dropZone, className].join(' ')}>
                        <div>{title}</div>
                    </div>
                </div>
            )
        );
    }
}


const styles = theme => ({
    root         : {
        position : "absolute",
        width    : 400,
        right    : "0px",
        top      : "0px",
        height   : "calc(100%)",
        boxShadow: "-3px 0px 10px -5px #888888"
    },
    dropZone     : {
        display        : 'flex',
        margin         : 'auto',
        padding        : 40,
        backgroundColor: 'rgb(204, 255, 204)',
        opacity        : 0.7,
        height         : "calc(100% - 83px)",
        "& div"        : {
            margin    : 'auto', /* Important */
            textAlign : 'center',
            fontSize  : 24,
            fontWeight: 'bold'
        }
    },
    dropZoneHover: {
        opacity: 0.9,
    }
});


export default withStyles(styles, {withTheme: true})(DropZone);
