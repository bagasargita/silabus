import React, {useEffect, useState} from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import AppSelect from '../../../../@crema/core/AppSelect';
import PatientsTable from './PatientsTable';
import jwtAxios from "../../../../@crema/services/auth/jwt-auth/jwt-api";

const ListIndikator = ({bgColor, refresh, showAlert, idMateri, triger}) => {
  const [indikator, setIndikator] = useState([]);
  const getIndikator = () => {
    const res = jwtAxios.get('/join/materi-indikator', {
      params: {
        id_materi: idMateri,
      }
    });
    res.then(data => {
      const arr = [];
      Object.keys(data.data.items).map(t => {
        arr.push({
          id: data.data.items[t].id,
          indikator: data.data.items[t].name,
          tujuan: data.data.items[t].tujuan,
          created: data.data.items[t].created_at,
        })
      })
      setIndikator(arr);
    })
  }
  useEffect(() => {
    getIndikator();
  }, []);
  useEffect(() => {
    getIndikator();
  }, [triger]);
  return (
      <PatientsTable recentPatients={indikator} bgColor={bgColor} refresh={refresh} showAlert={showAlert} />
  );
};

export default ListIndikator;
