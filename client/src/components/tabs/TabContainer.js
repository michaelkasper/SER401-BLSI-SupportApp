import React, {Fragment} from 'react';
import Typography from "@material-ui/core/Typography";

class TabContainer extends React.Component {

    render() {
        return (
            <Typography component="div" dir={this.props.dir} style={{padding: 8 * 3}}>
                ...
            </Typography>
        );
    }
}

export default TabContainer;