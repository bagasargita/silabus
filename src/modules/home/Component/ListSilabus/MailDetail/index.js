import React, {createRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {Box, List} from '@material-ui/core';
import {MailDetailSkeleton} from '../../../../../@crema/core/Skeleton/MailDetailSkeleton';
import AppsContainer from '../../../../../@crema/core/AppsContainer';
import MailSidebar from '../MailSideBar';
import {useIntl} from 'react-intl';
import jwtAxios from '../../../../../@crema/services/auth/jwt-auth/jwt-api';
import MailsList from '../MailsList';

const MailDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const contentRef = createRef();
  const [soal, setSoal] = useState([]);
  const [data, setData] = useState([
    {
      owner: {
        profilePic:
          'https://image.freepik.com/free-vector/man-profile-cartoon_18591-58482.jpg',
      },
      comments: {
        length: 1,
      },
      message: 'Loading...',
      opsi: [],
    },
  ]);

  const {messages} = useIntl();

  const params = useParams();

  const [selectedMail, setSelectedMail] = useState(true);

  const getData = () => {
    const res = jwtAxios.get('/evaluation/package/questions', {
      params: {
        expand: 'options',
        id: params.id,
        sort: 'created_at',
        'per-page': 999,
      },
    });
    res.then((result) => {
      console.log(result.data);
      const arr = [];
      Object.keys(result.data.items).map((t) => {
        let temp_kunci = '';
        const x = 0;
        const char = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        Object.keys(result.data.items[t].options).map((x) => {
          if (result.data.items[t].options[x].correct == true) {
            temp_kunci = char[x];
          }
          x++;
        });
        arr.push({
          owner: {
            profilePic:
              'https://image.freepik.com/free-vector/man-profile-cartoon_18591-58482.jpg',
          },
          kunci: temp_kunci,
          opsi: result.data.items[t].options,
          comments: {
            length: result.data.items[t].options.length,
          },
          message: result.data.items[t].question,
        });
      });
      setData(arr);
    });
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  if (!selectedMail) {
    return <MailDetailSkeleton />;
  }

  const sideMenu = [
    {
      id: 1,
      name: 'Show All',
      icon: 'grid_on',
      fungsi: () => {
        alert('Under Maintenece');
      },
    },
  ];

  return (
    <>
      <AppsContainer
        title={messages['sidebar.managementsoal.packet']}
        sidebarContent={
          <MailSidebar disableCreate={true} menuList={sideMenu} />
        }>
        <Box display='flex' flexDirection='column' ref={contentRef}>
          {/*<Create refresh={getData} />*/}
        </Box>
        <List style={{maxHeight: '100%', overflow: 'auto'}}>
          <Box
            height={1}
            display='flex'
            flexDirection='column'
            ref={contentRef}>
            {/*<AppWall id={params.id} data={data} />*/}
          </Box>
        </List>
      </AppsContainer>
    </>
  );
};

export default MailDetail;
