import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecommendations } from '../actions';

import Button from 'material-ui/Button';

class RecommendationList extends Component {
  containerStyle = () => {
    return { minHeight: '300px' };
  };

  buttonStyle = () => {
    return { padding: '5px' };
  };
  render() {
    const { recommendations, selectedTracks } = this.props;

    return(
      <div style={this.containerStyle()}>
        <Button
          style={this.buttonStyle()}
          variant='raised'
          disabled={selectedTracks.length === 0}
          onClick={event => this.props.fetchRecommendations()}>
          Show Recommendations
        </Button>
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
                <div>
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
                </div>
              );
            })}
          </div>) : (null)}
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
