import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecs } from '../actions';

class RecommendationList extends Component {
  render() {
    const { recommendations } = this.props;

    return(
      <div>
        {recommendations.map((recommendation) => {
          return <div></div>;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recommendations: state.recs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecs: () => { dispatch(fetchRecs()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationList);
