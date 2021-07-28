import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../../@crema/core/AppTableContainer';
import CreateSubKD from "../../CreateSubKD";
import jwtAxios from "../../../../../@crema/services/auth/jwt-auth/jwt-api";
import {useParams} from "react-router-dom";
import DeleteKD from "../../DeleteKD";

const PatientsTable = ({recentPatients, bgColor, refresh, showAlert}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [data, setData] = useState();
  const params = useParams();

  const closeUpdate = () => {
    setIsUpdate(false);
  }
  const openUpdate = (id) => {


  }
  const closeDelete = () => {
    setIsDelete(false);
  }
  const openDelete = (id) => {
    setData({id: id})
    setIsDelete(true);
  }

  return (
    <>
      <AppTableContainer>
        <Table className='table'>
          <TableHead>
            <TableHeading />
          </TableHead>
          <TableBody style={{
            backgroundColor: bgColor,
            cursor: bgColor == 'white' ? 'default' : 'pointer',
          }}>
            {recentPatients.map((data) => (
                <TableItem data={data} key={data.id} status={bgColor == 'white' ? false : true} openUpdate={openUpdate} bgColor={bgColor} openDelete={openDelete} />
            ))}
          </TableBody>
        </Table>
      </AppTableContainer>
      {isUpdate ? (
          <CreateSubKD
              data={data}
              type={'update'}
              refresh={refresh}
              isComposeMail={isUpdate}
              // fungsi={props.fungsi}
              showAlert={showAlert}
              close={closeUpdate}
              onCloseComposeMail={closeUpdate}
          />
      ) : null}
      {isDelete ? (
          <DeleteKD
              data={data}
              refresh={refresh}
              isDelete={isDelete}
              // fungsi={props.fungsi}
              showAlert={showAlert}
              close={closeDelete}
              onCloseComposeMail={closeDelete}
          />
      ) : null}
    </>
  );
};

export default PatientsTable;

PatientsTable.defaultProps = {
  recentPatients: [],
  bgColor: 'white'
};

PatientsTable.propTypes = {
  recentPatients: PropTypes.array,
};
