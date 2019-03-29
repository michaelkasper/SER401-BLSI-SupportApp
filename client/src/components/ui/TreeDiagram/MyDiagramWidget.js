import {DiagramWidget, MoveItemsAction, PortModel, MoveCanvasAction, SelectingAction} from "storm-react-diagrams";
import * as React from "react";
import MyLinkLayerWidget from "./MyLinkLayerWidget";
import MyNodeLayerWidget from "./MyNodeLayerWidget";


export default class MyDiagramWidget extends DiagramWidget {

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return false;
    // }


    // onMouseMove(event) {
    // }
    //
    // onMouseUp(event) {
    // }


    render() {
        let diagramEngine = this.props.diagramEngine;
        diagramEngine.setMaxNumberPointsPerLink(this.props.maxNumberPointsPerLink);
        diagramEngine.setSmartRoutingStatus(this.props.smartRouting);
        let diagramModel = diagramEngine.getDiagramModel();

        return (
            <div
                {...this.getProps()}
                ref={ref => {
                    if (ref) {
                        this.props.diagramEngine.setCanvas(ref);
                    }
                }}
                onWheel={event => {
                    if (this.props.allowCanvasZoom) {
                        event.preventDefault();
                        event.stopPropagation();
                        const oldZoomFactor = diagramModel.getZoomLevel() / 100;
                        let scrollDelta     = this.props.inverseZoom ? -event.deltaY : event.deltaY;
                        //check if it is pinch gesture
                        if (event.ctrlKey && scrollDelta % 1 !== 0) {
                            /*Chrome and Firefox sends wheel event with deltaY that
                have fractional part, also `ctrlKey` prop of the event is true
                though ctrl isn't pressed
              */
                            scrollDelta /= 3;
                        } else {
                            scrollDelta /= 60;
                        }
                        if (diagramModel.getZoomLevel() + scrollDelta > 10) {
                            diagramModel.setZoomLevel(diagramModel.getZoomLevel() + scrollDelta);
                        }

                        const zoomFactor = diagramModel.getZoomLevel() / 100;

                        const boundingRect = event.currentTarget.getBoundingClientRect();
                        const clientWidth  = boundingRect.width;
                        const clientHeight = boundingRect.height;
                        // compute difference between rect before and after scroll
                        const widthDiff    = clientWidth * zoomFactor - clientWidth * oldZoomFactor;
                        const heightDiff   = clientHeight * zoomFactor - clientHeight * oldZoomFactor;
                        // compute mouse coords relative to canvas
                        const clientX      = event.clientX - boundingRect.left;
                        const clientY      = event.clientY - boundingRect.top;

                        // compute width and height increment factor
                        const xFactor = (clientX - diagramModel.getOffsetX()) / oldZoomFactor / clientWidth;
                        const yFactor = (clientY - diagramModel.getOffsetY()) / oldZoomFactor / clientHeight;

                        diagramModel.setOffset(
                            diagramModel.getOffsetX() - widthDiff * xFactor,
                            diagramModel.getOffsetY() - heightDiff * yFactor
                        );

                        diagramEngine.enableRepaintEntities([]);
                        this.forceUpdate();
                    }
                }}
                onMouseDown={event => {
                    this.setState({...this.state, wasMoved: false});

                    diagramEngine.clearRepaintEntities();
                    let model = this.getMouseElement(event);
                    //the canvas was selected
                    if (model === null) {
                        //is it a multiple selection
                        if (event.shiftKey) {
                            let relative = diagramEngine.getRelativePoint(event.clientX, event.clientY);
                            this.startFiringAction(new SelectingAction(relative.x, relative.y));
                        } else {
                            //its a drag the canvas event
                            diagramModel.clearSelection();
                            this.startFiringAction(new MoveCanvasAction(event.clientX, event.clientY, diagramModel));
                        }
                    } else if (model.model instanceof PortModel) {
                        //its a port element, we want to drag a link
                        if (!this.props.diagramEngine.isModelLocked(model.model)) {
                            let relative   = diagramEngine.getRelativeMousePoint(event);
                            let sourcePort = model.model;
                            let link       = sourcePort.createLinkModel();
                            link.setSourcePort(sourcePort);

                            if (link) {
                                link.removeMiddlePoints();
                                if (link.getSourcePort() !== sourcePort) {
                                    link.setSourcePort(sourcePort);
                                }
                                link.setTargetPort(null);

                                link.getFirstPoint().updateLocation(relative);
                                link.getLastPoint().updateLocation(relative);

                                diagramModel.clearSelection();
                                link.getLastPoint().setSelected(true);
                                diagramModel.addLink(link);

                                this.startFiringAction(
                                    new MoveItemsAction(event.clientX, event.clientY, diagramEngine)
                                );
                            }
                        } else {
                            diagramModel.clearSelection();
                        }
                    } else {
                        //its some or other element, probably want to move it
                        if (!event.shiftKey && !model.model.isSelected()) {
                            diagramModel.clearSelection();
                        }
                        model.model.setSelected(true);

                        this.startFiringAction(new MoveItemsAction(event.clientX, event.clientY, diagramEngine));
                    }
                    this.state.document.addEventListener("mousemove", this.onMouseMove);
                    this.state.document.addEventListener("mouseup", this.onMouseUp);
                }}
            >
                {this.state.renderedNodes && (
                    <MyLinkLayerWidget
                        diagramEngine={diagramEngine}
                        pointAdded={(point, event) => {
                            this.state.document.addEventListener("mousemove", this.onMouseMove);
                            this.state.document.addEventListener("mouseup", this.onMouseUp);
                            event.stopPropagation();
                            diagramModel.clearSelection(point);
                            this.setState({
                                action: new MoveItemsAction(event.clientX, event.clientY, diagramEngine)
                            });
                        }}
                    />
                )}
                <MyNodeLayerWidget diagramEngine={diagramEngine}/>
            </div>
        );
    }
}