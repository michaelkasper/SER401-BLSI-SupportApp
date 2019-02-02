import React from 'react';
import {observer} from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";

@observer
class DetailContainer extends React.Component {
    state = {
        stateId: 43,
        questions: [
            {id: 0, question: 'Phasellus eget diam rutrum, molestie orci ut, interdum augue.',  type: 'number', deleteBtn: '-'}, 
            {id: 1, question: 'Duis maximus nibh ut volutpat volutpat.', type: 'boolean', deleteBtn: '-'},
            {id: 2, question: 'Aliquam pulvinar orci ut magna ultricies rutrum.', type: 'string', deleteBtn: '-'}],
        recommendations: [
            {id: 0, recommendation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', deleteBtn: '-'},
            {id: 1, recommendation: 'Aenean ullamcorper augue ultrices mi dapibus, nec feugiat ipsum porttitor.', deleteBtn: '-'},
            {id: 2, recommendation: 'Pellentesque euismod metus sed ex sagittis, in ultricies ligula tincidunt.', deleteBtn: '-'}]
    };
    
    render() {
        let {classes} = this.props;
        let {questions, recommendations, stateId} = this.state;
        
        return (
            <div className={classes.root}>
                <AppBar position='static' color='primary' className={classes.containerHeader}>
                    State Details
                </AppBar>

                <Typography align='left' className={classes.idContainer}>
                    State Id: {stateId}
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Question</CustomTableCell>
                            <CustomTableCell>Answer Type</CustomTableCell>
                            <CustomTableCell>{/* Empty header cell for delete button */}</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map(row => (
                            <TableRow key={row.id}>
                                <CustomTableCell>{row.question}</CustomTableCell>
                                <CustomTableCell>{row.type}</CustomTableCell>
                                <CustomTableCell>{/* Placeholder for delete button */}{row.deleteBtn}</CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Recommendation</CustomTableCell>
                            <CustomTableCell>{/* Empty header cell for delete button */}</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recommendations.map(row => (
                            <TableRow key={row.id}>
                                <CustomTableCell>{row.recommendation}</CustomTableCell>
                                <CustomTableCell>{/* Placeholder for delete button */}{row.deleteBtn}</CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}


const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        width: 400
    },
    containerHeader: {
        padding: 16
    },
    idContainer: {
        padding: 16,
        marginLeft: 6
    }
});

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#f2f2f2',
        color: '#404040',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    body: {
        color: '#4d4d4d'
    }
}))(TableCell);

export default withStyles(styles, {withTheme: true})(DetailContainer);
