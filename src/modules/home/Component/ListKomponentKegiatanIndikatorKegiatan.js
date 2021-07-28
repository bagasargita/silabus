import React, {useEffect, useState} from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {Box, Card, CardContent, Icon} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import ListIndikator from "./ListIndikator";
import AddIndikator from "./AddIndikator";
import {makeStyles} from "@material-ui/core/styles";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/jwt-api";
import ListKegiatan from "./ListKegiatan";
import AddKegiatan from "./AddKegiatan";

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
const ListKomponentKegiatanIndikatorKegiatan = ({showAlert, id, type}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [triger, setTriger] = useState(0);
    const [idMateri, setIdMateri] = useState(0);
    const [indikator, setIndikator] = useState(false);
    const [listMateri, setListMateri] = useState([]);

    const getKegiatan = () => {
        const res = jwtAxios.get('/join/indikator-kegiatan', {
            params: {
                id_indikator: id,
            }
        }).then(result => {
            const arr = [];
            Object.keys(result.data.items).map(t => {
                arr.push({
                    id: result.data.items[t].id,
                    name: result.data.items[t].name,
                    kegiatan_pendahuluan: result.data.items[t].kegiatan_pendahuluan,
                    kegiatan_inti: result.data.items[t].kegiatan_inti,
                    kegiatan_penutup: result.data.items[t].kegiatan_penutup,
                    hasil: result.data.items[t].hasil,
                });
            })
            setListMateri(arr);
        })
    }

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

    useEffect(() => {
        getKegiatan();
    }, [id, triger]);

    return(
        <div className={classes.root}>
            <Typography style={{width: '100%'}}>
                <Card>
                    <Tooltip title="Add Materi" >
                        <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
                            <Icon  className={classes.pointer}
                                   onClick={() => {
                                       handleOpenIndikator(id);
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
            </Typography>
            {Object.keys(listMateri).map(t => (
                <>
                    <Card style={{backgroundColor: '#dedede'}}>
                        <CardContent>
                            <p>nama : {listMateri[t].name}</p>
                            <p>kegiatan_pendahuluan : {listMateri[t].kegiatan_pendahuluan}</p>
                            <p>kegiatan_inti : {listMateri[t].kegiatan_inti}</p>
                            <p>kegiatan_penutup : {listMateri[t].kegiatan_penutup}</p>
                            <p>hasil : {listMateri[t].hasil}</p>
                        </CardContent>
                    </Card>
                    <br/>
                </>
            ))}
            {indikator ? (
                <AddKegiatan open={indikator} close={handleCloseIndikator} idMateri={id} type='create' showAlert={showAlert} refresh={refreshIndikator} />
            ) : null}
        </div>
    )
}
export default ListKomponentKegiatanIndikatorKegiatan;