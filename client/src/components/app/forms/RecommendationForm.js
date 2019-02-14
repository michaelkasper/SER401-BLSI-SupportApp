import React, {Fragment} from 'react';
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {inject, observer} from "mobx-react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

@inject("rootStore")
@observer
class RecommendationForm extends React.Component {

    state = {
        localModel: {
            title      : "",
            description: ""
        }
    };

    componentDidMount() {
        let {recommendation} = this.props;
        if (recommendation) {
            this.setState({
                localModel: {
                    title      : recommendation.title,
                    description: recommendation.description
                }
            });
        }
    }

    onChange = (field) => (e) => {
        let localModel    = {...this.state.localModel};
        localModel[field] = e.target.value;
        this.setState({localModel: localModel});
    };

    onCancel = () => {
        this.props.onClose();
    };

    onSave = () => {
        let {recommendation, algorithm, rootStore} = this.props;
        let promise;
        if (!recommendation) {
            promise = rootStore.recommendationStore.post({algorithm_id: algorithm.id, ...this.state.localModel})
                .then(res => res.result);
        } else {
            promise = recommendation.fromJson(this.state.localModel).save();
        }

        promise.then(q => {
            this.props.onClose();
        });
    };

    render() {
        let {classes, recommendation} = this.props;
        let {localModel}              = this.state;

        return (
            <Fragment>
                <DialogTitle id="max-width-dialog-title">Recommendation</DialogTitle>

                <DialogContent classes={{root: classes.dialogContent}}>

                    <TextField
                        id="outlined-full-width"
                        label="Title"
                        value={localModel.title}
                        onChange={this.onChange('title')}
                        placeholder="Title"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />


                    <TextField
                        id="outlined-full-width"
                        label="Description"
                        value={localModel.description}
                        onChange={this.onChange('description')}
                        multiline
                        rowsMax="6"
                        placeholder="Description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.onSave} color="primary" autoFocus>
                        {
                            !recommendation &&
                            "Create"
                        }

                        {
                            !!recommendation &&
                            "Save"
                        }
                    </Button>
                </DialogActions>
            </Fragment>
        );
    }
}


const styles = theme => ({
    button     : {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin  : theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    textField  : {
        marginLeft : theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width      : 200,
    },
});

export default withStyles(styles)(RecommendationForm);