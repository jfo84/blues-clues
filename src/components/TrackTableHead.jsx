import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { pure } from 'recompose';
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

const TrackTableHead = (props) => {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            className={'all-tracks-checkbox'}
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

export default pure(TrackTableHead);