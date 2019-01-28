import React from 'react';
import './DetailContainer.css';

class DetailContainer extends React.Component {
    render() {
        return (
            <div className='detailContainer'>
                <div className='stateHeader'>
                    <p>State Details</p>
                </div>
                <div className='stateId'>
                    <p>State Id: 43</p>
                </div>
                <div className='addQuestions'>
                    <p>Questions (Drop here to add)</p>
                </div>
                <div className='addRecommendations'>
                    <p>Recommendations</p>
                </div>
                <div className='nextStates'>
                    <p>Next States</p>
                </div>
            </div>
        );
    }
}

export default DetailContainer;
