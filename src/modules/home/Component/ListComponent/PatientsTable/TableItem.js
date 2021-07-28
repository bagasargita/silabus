import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import useStyles from './TableItem.style';
import AppMenu from '../../../../../@crema/core/AppMenu';
import Avatar from '@material-ui/core/Avatar';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import {Text} from "recharts";

const TableItem = ({data, status, openUpdate, bgColor, openDelete}) => {
  const classes = useStyles();

  return (
    <TableRow key={data.name} className='item-hover' onClick={() => {
        if(status == true){
            if(bgColor == '#feffe0'){
                openUpdate(data.id);
            }else if(bgColor == '#ffe8ee'){
                openDelete(data.id);
            }

        }
    }
    }>
        <TableCell align='left' style={{
            whiteSpace: 'unset',
            maxWidth: 1200,
        }}>
            {data.nama_kd}
        </TableCell>
      <TableCell align='left' style={{
          width: 60
      }}>
        {data.nomor}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.nama}
      </TableCell>
      <TableCell align='left'>{data.date}</TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
