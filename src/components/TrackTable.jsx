import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize } from '../actions';
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

class TrackTable extends Component {
  componentWillMount() {
    this.props.initialize();
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
            <TableRow>
              <TableRowColumn>
                Loading...
              </TableRowColumn>
            </TableRow> :
            tracks.map((track, index) => {
              return <TrackRow track={track} key={index} index={index}/>;
            })}
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
    initialize: () => { dispatch(initialize()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackTable);
