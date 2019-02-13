import React from 'react';
import {observer} from "mobx-react";
import {withDrop} from "../../../hoc/DragAndDrop";
import DropZone from "./DropZone";


const RecommendationDropZone = (props) => {
    return (
        <DropZone title={"Drop Recommendation Here"} {...props}/>
    );
};

const dropLogic = {
    drop(props, monitor) {
        props.state.addRecommendation(monitor.getItem().item).save();
    },
    canDrop(props, monitor) {
        return !props.state.hasRecommendation(monitor.getItem().item);
    },
};

export default withDrop('recommendation', dropLogic)(observer(RecommendationDropZone));

