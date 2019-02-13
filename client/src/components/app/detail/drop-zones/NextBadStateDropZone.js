import React from 'react';
import {observer} from "mobx-react";
import {withDrop} from "../../../hoc/DragAndDrop";
import DropZone from "./DropZone";


const NextBadStateDropZone = (props) => {
    return (
        <DropZone title={"Drop Next Bad State Here"} {...props}/>
    );
};

const dropLogic = {
    drop(props, monitor) {
        props.state.linkNextBadState(monitor.getItem().item).save();
    },
    canDrop(props, monitor) {
        return !props.state.id !== monitor.getItem().item.id;
    },
};


export default withDrop('state', dropLogic)(observer(NextBadStateDropZone));
