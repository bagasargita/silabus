import React from 'react';
import {makeStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppCard from '../../../@crema/core/AppCard';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  statsCard: {
    borderRadius: theme.overrides.MuiCardLg.root.borderRadius,
    backgroundColor: (props) => props.bgColor,
    width: '250px',
  },
  root: {
    height: 50,
    width: 50,
    color: (props) => props.color,
    borderRadius: theme.overrides.MuiCardLg.root.borderRadius,
    backgroundColor: (props) => props.bgColor,
    [theme.breakpoints.up('md')]: {
      height: 45,
      width: 45,
    },
  },
}));

const ButtonImage = (props) => {
  const {icon, bgColor, data, heading, color} = props;

  const classes = useStyles({bgColor, color});

  return (
    <AppCard className={clsx(classes.statsCard, 'card-hover')} >
      <Box display='flex' alignItems='center' style={{cursor: 'pointer'}}>
        <Box fontSize={{xs: 36, md: 48}} clone>
          <Avatar className={classes.root}>{icon}</Avatar>
        </Box>
        <Box ml={{xs: 3, xl: 4}}>
          <Box component='p' color='text.secondary' mb={2} fontSize={14}>
            {heading}
          </Box>
          <Box component='h3' fontWeight={Fonts.MEDIUM} fontSize={20}>
            {data.count}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default ButtonImage;

ButtonImage.defaultProps = {
  bgColor: '',
  data: {
    count: '',
  },
};

ButtonImage.propTypes = {
  bgColor: PropTypes.string,
  data: PropTypes.object,
  heading: PropTypes.any.isRequired,
};
