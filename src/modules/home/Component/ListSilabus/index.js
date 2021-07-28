import React, {useEffect} from 'react';
import MailsList from './MailsList';
import MailDetail from './MailDetail';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import AppsContainer from '../../../../@crema/core/AppsContainer';
import MailSidebar from './MailSideBar';
import {useIntl} from 'react-intl';

const ListSilabus = ({id, fungsi, dataPacket, showAlert, refresh}) => {
  const dispatch = useDispatch();
  const sideMenu = [
    {
      id: 1,
      name: 'Show All',
      icon: 'grid_on',
      fungsi: () => {
        showAlert('"Show All" dalam pengembangan', 'error')
      },
    },
    {
      id: 2,
      name: 'Sory by Date',
      icon: 'schedule',
      fungsi: () => {
        showAlert('"Sory by Date" dalam pengembangan', 'error')
      },
    },
  ];

  const {messages} = useIntl();
  return (
    <AppsContainer
      title="Daftar Silabus"
      sidebarContent={<MailSidebar fungsi={fungsi} menuList={sideMenu} showAlert={showAlert} refresh={refresh} />}>
      <MailsList fungsi={fungsi} dataPacket={dataPacket} />
    </AppsContainer>
  );
};

export default ListSilabus;

ListSilabus.defaultProps = {
  match: null,
};

ListSilabus.prototype = {
  match: PropTypes.node,
};
