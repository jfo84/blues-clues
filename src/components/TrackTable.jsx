import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTracks } from '../actions';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const HeaderColumn = (props) => {
  return(
    <TableHeaderColumn style={{ textAlign: 'center' }}>
      {props.name}
    </TableHeaderColumn>
  );
}

const RowColumn = (props) => {
  return(
    <TableRowColumn style={{ textAlign: 'center' }}>
      {props.children}
    </TableRowColumn>
  );
}

const TrackRow = (props) => {
  const track = props.track;
  const artistNames = track.artists.map(artist => artist.name).join(', ');

  return(
    <TableRow {...props}>
      <RowColumn>
        {track.name}
      </RowColumn>
      <RowColumn>
        {artistNames}
      </RowColumn>
      <RowColumn>
        {track.album.name}
      </RowColumn>
    </TableRow>
  );
};

const LoadingRow = () => {
  return(
    <TableRow>
      <TableRowColumn>
        Loading...
      </TableRowColumn>
    </TableRow>
  );
};

class TrackTable extends Component {
  componentWillMount() {
    this.props.fetchTracks();
  }

  render() {
    const { isFetching, tracks } = this.props;
    const headerNames = ['Name', 'Artists', 'Album'];

    return(
      <Table>
        <TableHeader>
          <TableRow>
            {headerNames.map((name, index) => {
              return <HeaderColumn name={name} key={index}/>
            })}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={true}>
          {isFetching ?
            <LoadingRow /> :
            tracks.map((track, index) => {
              return <TrackRow track={track} key={index}/>;
            })
          }
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    tracks: state.tracks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTracks: () => { dispatch(fetchTracks()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackTable);
