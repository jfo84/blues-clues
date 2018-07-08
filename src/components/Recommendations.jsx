import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

let Container = styled.div`
  display: flex;
  flex: 3;
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

const Recommendations = (props) => {
  const { recommendations } = props;

  return (
    recommendations && recommendations.length > 0 ?
      (<Container className={'recommendation-container'}>
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
      </Container>) : (null)
  );
};

const mapStateToProps = (state) => {
  return {
    recommendations: state.recommendations.items
  };
};

export default connect(mapStateToProps, null)(Recommendations);