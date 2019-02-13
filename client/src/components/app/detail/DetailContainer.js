import React from 'react';
import {observer} from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {withDrop} from "../../hoc/DragAndDrop";
import QuestionDropZone from "./QuestionDropZone";
import RecommendationDropZone from "./RecommendationDropZone";
import NextBadStateDropZone from "./NextBadStateDropZone";
import NextGoodStateDropZone from "./NextGoodStateDropZone";


const TableCell = withStyles(theme => ({
    body: {
        color: '#4d4d4d'
    }
}))(MuiTableCell);

@observer
class DetailContainer extends React.Component {
    state = {
        questions      : [
            {
                id       : 0,
                question : 'Phasellus eget diam rutrum, molestie orci ut, interdum augue.',
                type     : 'number',
                deleteBtn: '-'
            },
            {id: 1, question: 'Duis maximus nibh ut volutpat volutpat.', type: 'boolean', deleteBtn: '-'},
            {id: 2, question: 'Aliquam pulvinar orci ut magna ultricies rutrum.', type: 'string', deleteBtn: '-'}],
        recommendations: [
            {id: 0, recommendation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', deleteBtn: '-'},
            {
                id            : 1,
                recommendation: 'Aenean ullamcorper augue ultrices mi dapibus, nec feugiat ipsum porttitor.',
                deleteBtn     : '-'
            },
            {
                id            : 2,
                recommendation: 'Pellentesque euismod metus sed ex sagittis, in ultricies ligula tincidunt.',
                deleteBtn     : '-'
            }]
    };

    render() {
        let {classes, algorithm, state}  = this.props;
        let {questions, recommendations} = this.state;

        return (
            <div className={classes.root}>


                <QuestionDropZone state={state}/>
                <RecommendationDropZone state={state}/>

                <div className={classes.stateDropZone}>
                    <div className={classes.stateDropZoneGood}>
                        <NextGoodStateDropZone state={state}/>
                    </div>
                    <div className={classes.stateDropZoneBad}>
                        <NextBadStateDropZone state={state} className={classes.stateDropZoneBadStyle}/>
                    </div>
                </div>


                <AppBar position='static' color='primary' className={classes.containerHeader}>
                    State Details
                </AppBar>

                <div className={classes.content}>

                    <Typography align='left' className={classes.idContainer}>
                        State Id: {state.id}
                    </Typography>

                    <Divider/>

                    <Typography align='left' className={classes.addContent}>
                        Questions (Drop here to add)
                    </Typography>

                    <Table>
                        <TableBody>
                            {questions.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell className={classes.cellPadding}>{row.question}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{/* Placeholder for delete button */}{row.deleteBtn}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Typography align='left' className={classes.addContent}>
                        Recommendations (Drop here to add)
                    </Typography>

                    <Table>
                        <TableBody>
                            {recommendations.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell className={classes.cellPadding}>{row.recommendation}</TableCell>
                                    <TableCell>{/* Placeholder for delete button */}{row.deleteBtn}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}


const styles = theme => ({
    root             : {
        position       : "absolute",
        backgroundColor: theme.palette.background.default,
        width          : 400,
        right          : "0px",
        top            : "0px",
        height         : "calc(100vh - 68px)",
        boxShadow      : "-3px 0px 10px -5px #888888"
    },
    containerHeader  : {
        padding: 16
    },
    idContainer      : {
        padding   : 16,
        marginLeft: 8
    },
    addContent       : {
        padding        : 16,
        marginLeft     : 8,
        backgroundColor: '#f2f2f2',
        color          : '#404040',
        fontWeight     : 'bold'
    },
    cellPadding      : {
        paddingRight: 6
    },
    content          : {
        overflow : "hidden",
        height   : "calc(100% - 48px)",
        overflowY: "scroll"
    },
    stateDropZone    : {
        position : "absolute",
        width    : 400,
        right    : "0px",
        top      : "0px",
        height   : "calc(100vh - 68px)",
        boxShadow: "-3px 0px 10px -5px #888888"
    },
    stateDropZoneGood: {
        position : "absolute",
        width    : 400,
        right    : "0px",
        top      : "0px",
        height   : "calc((100vh - 68px)/2)",
        boxShadow: "-3px 0px 10px -5px #888888"
    },
    stateDropZoneBad : {
        position : "absolute",
        width    : 400,
        right    : "0px",
        top      : "calc((100vh - 68px)/2)",
        height   : "calc((100vh - 68px)/2)",
        boxShadow: "-3px 0px 10px -5px #888888"
    },
    stateDropZoneBadStyle: {
        backgroundColor : 'red'
    },
});


export default withDrop('row')(withStyles(styles, {withTheme: true})(DetailContainer));
