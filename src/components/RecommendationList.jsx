import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecommendations } from '../actions';

import styled from 'styled-components';
import Button from 'material-ui/Button';

let RecommendationContainer = styled.div`
  display: flex;
  direction: column;
  flex-wrap: wrap;
`;

let Recommendation = styled.div`
  flex: 1;
  justify-content: flex-start;
  margin: 10px;
  min-height: 400px;
  font-family: "Muli", sans-serif;
`;

const Description = styled.div`
  margin: 5px;
`;

const RecommendationButton = styled(Button)`
  && {
    margin: 20px;
  }
`;

class RecommendationList extends Component {
  render() {
    const { fetchRecommendations, recommendations, selectedTracks } = this.props;

    return(
      <div>
        <RecommendationButton
          variant='raised'
          disabled={selectedTracks.length === 0}
          onClick={event => fetchRecommendations()}
          className={'recommendation-button'}
        >
          Show Recommendations
        </RecommendationButton>
        {recommendations && recommendations.length > 0 ?
          (<RecommendationContainer className={'recommendation-container'}>
            {recommendations.map((recommendation, index) => {
              const { album } = recommendation;
              const { images } = album;

              if (!images) {
                return null;
              }

              const artistNames = recommendation.artists.map(artist => artist.name).join(', ');
              const mediumImage = images.find(image => image.height === 300);

              return(
                mediumImage ?
                  // You could query for the album and figure out if it's a single
                  // If it's a single, don't include the album name because it's duplicate
                  // But it's probably way too expensive for such a small UI tweak
                  // They do have a bulk API though:
                  // https://beta.developer.spotify.com/documentation/web-api/reference/albums/get-several-albums/
                  (<Recommendation key={index} className={'recommendation' + index}>
                    <Description style={{ minHeight: '40px' }}>
                      {recommendation.name} - {artistNames}
                    </Description>
                    <Description style={{ marginBottom: '10px' }}>
                      {album.name}
                    </Description>
                    <img
                      src={mediumImage.url}
                      alt=''
                    />
                  </Recommendation>) : (null)
              );
            })}
          </RecommendationContainer>) : (null)}
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