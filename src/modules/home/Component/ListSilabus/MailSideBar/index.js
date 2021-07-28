import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Scrollbar from '../../../../../@crema/core/Scrollbar';
import ComposeMail from '../ComposeMail';
import AppsSideBarFolderItem from '../../../../../@crema/core/AppsSideBarFolderItem';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import AppList from '../../../../../@crema/core/AppList';
import AppAnimate from '../../../../../@crema/core/AppAnimate';
import ListEmptyResult from '../../../../../@crema/core/AppList/ListEmptyResult';
import SidebarPlaceholder from '../../../../../@crema/core/Skeleton/SidebarListSkeleton';

const useStyles = makeStyles((theme) => ({
  btnRoot: {
    width: '100%',
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: Fonts.MEDIUM,
  },
  listRoot: {
    marginBottom: 8,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 20,
    },
  },
}));

const MailSidebar = (props) => {
  const [labelList, setLabelList] = useState([1, 2, 3, 4, 5]);
  const [connectionList, setConnectionList] = useState();
  const [folderList, setFolderList] = useState([
    {
      id: 1,
      name: 'ELKO',
      icon: 'archive',
    },
    {
      id: 2,
      name: 'ELKO',
      icon: 'archive',
    },
  ]);
  //const labelList = useSelector(({mailApp}) => mailApp.labelList);

  //const connectionList = useSelector(({mailApp}) => mailApp.connectionList);

  //const folderList = useSelector(({mailApp}) => mailApp.folderList);

  const [isComposeMail, setComposeMail] = useState(false);

  const closeCompose = () => {
    setComposeMail(false);
  };

  const onOpenComposeMail = () => {
    setComposeMail(true);
  };

  const onCloseComposeMail = () => {
    setComposeMail(false);
  };

  const classes = useStyles(props);

  const ExClicked = () => {
    alert('Under Contruksion');
  };

  return (
    <>
      <>
        <Box px={{xs: 4, md: 5}} pt={{xs: 4, md: 5}} pb={{xs: 2, xl: 5}}>
          <AppAnimate>
            <Button
              disabled={props.disableCreate}
              variant='contained'
              color='secondary'
              className={classes.btnRoot}
              onClick={onOpenComposeMail}>
              Susun Silabus
            </Button>
          </AppAnimate>
        </Box>

        <Scrollbar
          className={clsx(classes.scLauncher)}
          style={{
            height: 'calc(100% - 80px)',
          }}>
          <Box
            px={{xs: 4, md: 5, lg: 6, xl: 8}}
            pb={{xs: 4, md: 5, lg: 6, xl: 8}}
            pt={0}>
            <List
              className={classes.listRoot}
              component='nav'
              aria-label='main mailbox folders'>
              <AppList
                data={props.menuList}
                renderRow={(item) => (
                  <AppsSideBarFolderItem
                    key={item.id}
                    item={item}
                    classes={classes}
                    isClicked={item.fungsi ? item.fungsi : ExClicked}
                  />
                )}
              />
            </List>
          </Box>
        </Scrollbar>
      </>

      {isComposeMail ? (
        <ComposeMail
            refresh={props.refresh}
          isComposeMail={isComposeMail}
          fungsi={props.fungsi}
            showAlert={props.showAlert}
          close={closeCompose}
          onCloseComposeMail={onCloseComposeMail}
        />
      ) : null}
    </>
  );
};

export default MailSidebar;
