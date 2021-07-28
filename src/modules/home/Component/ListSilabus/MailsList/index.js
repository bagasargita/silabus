import React, {useEffect, useState} from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import MailContentHeader from './MailContentHeader';
import MailListItem from './MailListItem';
import {Hidden} from '@material-ui/core';
import AppsPagination from '../../../../../@crema/core/AppsPagination';
import {makeStyles} from '@material-ui/core/styles';
import AppsContent from '../../../../../@crema/core/AppsContainer/AppsContent';
import AppsHeader from '../../../../../@crema/core/AppsContainer/AppsHeader';
import AppsFooter from '../../../../../@crema/core/AppsContainer/AppsFooter';
import AppList from '../../../../../@crema/core/AppList';
import ListEmptyResult from '../../../../../@crema/core/AppList/ListEmptyResult';
import EmailListSkeleton from '../../../../../@crema/core/Skeleton/EmailListSkeleton';
import jwtAxios from '../../../../../@crema/services/auth/jwt-auth/jwt-api';

const useStyles = makeStyles((theme) => ({
  paddingY: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const MailsList = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const [mailList, setMailList] = useState([
    {
      id: 1,
      subject: 'Packet 1',
    },
  ]);
  const [labelList, setLabelList] = useState();
  const [totalMails, setTotalMails] = useState();

  const [page, setPage] = useState(0);

  const {pathname} = useLocation();

  const path = pathname.split('/');

  const loading = useSelector(({common}) => common.loading);

  useEffect(() => {
    setPage(0);
  }, [pathname]);

  useEffect(() => {
    const path = pathname.split('/');
    setPage(0);
    //dispatch(onGetMailList(path[path.length - 2], path[path.length - 1], page));
  }, [dispatch, page, pathname]);

  const [checkedMails, setCheckedMails] = useState([]);

  const onPageChange = (event, value) => {
    setPage(value);
  };

  const onChangeCheckedMails = (event, id) => {
    if (event.target.checked) {
      setCheckedMails(checkedMails.concat(id));
    } else {
      setCheckedMails(checkedMails.filter((mailId) => mailId !== id));
    }
  };

  const onViewMailDetail = (mail) => {
    const changedMailList = [mail.id];
    history.push(`/home/${mail.id}`);
  };

  const onChangeStarred = (checked, mail) => {
    const selectedIdList = [mail.id];
    dispatch();
    //onUpdateStarredStatus(selectedIdList, checked, path[path.length - 1]),
  };

  //const totalMails = useSelector(({mailApp}) => mailApp.totalMails);

  const classes = useStyles(props);

  return (
    <>
      <AppsHeader>
        <MailContentHeader
          checkedMails={checkedMails}
          setCheckedMails={setCheckedMails}
          onPageChange={onPageChange}
          page={props.dataPacket.currentPage - 1}
          path={path}
          count={props.dataPacket.totalPage ? props.dataPacket.totalPage : 0}
          currentPage={props.dataPacket.totalPage}
        />
      </AppsHeader>
      <AppsContent>
        <AppList
          className={classes.paddingY}
          data={props.dataPacket.data}
          ListEmptyComponent={
            <ListEmptyResult
              loading={loading}
              placeholder={<EmailListSkeleton />}
            />
          }
          renderRow={(mail) => (
            <MailListItem
              key={mail.id}
              mail={mail}
              labelList={labelList}
              onChangeCheckedMails={onChangeCheckedMails}
              checkedMails={checkedMails}
              onViewMailDetail={onViewMailDetail}
              onChangeStarred={onChangeStarred}
            />
          )}
        />
      </AppsContent>
      <Hidden smUp>
        {mailList.length > 0 ? (
          <AppsFooter>
            <AppsPagination
              count={totalMails}
              page={page}
              onPageChange={onPageChange}
            />
          </AppsFooter>
        ) : null}
      </Hidden>
    </>
  );
};

export default MailsList;
