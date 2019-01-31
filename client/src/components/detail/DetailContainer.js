import React, {Fragment} from 'react';
import {observer} from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Divider from '@material-ui/core/Divider'
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
        let {algorithm, classes} = this.props;
        
        return (
            <div className={classes.root}>
                <AppBar position='static' color='primary' style={{padding: 8 * 2}}>
                    State Details
                </AppBar>

                <Typography align='left' style={{padding: 8 * 2}}>
                    State Id: 43
                </Typography>
                <Divider variant='middle'/>
                
                <Typography align='left' style={{padding: 8 * 2}}>
                    Questions
                </Typography>
                
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell>Answer Type</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Question 1</TableCell>
                            <TableCell>boolean</TableCell>
                            <TableCell>-</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Question 2</TableCell>
                            <TableCell>boolean</TableCell>
                            <TableCell>-</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Typography align='left' style={{padding: 8 * 2}}>
                    Recommendations
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Recommendation</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Recommendation 1</TableCell>
                            <TableCell>-</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Recommendation 2</TableCell>
                            <TableCell>-</TableCell>
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
        width          : 400
    }
});

export default withStyles(styles, {withTheme: true})(DetailContainer);
