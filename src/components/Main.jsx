import React, { Component } from 'react';
import { connect } from 'react-redux';

import TrackTable from './TrackTable';
import RecommendationList from './RecommendationList';

class Main extends Component {

  render() {
    const { recommendations } = this.props;

    return(
      <div>
        <TrackTable/>
        <div>
          <RecommendationButton />
          <RecommendationList/>
        </div>
      </div>
    );
  }
}

export default Main;
