import React from 'react';

import { pure } from 'recompose';
import {
  TableHead,
  TableCell,
  TableRow
} from 'material-ui/Table';

const PlaylistsHead = () => (
  <TableHead>
    <TableRow>
      <TableCell>Playlists</TableCell>
      <TableCell># of Songs</TableCell>
    </TableRow>
  </TableHead>
);

export default pure(PlaylistsHead);