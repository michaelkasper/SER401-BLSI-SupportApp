import React, {Fragment} from 'react';
import {inject, observer} from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import withStyles from "@material-ui/core/es/styles/withStyles";
import TabContainer from "./TabContainer";
import Modal from "@material-ui/core/Modal";
import QuestionForm from "../forms/QuestionForm";
import RecommendationForm from "../forms/RecommendationForm";
import StateRow from "./StateRow";
import RecommendationRow from "./RecommendationRow";
import QuestionRow from "./QuestionRow";
import Dialog from "../../ui/Dialog";

@inject("rootStore")
@observer
class TabsContainer extends React.Component {

    state = {
        view                   : 0,
        showSateModal          : false,
        showQuestionModal      : false,
        showRecommendationModal: false,
        selectedState          : null,
        selectedQuestion       : null,
        selectedRecommendation : null
    };


    handleChange = (event, value) => {
        this.setState({view: value});
    };

    handleChangeIndex = index => {
        this.setState({view: index});
    };

    onCloseModal = () => {
        this.setState({
            showSateModal          : false,
            showQuestionModal      : false,
            showRecommendationModal: false,
            selectedState          : null,
            selectedQuestion       : null,
            selectedRecommendation : null
        })
    };

    selectState = (state) => {
        this.props.onStateChange(state.id);
    };

    createState = () => {
        let {algorithm, rootStore} = this.props;

        rootStore.stateStore.post({algorithm_id: algorithm.id})
            .then(res => res.result)
            .then(state => {
                console.log(state);
                this.props.onStateChange(state)
            });
    };

    showQuestionForm = (question = true) => {
        this.showModal(question, null);
    };

    showRecommendationForm = (recommendation = true) => {
        this.showModal(null, recommendation);
    };

    showModal = (question = null, recommendation = null) => {
        this.setState({
            showQuestionModal      : !!question,
            showRecommendationModal: !!recommendation,
            selectedQuestion       : question === true ? null : question,
            selectedRecommendation : recommendation === true ? null : recommendation,
        })
    };


    render() {
        let {view, showQuestionModal, showRecommendationModal, selectedQuestion, selectedRecommendation} = this.state;
        let {algorithm, classes, theme}                                                                  = this.props;

        return (
            <Fragment>
                <div className={classes.root}>
                    <div className={classes.header}>
                        <AppBar position="static" color="primary">
                            <Tabs
                                value={this.state.view}
                                onChange={this.handleChange}
                                indicatorColor="secondary"
                                textColor="secondary"
                                variant="fullWidth"
                                classes={{indicator: classes.indicator}}
                            >
                                <Tab
                                    label="States"
                                    classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                />
                                <Tab

                                    label="Questions"
                                    classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                />
                                <Tab
                                    label="Recommendations"
                                    classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                />
                            </Tabs>
                        </AppBar>
                    </div>

                    <div className={classes.tabsContent}>
                        <div className={classes.tabContent}>
                            {
                                view === 0 &&
                                <TabContainer
                                    dir={theme.direction}
                                    content={algorithm.states}
                                    onSelect={this.selectState}
                                    onCreate={this.createState}
                                    row={StateRow}
                                />
                            }

                            {
                                view === 1 &&
                                <TabContainer
                                    dir={theme.direction}
                                    content={algorithm.questions}
                                    onSelect={this.showQuestionForm}
                                    onCreate={this.showQuestionForm}
                                    row={QuestionRow}
                                />
                            }

                            {
                                view === 2 &&
                                <TabContainer
                                    dir={theme.direction}
                                    content={algorithm.recommendations}
                                    onSelect={this.showRecommendationForm}
                                    onCreate={this.showRecommendationForm}
                                    row={RecommendationRow}
                                />
                            }
                        </div>
                    </div>
                </div>

                {
                    showQuestionModal &&
                    <Dialog
                        open={showQuestionModal}
                        onClose={this.onCloseModal}
                    >
                        <QuestionForm
                            onClose={this.onCloseModal}
                            algorithm={algorithm}
                            question={selectedQuestion}
                        />
                    </Dialog>
                }

                {
                    showRecommendationModal &&
                    <Dialog
                        onClose={this.onCloseModal}
                        open={showRecommendationModal}
                    >
                        <RecommendationForm
                            onClose={this.onCloseModal}
                            algorithm={algorithm}
                            recommendation={selectedRecommendation}
                        />
                    </Dialog>
                }


            </Fragment>
        );
    }
}

const styles = theme => ({
    root       : {
        "position"     : "absolute",
        "top"          : "0px",
        "left"         : "0px",
        backgroundColor: theme.palette.background.default,
        width          : 400,
        height         : "calc(100vh - 80px)",
        boxShadow      : "3px 0px 10px -5px #888888"
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
    },
    tabsContent: {
        overflow : "hidden",
        height   : "calc(100% - 48px)",
        overflowY: "scroll"
    },
    tabContent : {
        // position: "absolute",
        // top     : 0,
        // left    : 0,
        // right   : 0,
        // bottom  : 0,
        overflow: "auto"
    },
    header     : {
        flexGrow: 0
    },
    modal      : {
        width: "600px"
    }

});

export default withStyles(styles, {withTheme: true})(TabsContainer);