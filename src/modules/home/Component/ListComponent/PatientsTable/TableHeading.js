import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  tableRowRoot: {

    '& th': {
      fontSize: 13,
      padding: 8,
      fontWeight: Fonts.BOLD,
      '&:first-child': {
        paddingLeft: 20,
      },
      '&:last-child': {
        paddingRight: 0,
      },
    },
  },
}));

const TableHeading = (props) => {
  const classes = useStyles(props);
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell>Kompetensi Inti</TableCell>
      <TableCell>KD</TableCell>
      <TableCell>Nama</TableCell>
    </TableRow>
  );
};

export default TableHeading;
