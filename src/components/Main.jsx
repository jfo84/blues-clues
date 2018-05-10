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
        {recommendations ? <RecommendationList/> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recommendations: state.recs
  };
};

export default connect(mapStateToProps, null)(Main);
