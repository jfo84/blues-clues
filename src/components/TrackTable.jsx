import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTracks, selectTracks } from '../actions';
import Checkbox from 'material-ui/Checkbox';
import Table, {
  TableBody,
  TableCell,
  TableRow
} from 'material-ui/Table';

import TrackTableHead from './TrackTableHead';

let LoadingRow = () => {
  return(
    <TableRow>
      <TableCell>Loading...</TableCell>
    </TableRow>
  );
};

class TrackTable extends Component {
  componentWillMount() {
    this.props.fetchTracks();
  }

  isSelected = id => this.props.selected.indexOf(id) !== -1;

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      const selected = this.props.data.map(n => n.id);

      this.props.selectTracks(selected);
      return;
    }
    this.props.selectTracks([]);
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
    const { isFetching, tracks, selected } = this.props;

    return(
      <Table>
        <TrackTableHead
          rowCount={tracks.length}
          numSelected={selected.length}
          onSelectAllClick={this.handleSelectAllClick}
        />
        <TableBody>
          {isFetching ?
            <LoadingRow /> :
            tracks.map((track) => {
              const isSelected = this.isSelected(track.id);
              const artistNames = track.artists.map(artist => artist.name).join(', ');
            
              return (
                <TableRow
                  hover
                  onClick={event => this.handleClick(event, track.id)}
                  role='checkbox'
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={track.id}
                  selected={isSelected}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell>{track.name}</TableCell>
                  <TableCell>{artistNames}</TableCell>
                  <TableCell>{track.album.name}</TableCell>
                </TableRow>
              );
            })}
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
    fetchTracks: () => { dispatch(fetchTracks()) },
    selectTracks: (selected) => { dispatch(selectTracks(selected)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackTable);
