import React from 'react';
import styled from 'styled-components';

import Tracks from './Tracks';
import DisplayButtons from './DisplayButtons';
import Recommendations from './Recommendations';
import Playlists from './Playlists';

const Container = styled.div`
  display: flex;
`;

const Main = () => (
  <div>
    <Tracks/>
    <DisplayButtons/>
    <Container>
      <Recommendations/>
      <Playlists/>
    </Container>
  </div>
);

export default Main;
