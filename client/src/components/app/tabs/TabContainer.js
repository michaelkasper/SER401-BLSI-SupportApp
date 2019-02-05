import React from 'react';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

class TabContainer extends React.Component {

    onCreate = () => {
        this.props.onCreate();
    };

    onSelect = (obj) => () => {
        if (this.props.onSelect) {
            this.props.onSelect(obj);
        }
    };

    render() {
        let {classes, content, row: RowContent} = this.props;

        return (
            <Typography component="div" dir={this.props.dir}>
                {
                    content.map((item, index) => (
                            <div key={item.id} className={classes.row} onClick={this.onSelect(item)}>
                                <RowContent item={item} index={index}/>
                            </div>
                        )
                    )
                }

                <Fab className={classes.fab} color="primary" onClick={this.onCreate}>
                    <AddIcon/>
                </Fab>
            </Typography>
        );
    }
}


const styles = theme => ({
    row: {
        borderBottom: "1px solid #cccccc",
        padding     : "10px",
        textAlign   : 'right',
        cursor      : 'pointer',
        '&:hover'  : {
            backgroundColor: "#cccccc"
        }
    },
    fab: {
        position: 'absolute',
        bottom  : theme.spacing.unit * 2,
        right   : theme.spacing.unit * 2,
    },

});

export default withStyles(styles)(TabContainer);