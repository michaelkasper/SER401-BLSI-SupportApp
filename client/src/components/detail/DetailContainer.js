import React from 'react';
import '../../styles/DetailContainer.css';

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
                    <div className='addRecommendationsList'>

                    </div>
                </div>
                <div className='nextState'>
                    <p>Next States</p>
                    <div className='nextStateSelectEmpty'>
                        <p>Drop to add good state</p>
                    </div>
                    <div className='nextStateSelectFilled'>
                        <p>Bad State: 45 (Drop to replace)</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailContainer;
