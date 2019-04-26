import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import {DragDropContext as ReactDragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

/**
 *
 *
 *
 *
 * Drop Wrapper
 *
 **/
export const withDrop = (key, dropTargetOverride = null, collectOverride = null) => (WrappedComponent) => {

    const dropTarget = dropTargetOverride
        ? dropTargetOverride
        : {
            drop(props, monitor) {
                //What to do on drop
            },
            canDrop(props, monitor) {
                // let beingDroped = monitor.getItem();//item being dropped
                // let droppingOn  = props;
                return true;
                //Can the item be dropped
            },
        };


    const collect = collectOverride
        ? collectOverride
        : (connect, monitor) => {
            return {
                connectDropTarget: connect.dropTarget(),
                isOver           : monitor.isOver(),
                canDrop          : monitor.canDrop()
            };
        };

    class DropZone extends React.Component {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                />
            );
        }
    }

    return DropTarget(key, dropTarget, collect)(DropZone);
};


/**
 *
 *
 *
 *
 * Drag Wrapper
 *
 **/
export const withDrag = (key) => (WrappedComponent) => {

    const dragSource = {
        beginDrag(props) {
            return props;
        }
    };


    const collect = (connect, monitor) => {
        return {
            connectDragSource: connect.dragSource(),
            isDragging       : monitor.isDragging()
        };
    };

    class DragItem extends React.Component {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                />
            );
        }
    }

    return DragSource(key, dragSource, collect)(DragItem);
};


/**
 *
 *
 *
 *
 * Context Wrapper
 *
 **/
const withDragAndDrop = (WrappedComponent) => {

    class DragDropContext extends React.Component {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                />
            );
        }
    }

    return ReactDragDropContext(HTML5Backend)(DragDropContext);
};

export default withDragAndDrop;



