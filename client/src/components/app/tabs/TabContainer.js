import React, {Fragment} from 'react';
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {Button} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

class TabContainer extends React.Component {

    render() {
        let {classes} = this.props;

        return (
            <Typography component="div" dir={this.props.dir} style={{padding: 8 * 3}}>
                {/*<div className={classes.createBar}>*/}
                {/*<Button variant="contained" color="primary" className={classes.button}>*/}
                {/*New*/}
                {/*</Button>*/}
                {/*</div>*/}
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>
                <div>...</div>

                <Fab className={classes.fab} color="primary">
                    <AddIcon/>
                </Fab>
            </Typography>
        );
    }
}


const styles = theme => ({
    createBar: {
        "borderBottom" : "1px solid #ffffff",
        "position"     : "absolute",
        "top"          : "0px",
        "left"         : "0px",
        "width"        : "100%",
        "height"       : "30px",
        "background"   : "#bfbfbf",
        "verticalAlign": "middle",
        textAlign      : 'right'
    },
    fab      : {
        position: 'absolute',
        bottom  : theme.spacing.unit * 2,
        right   : theme.spacing.unit * 2,
    },

});

export default withStyles(styles)(TabContainer);