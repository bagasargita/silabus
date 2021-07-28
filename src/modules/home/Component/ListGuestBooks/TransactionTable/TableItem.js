import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import {makeStyles} from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const TableItem = ({data}) => {
  const useStyles = makeStyles((theme) => ({
    tableCell: {
      fontSize: 13,
      padding: '12px 8px',
      '&:first-child': {
        paddingLeft: 20,
      },
      '&:last-child': {
        paddingRight: 20,
      },
    },
    whiteSpace: {
      whiteSpace: 'no-wrap',
    },
    anchar: {
      color: theme.palette.primary.main,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      display: 'inline-block',
    },
    badgeRoot: {
      padding: '3px 10px',
      borderRadius: 4,
      display: 'inline-block',
    },
  }));
  const classes = useStyles();
  const getPaymentTypeColor = () => {
    switch (data.paymentType) {
      case 'COD': {
        return '#F84E4E';
      }
      case 'Prepaid': {
        return '#43C888';
      }
      default: {
        return '#E2A72E';
      }
    }
  };
  const getPaymentStatusColor = () => {
    switch (data.status) {
      case 0: {
        return '#bf0000';
      }
      case 1: {
        return '#bf7900';
      }
      case 2: {
        return '#43C888';
      }
      default: {
        return '#E2A72E';
      }
    }
  };

  return (
    <TableRow
      key={data.name}
      className={clsx(classes.borderBottomClass, 'item-hover')}>
      <TableCell component='th' scope='row' className={classes.tableCell}>
        <Box className={classes.anchar}>{data.id}</Box>
      </TableCell>
      <TableCell
        align='left'
        className={clsx(classes.tableCell, classes.tableCellColor)}>
        {data.nik}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.tujuan}
      </TableCell>
      <TableCell
        align='left'
        className={classes.tableCell}
        style={{color: getPaymentTypeColor()}}>
        {data.created_at}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        <Box
          className={classes.badgeRoot}
          style={{
            color: getPaymentStatusColor(),
            backgroundColor: getPaymentStatusColor() + '44',
          }}>
          {data.status == 0 ? "CekIn" : "CekOut"}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
