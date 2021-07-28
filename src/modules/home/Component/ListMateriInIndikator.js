import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListIndikator from "./ListIndikator";
import Tooltip from "@material-ui/core/Tooltip";
import {Box, Card, Icon} from "@material-ui/core";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import AddIndikator from "./AddIndikator";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    pointer: {
        cursor: 'pointer',
        margin: 15,
    },
}));
export default function ListMateriInIndikator({listMateri, showAlert}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [triger, setTriger] = useState(0);
    const [idMateri, setIdMateri] = useState(0);
    const [indikator, setIndikator] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleCloseIndikator = () => {
        setIndikator(false);
    }
    const handleOpenIndikator = (id) => {
        setIdMateri(id);
        setIndikator(true);
    }
    const refreshIndikator = () => {
        const ang = triger;
        setTriger(ang + 1);
    }
    useEffect(() => {
        refreshIndikator()
    }, []);

    return (
        <div className={classes.root}>
            {Object.keys(listMateri).map(t => (
                <Accordion
                    expanded={expanded === listMateri[t].id}
                    onChange={handleChange(listMateri[t].id)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'>
                        <Typography className={classes.heading}>Id : {listMateri[t].id}</Typography>
                        <Typography className={classes.secondaryHeading}>
                            {listMateri[t].materi}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography style={{width: '100%'}}>
                            <Card>
                                <Tooltip title="Add Materi" >
                                    <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
                                        <Icon  className={classes.pointer}
                                               onClick={() => {
                                                   handleOpenIndikator(listMateri[t].id);
                                               }}
                                        >
                                            exposure_plus_1
                                        </Icon>
                                    </Box>
                                </Tooltip>
                                <Tooltip title="Edit Materi">
                                    <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
                                        <Icon  className={classes.pointer}
                                               onClick={() => {
                                                   showAlert('Update Materi Dalam pengembangan', 'warning')
                                               }}
                                        >
                                            mode_edit
                                        </Icon>
                                    </Box>
                                </Tooltip>
                                <Tooltip title="Delete Materi" >
                                    <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
                                        <DeleteSharpIcon
                                            className={classes.pointer}
                                            onClick={() => {
                                                showAlert('Delete Materi Dalam Pengembangan', 'warning');
                                            }}
                                        />
                                    </Box>
                                </Tooltip>
                            </Card>
                           <ListIndikator idMateri={listMateri[t].id} triger={triger} />
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
            {indikator ? (
                <AddIndikator open={indikator} close={handleCloseIndikator} idMateri={idMateri} type='create' showAlert={showAlert} refresh={refreshIndikator} />
            ) : null}
        </div>
    );
}