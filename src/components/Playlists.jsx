import React from 'react';
import { connect } from 'react-redux';
import Table, {
  TableBody,
  TableCell,
  TableRow
} from 'material-ui/Table';

import PlaylistsHead from './PlaylistsHead';

import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  justify-content: flex-end;
`;

const Playlists = (props) => {
  const { playlists } = props;

  return (
    playlists && playlists.length > 0 ?
    (<Container>
      <Table>
        <PlaylistsHead/>
        <TableBody>
          {playlists.map((playlist, index) => (
            <TableRow
              hover
              tabIndex={-1}
              key={playlist.id}
              className={'playlist-row' + index}
            >
              <TableCell className={'playlist-name' + index}>{playlist.name}</TableCell>
              <TableCell className={'playlist-song-num' + index}>{playlist.tracks.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>) : (null)
  );
};

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists.items,
    fetching: state.playlists.fetching
  }
};

export default connect(mapStateToProps, null)(Playlists);
