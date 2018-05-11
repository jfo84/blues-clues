import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecommendations } from '../actions';

import Button from 'material-ui/Button';

class RecommendationList extends Component {
  render() {
    const { recommendations } = this.props;

    {recommendations ? <RecommendationList/> : null}

    return(
      <div>
        <Button variant='raised' onClick={event => this.props.fetchRecommendations()}>Show Recommendations</Button>;
        {recommendations.length > 0 ?
          (<div>
            {recommendations.map((recommendation) => {
              return <div></div>;
            })}
          </div>) : (null)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recommendations: state.recommendations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecommendations: () => { dispatch(fetchRecommendations()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationList);
