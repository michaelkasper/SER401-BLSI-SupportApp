import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import DetailContainer from './components/detail/DetailContainer';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <DetailContainer/>
      </Fragment>
    );
  }
}

export default App;
