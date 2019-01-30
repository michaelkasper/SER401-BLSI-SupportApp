import React from 'react';
import {CircularProgress} from '@material-ui/core';
import {observer} from "mobx-react";

const Loading = observer(() => {
    const boxStyle = {
        position       : 'absolute',
        top            : 0,
        bottom         : 0,
        left           : 0,
        right          : 0,
        backgroundColor: 'rgba(169, 169, 169, 0.2)',
        zIndex         : 99999,
    };

    return (
        <div style={boxStyle}>
            <div style={{
                top      : '20%',
                left     : 0,
                right    : 0,
                position : 'absolute',
                textAlign: 'center',
            }}>
                <div>
                    <CircularProgress size={50}/>
                </div>
            </div>
        </div>
    );
})

export default Loading;