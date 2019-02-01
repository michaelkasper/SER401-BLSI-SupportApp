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
    render() {
        let {classes} = this.props;
        
        return (
            <div className={classes.root}>
                <AppBar position='static' color='primary' className={classes.containerTitle}>
                    State Details
                </AppBar>

                <Typography align='left' className={classes.idContainer}>
                    State Id: 43
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
                        <TableRow>
                            <CustomTableCell>Question 1</CustomTableCell>
                            <CustomTableCell>boolean</CustomTableCell>
                            <CustomTableCell>-</CustomTableCell>
                        </TableRow>
                        <TableRow>
                            <CustomTableCell>Question 2</CustomTableCell>
                            <CustomTableCell>boolean</CustomTableCell>
                            <CustomTableCell>-</CustomTableCell>
                        </TableRow>
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
                        <TableRow>
                            <CustomTableCell>Recommendation 1</CustomTableCell>
                            <CustomTableCell>-</CustomTableCell>
                        </TableRow>
                        <TableRow>
                            <CustomTableCell>Recommendation 2</CustomTableCell>
                            <CustomTableCell>-</CustomTableCell>
                        </TableRow>
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
    containerTitle: {
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
