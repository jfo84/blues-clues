import Table, {
  TableHead,
  TableCell,
  TableRow,
  Checkbox
} from 'material-ui/Table';

const headerData = [
  { id: 'name', label: 'Name', disablePadding: true },
  { id: 'artists', label: 'Artists', disablePadding: false },
  { id: 'album', label: 'Album', disablePadding: false }
];

class TrackTableHead extends React.Component {
  render() {
    const { onSelectAllClick, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {headerData.map(header => {
            return (
              <TableCell
                key={column.id}
                padding={column.disablePadding ? 'none' : 'default'}
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