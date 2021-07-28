import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import AppSelect from '../../../../@crema/core/AppSelect';
import PatientsTable from './PatientsTable';

const ListMateri = ({recentPatients, bgColor, refresh, showAlert}) => {
  const {messages} = useIntl();
  const handleSelectionType = (data) => {
    console.log('data: ', data);
  };
  return (
      <PatientsTable recentPatients={recentPatients} bgColor={bgColor} refresh={refresh} showAlert={showAlert} />
  );
};

export default ListMateri;
