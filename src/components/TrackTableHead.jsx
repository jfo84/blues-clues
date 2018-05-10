import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import {
  TableHead,
  TableCell,
  TableRow
} from 'material-ui/Table';

const headerData = [
  { id: 'name', label: 'Name', disablePadding: false },
  { id: 'artists', label: 'Artists', disablePadding: false },
  { id: 'album', label: 'Album', disablePadding: false }
];

class TrackTableHead extends Component {
  render() {
    const { onSelectAllClick, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding='checkbox'>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {headerData.map(header => {
            return (
              <TableCell
                key={header.id}
                padding={header.disablePadding ? 'none' : 'default'}
              >
                {header.label}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default TrackTableHead;