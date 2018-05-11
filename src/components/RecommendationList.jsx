import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecommendations } from '../actions';

import styled from 'styled-components';
import Button from 'material-ui/Button';

const RecommendationContainer = styled.div`
  display: flex;
  direction: row;
`;

const Recommendation = styled.div`
  flex: 1;
  justify-content: flex-start;
`;

class RecommendationList extends Component {
  buttonStyle = () => {
    return { padding: '20px' };
  };

  render() {
    const { recommendations, selectedTracks } = this.props;

    return(
      <div>
        <Button
          style={this.buttonStyle()}
          variant='raised'
          disabled={selectedTracks.length === 0}
          onClick={event => this.props.fetchRecommendations()}>
          Show Recommendations
        </Button>
        <RecommendationContainer>
          {recommendations && recommendations.length > 0 ?
            (<div>
              {recommendations.map((recommendation) => {
                const { album } = recommendation;
                const { images } = album;

                if (!images) {
                  return null;
                }

                const artistNames = recommendation.artists.map(artist => artist.name).join(', ');
                const mediumImage = images.find(image => image.height === 300);

                return(
                  <Recommendation>
                    {mediumImage ? (
                      <div>
                        <div>{recommendation.name} - {artistNames}</div>
                        <div>{album.name}</div>
                        <img
                          src={mediumImage.url}
                          alt=''
                        />
                      </div>
                    ) : (null)}
                  </Recommendation>
                );
              })}
            </div>) : (null)}
        </RecommendationContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recommendations: state.recommendations,
    selectedTracks: state.selectedTracks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecommendations: () => { dispatch(fetchRecommendations()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationList);
