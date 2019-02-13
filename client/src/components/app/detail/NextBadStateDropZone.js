import React from 'react';
import {observer} from "mobx-react";
import {withDrop} from "../../hoc/DragAndDrop";
import DropZone from "./DropZone";


const NextBadStateDropZone = (props) => {
    return (
        <DropZone title={"Drop Next Bad State Here"} {...props}/>
    );
};

const dropLogic = {
    drop(props, monitor) {
        //What to do on drop
    },
    canDrop(props, monitor) {
        return true;
    },
};


export default withDrop('state', dropLogic)(observer(NextBadStateDropZone));
