import React from 'react';
import {observer} from "mobx-react";
import {withDrop} from "../../hoc/DragAndDrop";
import DropZone from "./DropZone";


const RecommendationDropZone = (props) => {
    return (
        <DropZone title={"Drop Recommendation Here"} {...props}/>
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


export default withDrop('recommendation', dropLogic)(observer(RecommendationDropZone));

