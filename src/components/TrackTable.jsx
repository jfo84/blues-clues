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

const HeaderCell = (props) => {
  return(
    <TableHeaderColumn key={props.index} style={{ textAlign: 'center' }}>
      {props.text}
    </TableHeaderColumn>
  );
}

// TODO: Lots
const TrackRow = (props) => {
  return(
    <TableRowColumn key={props.index} style={{ textAlign: 'center' }}>
      {props.text}
    </TableRowColumn>
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
    const headerNames = ['Name', 'Artists', 'Album', 'Genres', 'Link'];

    return(
      <Table fixedHeader={true} multiSelectable={true}>
        <TableHeader>
          <TableRow>
            {headerNames.map((name, index) => {
              return <HeaderCell name={name} index={index}/>
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching ?
            <LoadingRow/> :
            tracks.map((track, index) => {
              return <TrackRow track={track} key={index} index={index}/>;
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
