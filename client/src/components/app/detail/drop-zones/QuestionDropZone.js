import React from 'react';
import {observer} from "mobx-react";
import {withDrop} from "../../../hoc/DragAndDrop";
import DropZone from "./DropZone";


const QuestionDropZone = (props) => {
    return (
        <DropZone title={"Drop Question Here"} {...props}/>
    );
};

const dropLogic = {
    drop(props, monitor) {
        props.state.addQuestion(monitor.getItem().item).save();
    },
    canDrop(props, monitor) {
        return !props.state.hasQuestion(monitor.getItem().item);
    },
};


export default withDrop('question', dropLogic)(observer(QuestionDropZone));
