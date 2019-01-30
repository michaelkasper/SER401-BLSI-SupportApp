import React from 'react';
import {observer} from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import withStyles from "@material-ui/core/es/styles/withStyles";
import TabContainer from "./TabContainer";

@observer
class TabsContainer extends React.Component {

    state = {
        view: 0,
    };


    handleChange = (event, value) => {
        this.setState({view: value});
    };

    handleChangeIndex = index => {
        this.setState({view: index});
    };


    render() {
        let {view}                      = this.state;
        let {algorithm, classes, theme} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Tabs
                        value={this.state.view}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="fullWidth"
                        classes={{indicator: classes.indicator}}
                    >
                        <Tab label="States" classes={{root: classes.tabRoot, selected: classes.tabSelected}}/>
                        <Tab label="Questions" classes={{root: classes.tabRoot, selected: classes.tabSelected}}/>
                        <Tab label="Recommendations" classes={{root: classes.tabRoot, selected: classes.tabSelected}}/>
                    </Tabs>
                </AppBar>

                {view === 0 && <TabContainer dir={theme.direction} content={algorithm.states}/>}
                {view === 1 && <TabContainer dir={theme.direction} content={algorithm.questions}/>}
                {view === 2 && <TabContainer dir={theme.direction} content={algorithm.recommendations}/>}
            </div>
        );
    }
}

const styles = theme => ({
    root       : {
        backgroundColor: theme.palette.background.default,
        width          : 400,
    },
    tabRoot    : {
        textTransform  : 'initial',
        minWidth       : 72,
        fontWeight     : theme.typography.fontWeightRegular,
        marginRight    : theme.spacing.unit,
        marginLeft     : theme.spacing.unit,
        color          : '#FFFFFF',
        fontFamily     : [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover'      : {
            opacity: 1,
        },
        '&$tabSelected': {
            color     : '#FFFFFF',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus'      : {},
    },
    tabSelected: {
        color: '#FFFFFF',
    },
    indicator  : {
        backgroundColor: '#FFFFFF',
    }
});

export default withStyles(styles, {withTheme: true})(TabsContainer);