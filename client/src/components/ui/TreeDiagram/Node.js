import {
    DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget
} from "storm-react-diagrams";
import * as React from "react";
import * as _ from "lodash";
import StarSelectedIcon from "@material-ui/icons/StarTwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {Fragment} from "react";
import Grid from "@material-ui/core/Grid";

class NodeModel extends DefaultNodeModel {
    onSelect;
    stateObj;
    inPortGood;
    inPortBad;
    outPort;
    stateSelected;

    constructor(stateObj, onSelect, name, color) {
        super(name, color);
        this.onSelect = onSelect;
        this.stateObj = stateObj;

        this.inPortGood    = this.addInPort(" ");
        this.inPortBad     = this.addInPort(" ");
        this.outPort       = this.addOutPort(" ");
        this.stateSelected = false;
    }

    serialize() {
        return _.merge(super.serialize(), {
            stateObj: this.stateObj
        });
    }

    setSelected(selected) {
        if (selected) {
            this.onSelect();
        }
        super.setSelected(selected);
    }

    setStateSelected(isSelected) {
        this.stateSelected = isSelected;
    }
}

class NodeFactory extends DefaultNodeFactory {
    onNodeSelected;

    constructor(onNodeSelected) {
        super();
        this.onNodeSelected = onNodeSelected;
    }

    generateReactWidget(diagramEngine, node) {
        return <NodeWidget node={node} diagramEngine={diagramEngine}/>;
    }

    getNewInstance(config) {
        let stateObj = config.stateObj;
        delete config.stateObj;

        return new NodeModel(stateObj, () => this.onNodeSelected(stateObj.id), config);
    }
}


class NodeWidgetComponent extends DefaultNodeWidget {
    state = {
        arrowRef: null,
    };

    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        let {node, classes} = this.props;

        return (

            <Tooltip
                placement="right-start"
                interactive
                classes={{
                    popper : classes.htmlPopper,
                    tooltip: classes.htmlTooltip,
                }}
                PopperProps={{
                    popperOptions: {
                        modifiers: {
                            arrow: {
                                enabled: Boolean(this.state.arrowRef),
                                element: this.state.arrowRef,
                            },
                        },
                    },
                }}
                title={
                    <Fragment>
                        <h4>State: {node.name}</h4>

                        <div className={classes.section}>
                            <h5>Questions</h5>
                            <ol>
                            {node.stateObj.questions.map(row => (
                                <li>{row.text}</li>
                            ))}
                            </ol>
                        </div>

                        <div className={classes.section}>
                            <h5>Recommendations</h5>
                            <ol>
                                {node.stateObj.recommendations.map(row => (
                                    <li>{row.title}</li>
                                ))}
                            </ol>
                        </div>

                        <span className={classes.arrow} ref={this.handleArrowRef}/>
                    </Fragment>
                }
            >
                <div {...this.getProps()}
                     style={{position: 'relative', background: node.stateSelected ? '#FFFFCC' : node.color}}>

                    {
                        node.stateObj.is_initial &&
                        <StarSelectedIcon style={{
                            color   : node.stateSelected ? node.color : "#FAFA00",
                            position: 'absolute',
                            top     : -1,
                            left    : 1
                        }}/>
                    }

                    <div className={this.bem("__title")} style={{color: node.stateSelected ? '#1E1E1E' : 'inherit'}}>
                        <div className={this.bem("__name")}>{node.name}</div>
                    </div>
                    <div className={this.bem("__ports")}>
                        <div className={this.bem("__in")}>
                            {_.map(node.getInPorts(), this.generatePort.bind(this))}
                        </div>
                        <div className={this.bem("__out")}>
                            {_.map(node.getOutPorts(), this.generatePort.bind(this))}
                        </div>
                    </div>
                </div>
            </Tooltip>
        );
    }
}


const styles = theme => ({
    arrow      : {
        position   : 'absolute',
        fontSize   : 6,
        width      : '3em',
        height     : '3em',
        '&::before': {
            content    : '""',
            margin     : 'auto',
            display    : 'block',
            width      : 0,
            height     : 0,
            borderStyle: 'solid',
        },
    },
    htmlPopper : {
        '&[x-placement*="right-start"] $arrow': {
            top        : 0,
            left       : 0,
            marginLeft : '-0.95em',
            height     : '3em',
            width      : '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent #dadde9 transparent transparent`,
            }
        }
    },
    htmlTooltip: {
        backgroundColor: '#f5f5f9',
        color          : 'rgba(0, 0, 0, 0.87)',
        maxWidth       : 400,
        fontSize       : theme.typography.pxToRem(12),
        border         : '1px solid #dadde9',
        '& b'          : {
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
});

const NodeWidget = withStyles(styles)(NodeWidgetComponent);


export {NodeFactory, NodeModel, NodeWidget};

