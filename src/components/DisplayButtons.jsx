import React from 'react';
import { connect } from 'react-redux';
import { fetchRecommendations, fetchPlaylists } from '.././actions';

import styled from 'styled-components';
import Button from 'material-ui/Button';

const DisplayButton = styled(Button)`
  && {
    margin: 20px;
  }
`;

const DisplayButtons = (props) => {
  const { selectedTracks, fetchRecommendations, fetchPlaylists } = props;

  return (
    <div>
      <DisplayButton
        variant='raised'
        disabled={selectedTracks.length === 0}
        onClick={event => fetchRecommendations()}
        className={'recommendation-button'}
      >
        Show Recommendations
      </DisplayButton>
      <DisplayButton
        variant='raised'
        disabled={false}
        onClick={event => fetchPlaylists()}
        className={'playlist-button'}
      >
        Show Playlists
      </DisplayButton>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedTracks: state.tracks.selected
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecommendations: () => { dispatch(fetchRecommendations()) },
    fetchPlaylists: () => { dispatch(fetchPlaylists()) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayButtons);

