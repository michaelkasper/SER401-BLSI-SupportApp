import {
    DefaultLinkFactory,
    DefaultLinkWidget,
    DefaultLinkModel
} from "storm-react-diagrams";
import * as React from "react";
import {Toolkit} from "storm-react-diagrams";
import * as _ from "lodash";

let linkTempId = 0;

export class LinkFactory extends DefaultLinkFactory {
    generateReactWidget(diagramEngine, link) {
        return <LinkWidget link={link} diagramEngine={diagramEngine} smooth={true} width={1}/>;
    }

    generateLinkSegment(model, widget, selected, path) {
        linkTempId++;
        return (
            <>
                <defs>
                    <marker id={`linkHead${linkTempId}`} orient='90' markerWidth='4' markerHeight='4'
                            refX='0.1' refY='2'>
                        <path d='M0,0 V4 L2,2 Z' fill={model.color}/>
                    </marker>
                </defs>
                <path
                    className={selected ? widget.bem("--path-selected") : ""}
                    strokeWidth={model.width}
                    fill='none'
                    stroke={model.color}
                    markerEnd={`url(#linkHead${linkTempId})`}
                    d={path}
                    style={{margin: -100}}
                />
            </>
        );
    }
}


export class LinkWidget extends DefaultLinkWidget {

    generateLink(path, extraProps, id) {
        let props = this.props;

        let Bottom = React.cloneElement(
            props.diagramEngine.getFactoryForLink(this.props.link).generateLinkSegment(
                this.props.link,
                this,
                this.state.selected || this.props.link.isSelected(),
                path
            ),
            {
                ref: ref => ref && this.refPaths.push(ref),
            }
        );


        return (
            <g key={"link-" + id}>
                {Bottom}
            </g>
        );
    }


    render() {
        const {diagramEngine} = this.props;
        if (!diagramEngine.nodesRendered) {
            return null;
        }

        //ensure id is present for all points on the path
        let points = this.props.link.points;
        let paths  = [];


        // true when smart routing was skipped or not enabled.
        // See @link{#isSmartRoutingApplicable()}.
        if (paths.length === 0) {
            if (points.length === 2) {
                let isHorizontal = Math.abs(points[0].x - points[1].x) > Math.abs(points[0].y - points[1].y);
                let xOrY         = isHorizontal ? "x" : "y";

                //draw the smoothing
                //if the points are too close, just draw a straight line
                let margin = 50;
                if (Math.abs(points[0][xOrY] - points[1][xOrY]) < 50) {
                    margin = 5;
                }

                let pointLeft  = points[0];
                let pointRight = points[1];

                //some defensive programming to make sure the smoothing is
                //always in the right direction
                // if (pointLeft[xOrY] > pointRight[xOrY]) {
                //     pointLeft = points[1];
                //     pointRight = points[0];
                // }

                paths.push(
                    this.generateLink(
                        Toolkit.generateCurvePath(pointLeft, pointRight, this.props.link.curvyness),
                        {
                            onMouseDown: event => {
                                this.addPointToLink(event, 1);
                            }
                        },
                        "0"
                    )
                );

                // draw the link as dangeling
                if (this.props.link.targetPort === null) {
                    paths.push(this.generatePoint(1));
                }
            } else {
                //draw the multiple anchors and complex line instead
                for (let j = 0; j < points.length - 1; j++) {
                    paths.push(
                        this.generateLink(
                            Toolkit.generateLinePath(points[j], points[j + 1]),
                            {
                                "data-linkid": this.props.link.id,
                                "data-point" : j,
                                onMouseDown  : (event) => {
                                    this.addPointToLink(event, j + 1);
                                }
                            },
                            j
                        )
                    );
                }

                //render the circles
                for (let i = 1; i < points.length - 1; i++) {
                    paths.push(this.generatePoint(i));
                }

                if (this.props.link.targetPort === null) {
                    paths.push(this.generatePoint(points.length - 1));
                }
            }
        }

        this.refPaths = [];
        return (
            <g {...this.getProps()}>
                {paths}
                {_.map(this.props.link.labels, labelModel => {
                    return this.generateLabel(labelModel);
                })}
            </g>
        );
    }
}


export class LinkModel extends DefaultLinkModel {
}