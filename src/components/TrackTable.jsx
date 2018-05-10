import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTracks } from '../actions';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';

let HeaderColumn = (props) => {
  return(
    <TableHeaderColumn style={{ textAlign: 'center' }}>
      {props.name}
    </TableHeaderColumn>
  );
}

let RowColumn = (props) => {
  return(
    <TableRowColumn style={{ textAlign: 'center' }}>
      {props.children}
    </TableRowColumn>
  );
}

let TrackRow = (props) => {
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

let LoadingRow = () => {
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

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      const selected = this.props.data.map(n => n.id);

      this.props.selectTracks(selected);
      return;
    }
    this.props.selectTracks([]]);
  };

  handleClick = (event, id) => {
    const { selected } = this.props;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.props.selectTracks(newSelected);
  };

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
    tracks: state.tracks,
    selected: state.selectedTracks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTracks: () => { dispatch(fetchTracks()) }
    selectTracks: (selected) => { dispatch(selectTracks(selected)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackTable);
