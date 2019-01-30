import React, { Component, Fragment } from 'react';
import Header from './components/header/Header';
import DetailContainer from './components/detail/DetailContainer';
import TabsContainer from './components/tabs/TabsContainer';
import './styles/App.css';

class App extends Component {
    render() {
        return (
        <Fragment>
            <Header/>
            <div className='tabsDetailsContainer'>
                <TabsContainer/>
                <DetailContainer/>
            </div>
        </Fragment>
        );
    }
}

export default App;
