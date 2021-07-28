import React from 'react';
import AppCard from '../../../@crema/core/AppCard';
import {Box, makeStyles, Typography} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
    drTime: {
        fontWeight: Fonts.BOLD,
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.background.paper,
        '@media screen and (max-width: 1600px) and (min-width: 1280px)': {
            display: 'none',
        },
    },
    drCardContent: {},
    textTruncate: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
    },
}));

const ButtonCard = ({data}) => {
    const {bgColor, icon, category, name, fungsi} = data;
    const classes = useStyles();
    return (
        <AppCard
            height={1}
            style={{backgroundColor: bgColor}}
            className='card-hover'>
            <Box
                display='flex'
                onClick={() => {
                    fungsi();
                }}>
                {icon ? (
                    <Box mr={3} clone alignSelf='center'>
                        <img src={icon} alt='icon' height={20} width={30} />
                    </Box>
                ) : null}
                <Box
                    className={classes.drCardContent}
                    style={{
                        width: icon ? 'calc(100% - 50px)' : '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    <Box flex={1} color='white' overflow='hidden' mr={2}>
                        <Typography
                            className={classes.textTruncate}
                            component='h5'
                            variant='inherit'
                            color='inherit'>
                            {category}
                        </Typography>
                        <Box className={classes.textTruncate} component='p' pt={1.5}>
                            {name}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AppCard>
    );
};

export default ButtonCard;
