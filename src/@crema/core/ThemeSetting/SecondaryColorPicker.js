import React, {useContext, useState} from 'react';
import AppContext from '../../utility/AppContext';
import {SketchPicker} from 'react-color';
import {makeStyles} from '@material-ui/core/index';
import Box from '@material-ui/core/Box';

const SecondaryColorPicker = (props) => {
  const [visible, setVisibility] = useState(false);
  const {theme, updateTheme, secondary} = useContext(AppContext);

  const useStyles = makeStyles((theme) => ({
    cpSwatch: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      cursor: 'pointer',
      marginBottom: 10,
      marginRight: 10,
    },
    cpColor: {
      width: 30,
      height: 16,
      backgroundColor: theme.palette.secondary.main,
      border: `solid 1px ${theme.palette.gray[100]}`,
      marginRight: 10,
      [theme.breakpoints.up('xl')]: {
        width: 40,
        height: 26,
      },
    },
    cpPopover: {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
    },
  }));

  const classes = useStyles(props);

  return (
    <>
      <Box className={classes.cpSwatch} onClick={() => setVisibility(!visible)}>
        <Box className={classes.cpColor} />
        <Box component='span' className='font-extrabold'>
          Secondary
        </Box>
      </Box>
      {visible ? (
        <Box className={classes.cpPopover} onClick={() => setVisibility(false)}>
          <Box className={classes.cpCover} />
          <SketchPicker
            color={secondary}
            onChangeComplete={(color) => {
              theme.palette.secondary.main = color.hex;
              updateTheme(theme);
            }}
          />
        </Box>
      ) : null}
    </>
  );
};

export default SecondaryColorPicker;
