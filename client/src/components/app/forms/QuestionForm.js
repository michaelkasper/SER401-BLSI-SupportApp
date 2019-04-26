import React, {Fragment} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {inject, observer} from "mobx-react";
import NumberOption from "./question-types/NumberOption";
import PicklistOption from "./question-types/PicklistOption";
import {QuestionOptionModel} from "../../../data/model/QuestionModel";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";

@inject("rootStore")
@observer
class QuestionForm extends React.Component {

    state = {
        localModel     : {
            type_key        : 'picklist',
            text            : "",
            prompt          : "",
            question_options: []
        },
        invalidQuestion: false    // UI only, does not affect functionality
    };

    setDefaultOptions = () => {
        let options = this.state.localModel.question_options;
        while (options.length < 2) {
            this.onAddOption();
        }
    };

    componentDidMount() {
        let {question} = this.props;
        if (question) {
            this.setState({
                localModel     : {
                    type_key        : question.type_key,
                    text            : question.text,
                    prompt          : question.prompt,
                    question_options: question.question_options
                },
                invalidQuestion: false
            }, this.setDefaultOptions);
        } else {
            this.setDefaultOptions();
        }
    }

    onChange = (field) => (e) => {
        let localModel = {...this.state.localModel};
        this.setState({invalidQuestion: e.target.value.length < 1});
        localModel[field] = e.target.value;
        this.setState({localModel: localModel});
    };

    onCancel = () => {
        this.props.onClose();
    };

    onSave = () => {
        let {question, algorithm, rootStore} = this.props;
        let promise;
        if (!question) {
            promise = rootStore.questionStore.post({algorithm_id: algorithm.id, ...this.state.localModel})
                .then(res => res.result);
        } else {
            promise = question.fromJson(this.state.localModel).save();
        }

        promise.then(q => {
            this.props.onClose();
        });
    };

    onAddOption = () => {
        let localModel = {...this.state.localModel};
        localModel.question_options.push(new QuestionOptionModel());
        this.setState({localModel: localModel});
    };

    onRemoveOption = (index) => () => {
        let localModel = {...this.state.localModel};
        localModel.question_options.splice(index, 1);
        this.setState({localModel: localModel}, this.setDefaultOptions);
    };

    invalidQuestion = () => {
        if (this.state.localModel.type_key === 'picklist') {
            return this.invalidPicklistOption();
        } else {
            return this.invalidNumberOption();
        }
    }

    invalidPicklistOption = () => {
        let options  = this.state.localModel.question_options;
        let questionText = this.state.localModel.text;

        if (questionText.length < 1) {
            return true
        } else if (options.some(this.emptyPicklistLabel)) {
            return true;
        } else if (options.every(this.allPositiveChecks) || options.every(this.allNegativeChecks)) {
            return true;
        } else {
            return false;
        }
    }

    invalidNumberOption = () => {
        let options  = this.state.localModel.question_options;
        let questionText = this.state.localModel.text;

        if (questionText.length < 1) {
            return true;
        } else if (options.some(this.emptyMinNumber) || options.some(this.emptyMaxNumber)) {
            return true;
        } else if (options.some(this.maxValueLessThanOrEqualToMinValue)) {
            return true;
        } else if (options.every(this.allPositiveChecks) || options.every(this.allNegativeChecks)) {
            return true;
        } else {
            return false;
        }
    };

    emptyPicklistLabel(option) {
        return option.label.length < 1;
    };

    allPositiveChecks(option) {
        return option.is_good;
    };

    allNegativeChecks(option) {
        return !option.is_good;
    };

    maxValueLessThanOrEqualToMinValue(option) {
        return option.max_value <= option.min_value;
    };

    emptyMinNumber(option) {
        return option.min_value.length < 1;
    };

    emptyMaxNumber(option) {
        return option.max_value.length < 1;
    };

    render() {
        let {classes, question} = this.props;
        let {localModel}        = this.state;

        return (
            <Fragment>
                <DialogTitle id="max-width-dialog-title">Question</DialogTitle>

                <DialogContent classes={{root: classes.dialogContent}}>
                    <Grid container
                          direction="row"
                          alignItems={"flex-start"}
                          alignContent={"flex-start"}
                          justify={"flex-start"}
                          wrap={'nowrap'}
                    >
                        <Grid item xs={10}>
                            <TextField
                                id="outlined-full-width"
                                label="Question"
                                value={localModel.text}
                                onChange={this.onChange('question')}
                                multiline
                                rowsMax="6"
                                placeholder="Question"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                required
                                error={this.state.invalidQuestion}
                                helperText={this.state.invalidQuestion === true ? "Required field" : ""}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel
                                    // ref={ref => {
                                    //     this.InputLabelRef = ref;
                                    // }}
                                    htmlFor="outlined-type"
                                >
                                    Type
                                </InputLabel>
                                <Select
                                    value={localModel.type_key}
                                    onChange={this.onChange('type_key')}
                                    required
                                    input={
                                        <OutlinedInput
                                            labelWidth={100}
                                            name="type"
                                            id="outlined-type"
                                        />
                                    }
                                >
                                    <MenuItem value="picklist">Picklist</MenuItem>
                                    <MenuItem value="number">Number</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container
                          direction="row"
                          alignItems={"flex-start"}
                          alignContent={"flex-start"}
                          justify={"flex-start"}
                          wrap={'nowrap'}
                    >
                        <Grid item xs={10}>
                            <TextField
                                id="outlined-full-width"
                                label="Prompt"
                                value={localModel.prompt}
                                onChange={this.onChange('prompt')}
                                multiline
                                rowsMax="6"
                                placeholder="Prompt"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>

                    <Button variant="contained" onClick={this.onAddOption} style={{width: '100%'}}>Add Option</Button>
                    {
                        localModel.question_options.map((option, index) => {
                            return (
                                localModel.type_key === 'picklist'
                                    ? <PicklistOption
                                        option={option}
                                        onRemoveOption={this.onRemoveOption(index)}
                                        key={index}
                                    />
                                    : <NumberOption
                                        option={option}
                                        onRemoveOption={this.onRemoveOption(index)}
                                        key={index}
                                    />
                            )
                        })
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={this.onSave}
                        color="primary"
                        autoFocus
                        disabled={this.invalidQuestion()}
                    >
                        {
                            !question &&
                            "Create"
                        }

                        {
                            !!question &&
                            "Save"
                        }
                    </Button>
                </DialogActions>
            </Fragment>
        );
    }
}


const styles = theme => ({
    button       : {
        margin: theme.spacing.unit,
    },
    formControl  : {
        margin  : theme.spacing.unit + 8,
        minWidth: 120,
        display : 'block'
    },
    selectEmpty  : {
        marginTop: theme.spacing.unit * 2,
    },
    textField    : {
        marginLeft : theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width      : 200,
    },
    dialogContent: {
        minWidth : 600,
        overflowX: 'hidden'
    }
});

export default withStyles(styles)(QuestionForm);